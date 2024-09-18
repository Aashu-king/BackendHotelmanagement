import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from '../database/models/user.model';
import jwt from 'jsonwebtoken';

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email } });
        console.log("🚀 ~ user:", user)
        if (!user) return done(null, false, { message: 'Incorrect email or password' });

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) return done(null, false, { message: 'Incorrect email or password' });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.userId);
});

passport.deserializeUser(async (userId: any, done) => {
    try {
      const user = await User.findByPk(userId as number);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
  

export default passport;
