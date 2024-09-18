import { NextFunction, Request, Response } from "express"
import userService from "./user.service"
import bcrypt from 'bcrypt';
import passport from "./../../authentication/passportLogin";
import Role from "../../database/models/role.model";
import jwt from 'jsonwebtoken';

interface DecodedRequest extends Request {
    decoded?: any; // Define a custom interface for requests with decoded JWT
  }

class userController{
    async createRole(req : Request,res : Response){
        try {
            const {roleName} = req.body
            const createduser = await userService.createRole(roleName);
            res.status(200).json(createduser)
        } catch (error) {
            console.log("🚀 ~ userService ~ createuser ~ error:", error)
            res.status(400).json({message : 'there is some error'})
        }
    }  
    async createUser(req : Request,res : Response){
        try {
            const {
                userName,
                email,
                password,
                firstName,
                lastName,
                phoneNumber,
                address,
                city,
                state,
                zipCode,
                roleId,
                outletId,
                isActive
            } = req.body;

            const hashedPassword = await bcrypt.hash(password,12)
    
            const addedUserData = await userService.createUser(userName,
                email,
                hashedPassword,
                firstName,
                lastName,
                phoneNumber,
                address,
                city,
                state,
                zipCode,
                roleId,
                outletId,
                isActive
            );
    
            res.status(201).json(addedUserData);
        } catch (error) {
            console.log("🚀 ~ userService ~ createuser ~ error:", error)
            
        }
    }
    async loginUser(req : Request,res : Response,next : NextFunction){
        console.log("🚀 ~ userController ~ loginUser ~ req:", req)
        try {
            passport.authenticate('local', { session: false }, async (err, user, info) => {
                console.log("🚀 ~ userController ~ passport.authenticate ~ user:", user)
                console.log("🚀 ~ userController ~ passport.authenticate ~ err:", err)
                if (err || !user) {
                  return res.status(401).json({ message: info ? info.message : 'Login failed' });
                }
            
                // Find user's roles and permissions
                const roles = await Role.findAll({
                  where: { roleId: user.roleId }
                });
            
                // Sign the JWT token and return it in the response
                const token = jwt.sign(
                  {
                    user : user,
                    role : roles
                  },
                  'yoiamking',
                  { expiresIn: '1h' }
                );
                (req as DecodedRequest).decoded = jwt.decode(token);
                return res.json({ token, user });
              })(req, res, next);
        } catch (error) {
            console.log("🚀 ~ userService ~ createuser ~ error:", error)
            
        }
    }
    async updateuser(req : Request,res : Response){
        try {
            
        } catch (error) {
            console.log("🚀 ~ userService ~ createuser ~ error:", error)
            
        }
    }
    async getusers(req : Request,res : Response){
        try {
            const gotUser = await userService.getusers()
            res.status(200).json(gotUser)

        } catch (error) {
            console.log("🚀 ~ userService ~ createuser ~ error:", error)
            
        }
    }
    async getroles(req : Request,res : Response){
        try {
            const gotRoles = await userService.getroles()
            res.status(200).json(gotRoles)

        } catch (error) {
            console.log("🚀 ~ userService ~ createuser ~ error:", error)
            
        }
    }
    async getuserById(req : Request,res : Response){
        try {
            
        } catch (error) {
            console.log("🚀 ~ userService ~ createuser ~ error:", error)
            
        }
    }
}

export default new userController();