import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import User from '../database/models/user.model';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'yoiamking',
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        console.log("🚀 ~ newJwtStrategy ~ jwtPayload:", jwtPayload)
      const user = await User.findByPk(jwtPayload.user.userId);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
