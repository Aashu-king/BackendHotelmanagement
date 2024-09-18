import express from "express";
import hotelController from "../app/hotel/hotel.controller";
import outletController from "../app/outlet/outlet.controller";
import userController from "../app/user/user.controller";
import passport from "./../authentication/authmiddleware";
import moduleController from "../app/module/module.controller";

const router = express.Router();

//hotel
router.post('/hotels',hotelController.createHotel)
router.get('/get-hotel',hotelController.getHotels)



//outlet
router.post('/outlet',outletController.createoutlet)
router.get('/get-outlet',outletController.getoutlets)


//userrelated
router.post('/role',userController.createRole)
router.post('/user',userController.createUser)
router.post('/login',userController.loginUser)
router.get('/getUser',userController.getusers)
router.get('/getRole',userController.getroles)

//module related
router.post('/moduletype',moduleController.CreateModuleType)
router.post('/module',moduleController.CreateModule)
router.get('/get-page',moduleController.getPage)
router.get('/get-module',moduleController.getModule)
router.get('/get-moduletype',moduleController.getModuleType)
router.post('/page',moduleController.CreatePage)
router.post('/rolewisePermission',moduleController.CreateRolePagePerm)
router.post('/userwisePermission',moduleController.CreateUserPagePerm)
router.get('/getPerm',passport.authenticate('jwt', { session: false }),moduleController.permissionWiseData)


export default router