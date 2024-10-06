import { Request, Response } from "express"
import moduleService from "./module.service"
import Module from "../../database/models/module.model";
import ModuleType from "../../database/models/module-type.model";
import Page from "../../database/models/page.model";
interface DecodedRequest extends Request {
    decoded?: any; 
  }
class moduleController{
    async CreateModuleType(req: Request, res: Response) {
        try {
            const { moduleTypeName } = req.body;
            const createdModuleType = await moduleService.CreateModuleType(moduleTypeName);
            return res.status(201).json({
                message: 'Module Type created successfully',
                data: createdModuleType
            });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ CreateModuleType ~ error:", error);
            return res.status(500).json({ error: 'Error creating module type' });
        }
    }

    async UpdateModuleType(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { moduleTypeName } = req.body;
            const updatedModuleType = await moduleService.UpdateModuleType(id, moduleTypeName);
            if (updatedModuleType) {
                return res.status(200).json({
                    message: 'Module Type updated successfully',
                    data: updatedModuleType
                });
            }
            return res.status(404).json({ error: 'Module Type not found' });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ UpdateModuleType ~ error:", error);
            return res.status(500).json({ error: 'Error updating module type' });
        }
    }

    async DeleteModuleType(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await moduleService.DeleteModuleType(id);
            if (result) {
                return res.status(200).json({ message: 'Module Type deleted successfully' });
            }
            return res.status(404).json({ error: 'Module Type not found' });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ DeleteModuleType ~ error:", error);
            return res.status(500).json({ error: 'Error deleting module type' });
        }
    }

    async GetModuleTypeById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const moduleType = await moduleService.GetModuleTypeById(id);
            if (moduleType) {
                return res.status(200).json({ data: moduleType });
            }
            return res.status(404).json({ error: 'Module Type not found' });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ GetModuleTypeById ~ error:", error);
            return res.status(500).json({ error: 'Error retrieving module type' });
        }
    }

    async GetModuleType(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const moduleType = await ModuleType.findAll()
            if (moduleType) {
                return res.status(200).json({ data: moduleType });
            }
            return res.status(404).json({ error: 'Module Types not found' });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ Module Types ~ error:", error);
            return res.status(500).json({ error: 'Error retrieving module type' });
        }
    }
    async GetModule(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const moduleType = await Module.findAll()
            if (moduleType) {
                return res.status(200).json({ data: moduleType });
            }
            return res.status(404).json({ error: 'Modules not found' });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ Modules ~ error:", error);
            return res.status(500).json({ error: 'Error retrieving modules' });
        }
    }
    async GetPage(req: Request, res: Response) {
        try {
            const moduleType = await Page.findAll();
            if (moduleType) {
                return res.status(200).json({ data: moduleType });
            }
            return res.status(404).json({ error: 'Pages not found' });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ Pages ~ error:", error);
            return res.status(500).json({ error: 'Error retrieving Pages' });
        }
    }

     async CreateModule(req: Request, res: Response) {
        try {
            const { moduleName, moduleTypeId } = req.body;
            const createdModule = await moduleService.CreateModule(moduleName, moduleTypeId);
            return res.status(201).json({
                message: 'Module created successfully',
                data: createdModule
            });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ CreateModule ~ error:", error);
            return res.status(500).json({ error: 'Error creating module' });
        }
    }

    // Update Module
    async UpdateModule(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { moduleName, moduleTypeId } = req.body;
            const updatedModule = await moduleService.UpdateModule(id, moduleName, moduleTypeId);
            if (updatedModule) {
                return res.status(200).json({
                    message: 'Module updated successfully',
                    data: updatedModule
                });
            }
            return res.status(404).json({ error: 'Module not found' });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ UpdateModule ~ error:", error);
            return res.status(500).json({ error: 'Error updating module' });
        }
    }

    // Delete Module
    async DeleteModule(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await moduleService.DeleteModule(id);
            if (result) {
                return res.status(200).json({ message: 'Module deleted successfully' });
            }
            return res.status(404).json({ error: 'Module not found' });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ DeleteModule ~ error:", error);
            return res.status(500).json({ error: 'Error deleting module' });
        }
    }

    // Get Module by ID
    async GetModuleById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const module = await moduleService.GetModuleById(id);
            if (module) {
                return res.status(200).json({ data: module });
            }
            return res.status(404).json({ error: 'Module not found' });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ GetModuleById ~ error:", error);
            return res.status(500).json({ error: 'Error retrieving module' });
        }
    }

    async CreatePage(req: Request, res: Response) {
        try {
            const { moduleId, pageName, pageUrl } = req.body;
            const createdPage = await moduleService.CreatePage(moduleId, pageName, pageUrl);
            return res.status(201).json({
                message: 'Page created successfully',
                data: createdPage
            });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ CreatePage ~ error:", error);
            return res.status(500).json({ error: 'Error creating page' });
        }
    }

    // Update Page
    async UpdatePage(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { moduleId, pageName, pageUrl } = req.body;
            const updatedPage = await moduleService.UpdatePage(id, moduleId, pageName, pageUrl);
            if (updatedPage) {
                return res.status(200).json({
                    message: 'Page updated successfully',
                    data: updatedPage
                });
            }
            return res.status(404).json({ error: 'Page not found' });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ UpdatePage ~ error:", error);
            return res.status(500).json({ error: 'Error updating page' });
        }
    }

    // Delete Page
    async DeletePage(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const result = await moduleService.DeletePage(id);
            if (result) {
                return res.status(200).json({ message: 'Page deleted successfully' });
            }
            return res.status(404).json({ error: 'Page not found' });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ DeletePage ~ error:", error);
            return res.status(500).json({ error: 'Error deleting page' });
        }
    }

    // Get Page by ID
    async GetPageById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const page = await moduleService.GetPageById(id);
            if (page) {
                return res.status(200).json({ data: page });
            }
            return res.status(404).json({ error: 'Page not found' });
        } catch (error) {
            console.error("🚀 ~ moduleService ~ GetPageById ~ error:", error);
            return res.status(500).json({ error: 'Error retrieving page' });
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
            const gotPermissionData = await moduleService.getUserPermission()
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