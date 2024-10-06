import { Request, Response } from "express"
import moduleService from "./module.service"
import Module from "../../database/models/module.model";
import ModuleType from "../../database/models/module-type.model";
import Page from "../../database/models/page.model";
interface DecodedRequest extends Request {
    decoded?: any; 
  }
class moduleController{
    async CreateModuleType(req : Request,res : Response){
        try {
            const {moduleTypeName} = req.body
            const createdMOduleType = await moduleService.CreateModuleType(moduleTypeName)
            res.status(200).json(createdMOduleType)
        } catch (error) {
            console.log("🚀 ~ moduleService ~ CreateModuleType ~ error:", error)
            
        }
    }
    async CreateModule(req : Request,res : Response){
        try {
            const {moduleName,moduleTypeId} = req.body
            const createdMOduleType = await moduleService.CreateModule(moduleName,moduleTypeId)
            res.status(200).json(createdMOduleType)
        } catch (error) {
            console.log("🚀 ~ moduleService ~ CreateModuleType ~ error:", error)
            
        }
    }
    async CreatePage(req : Request,res : Response){
        try {
            const {moduleId,pageName,pageUrl} = req.body
            const createdMOduleType = await moduleService.CreatePage(moduleId,pageName,pageUrl)
            res.status(200).json(createdMOduleType)
        } catch (error) {
            console.log("🚀 ~ moduleService ~ CreateModuleType ~ error:", error)
            
        }
    }
    async CreateRolePagePerm(req : Request,res : Response){
        try {
            const {roleId,pageId,canView,canEdit,canDelete} = req.body
            const createdMOduleType = await moduleService.CreateRolePagePerm(roleId,pageId,canView,canEdit,canDelete)
            res.status(200).json(createdMOduleType)
        } catch (error) {
            console.log("🚀 ~ moduleService ~ CreateModuleType ~ error:", error)
            
        }
    }
    async CreateUserPagePerm(req : Request,res : Response){
        try {
            const {userId,pageId,canView,canEdit,canDelete} = req.body
            const createdMOduleType = await moduleService.CreateUserPagePerm(userId,pageId,canView,canEdit,canDelete)
            res.status(200).json(createdMOduleType)
        } catch (error) {
            console.log("🚀 ~ moduleService ~ CreateModuleType ~ error:", error)
            
        }
    }
    async permissionWiseData(req : Request,res : Response){
        try {
            const user = (req as DecodedRequest).user
            const gotPermissionData = await moduleService.GotPermissionData(user)
            res.status(200).json(gotPermissionData)
        } catch (error) {
            console.log("🚀 ~ moduleController ~ permissionWiseData ~ error:", error)
            
        }
    }

    async userpermissionData(req : Request,res : Response){
        try {
            console.log("🚀 ~ moduleController ~ permissionWiseData ~ req:", req)
            const user = (req as DecodedRequest).user
            console.log("🚀 ~ moduleController ~ permissionWiseData ~ userId:", user)
            const gotPermissionData = await moduleService.getUserPermission(user)
            res.status(200).json(gotPermissionData)
        } catch (error) {
            console.log("🚀 ~ moduleController ~ permissionWiseData ~ error:", error)
            
        }
    }

    async rolepermissionData(req: Request, res: Response) {
        try {
      
         
          const permissions = await moduleService.getRolePermission();
      
          res.status(200).json({
            success: true,
            data: permissions,
          });
      
        } catch (error) {
          console.error("🚀 ~ moduleController ~ rolePermissionData ~ error:", error.message || error);
      
          if (error.message === 'Failed to retrieve role permissions.') {
            return res.status(500).json({
              success: false,
              message: 'An error occurred while fetching role permissions. Please try again later.',
            });
          }
      
          // For unexpected errors
          res.status(500).json({
            success: false,
            message: 'An unexpected error occurred. Please try again later.',
          });
        }
      }
      

    async getModule(req : Request,res : Response){
        try {
            const getData = await Module.findAll({attributes : {exclude : ['createdAt','deletedAt','updatedAt']}})
            if(getData){
                res.status(200).json(getData)
            }else{
                res.status(400).json("message : NO content found")

            }

        } catch (error) {
            console.log("🚀 ~ hotelService ~ createHotel ~ error:", error)
            res.status(401).json("message : some Error occured")
        }
    }

    async getModuleType(req : Request,res : Response){
        try {
            const getData = await ModuleType.findAll({attributes : {exclude : ['createdAt','deletedAt','updatedAt']}})
            if(getData){
                res.status(200).json(getData)
            }else{
                res.status(400).json("message : NO content found")

            }

        } catch (error) {
            console.log("🚀 ~ hotelService ~ createHotel ~ error:", error)
            res.status(401).json("message : some Error occured")
        }
    }

    async getPage(req : Request,res : Response){
        try {
            const getData = await Page.findAll({attributes : {exclude : ['createdAt','deletedAt','updatedAt']}})
            if(getData){
                res.status(200).json(getData)
            }else{
                res.status(400).json("message : NO content found")
            }

        } catch (error) {
            console.log("🚀 ~ hotelService ~ createHotel ~ error:", error)
            res.status(401).json("message : some Error occured")
        }
    }

}

export default new moduleController()