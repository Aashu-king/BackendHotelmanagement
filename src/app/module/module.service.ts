import { where } from "sequelize";
import ModuleType from "../../database/models/module-type.model"
import Module from "../../database/models/module.model";
import Page from "../../database/models/page.model";
import RolePermission from "../../database/models/role-permission.model";
import Role from "../../database/models/role.model";
import UserPermission from "../../database/models/user-permission.model";
import User from "../../database/models/user.model";

class moduleService{
    async CreateModuleType(moduleTypeName: string) {
        try {
            const createdModuleType = await ModuleType.create({ moduleTypeName });
            return createdModuleType;
        } catch (error) {
            console.error("🚀 ~ ModuleService ~ CreateModuleType ~ error:", error);
            throw new Error('Failed to create module type');
        }
    }

    async UpdateModuleType(id: any, moduleTypeName: string) {
        try {
            const moduleType = await ModuleType.findByPk(id);
            if (moduleType) {
                moduleType.moduleTypeName = moduleTypeName;
                await moduleType.save();
                return moduleType;
            }
            return null;
        } catch (error) {
            console.error("🚀 ~ ModuleService ~ UpdateModuleType ~ error:", error);
            throw new Error('Failed to update module type');
        }
    }

    async DeleteModuleType(id: any) {
        try {
            const moduleType = await ModuleType.findByPk(id);
            if (moduleType) {
                await moduleType.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error("🚀 ~ ModuleService ~ DeleteModuleType ~ error:", error);
            throw new Error('Failed to delete module type');
        }
    }

    async GetModuleTypeById(id: any) {
        try {
            const moduleType = await ModuleType.findByPk(id);
            return moduleType;
        } catch (error) {
            console.error("🚀 ~ ModuleService ~ GetModuleTypeById ~ error:", error);
            throw new Error('Failed to retrieve module type');
        }
    }
    
    async CreateModule(moduleName: string, moduleTypeId: any) {
        try {
            const createdModule = await Module.create({
                moduleName: moduleName,
                moduleTypeId: moduleTypeId
            });
            return createdModule;
        } catch (error) {
            console.error("🚀 ~ moduleService ~ CreateModule ~ error:", error);
            throw new Error('Failed to create module');
        }
    }

    // Update Module
    async UpdateModule(moduleId: any, moduleName: string, moduleTypeId: any) {
        try {
            const module = await Module.findByPk(moduleId);
            console.log("🚀 ~ moduleService ~ UpdateModule ~ module:", module)
            if (module) {
                module.moduleName = moduleName;
                module.moduleTypeId = moduleTypeId;
                await module.save();
                return module;
            }
            return null;
        } catch (error) {
            console.error("🚀 ~ moduleService ~ UpdateModule ~ error:", error);
            throw new Error('Failed to update module');
        }
    }

    // Delete Module
    async DeleteModule(id: any) {
        try {
            const module = await Module.findByPk(id);
            if (module) {
                await module.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error("🚀 ~ moduleService ~ DeleteModule ~ error:", error);
            throw new Error('Failed to delete module');
        }
    }

    // Get Module by ID
    async GetModuleById(moduleId: any) {
        try {
            const module = await Module.findByPk(moduleId);
            return module;
        } catch (error) {
            console.error("🚀 ~ moduleService ~ GetModuleById ~ error:", error);
            throw new Error('Failed to retrieve module');
        }
    }

    async CreatePage(moduleId: any, pageName: string, pageUrl: string) {
        try {
            const createdPage = await Page.create({
                moduleId: moduleId,
                pageName: pageName,
                pageUrl: pageUrl
            });
            return createdPage;
        } catch (error) {
            console.error("🚀 ~ pageService ~ CreatePage ~ error:", error);
            throw new Error('Failed to create page');
        }
    }

    // Update Page
    async UpdatePage(id: any, moduleId: any, pageName: string, pageUrl: string) {
        try {
            const page = await Page.findByPk(id);
            if (page) {
                page.moduleId = moduleId;
                page.pageName = pageName;
                page.pageUrl = pageUrl;
                await page.save();
                return page;
            }
            return null;
        } catch (error) {
            console.error("🚀 ~ pageService ~ UpdatePage ~ error:", error);
            throw new Error('Failed to update page');
        }
    }

    // Delete Page
    async DeletePage(id: any) {
        try {
            const page = await Page.findByPk(id);
            if (page) {
                await page.destroy();
                return true;
            }
            return false;
        } catch (error) {
            console.error("🚀 ~ pageService ~ DeletePage ~ error:", error);
            throw new Error('Failed to delete page');
        }
    }

    // Get Page by ID
    async GetPageById(id: any) {
        try {
            const page = await Page.findByPk(id);
            return page;
        } catch (error) {
            console.error("🚀 ~ pageService ~ GetPageById ~ error:", error);
            throw new Error('Failed to retrieve page');
        }
    }

    async CreateRolePagePerm(roleId,pageId,canView,canEdit,canDelete){
        try {
            const createdMOduleType = await RolePermission.create({
                roleId : roleId,
                pageId : pageId,
                canView : canView,
                canEdit : canEdit,
                canDelete : canDelete
            })
            return createdMOduleType;
        } catch (error) {
            console.log("🚀 ~ moduleService ~ CreatePage ~ error:", error)
            
        }
    }
    async CreateUserPagePerm(userId,pageId,canView,canEdit,canDelete){
        try {
            const createdMOduleType = await UserPermission.create({
                    userId : userId,
                    pageId : pageId,
                    canView : canView,
                    canEdit : canEdit,
                    canDelete : canDelete
            })
            return createdMOduleType;
        } catch (error) {
            console.log("🚀 ~ moduleService ~ CreatePage ~ error:", error)
            
        }
    }

    async updateUserPermission(userId: any, pageId: any,  canView,canEdit,canDelete) {
        try {
            const module = await UserPermission.findOne({ where: { pageId : pageId,userId : userId } });
            console.log("🚀 ~ moduleService ~ UpdateModule ~ module:", module)
            if (module) {
                module.canView = canView;
                module.canEdit = canEdit;
                module.canDelete = canDelete;
                await module.save();
                return module;
            }
            return null;
        } catch (error) {
            console.log("🚀 ~ moduleService ~ updateUserPermission ~ error:", error);
            throw new Error("Failed to update user permission");
        }
    }

    async deleteUserPermission(pageId: any,userId : any) {
        try {
            const deletedRows = await UserPermission.destroy({ where: { pageId : pageId,userId : userId } });
            return deletedRows > 0;
        } catch (error) {
            console.log("🚀 ~ moduleService ~ deleteUserPermission ~ error:", error);
            throw new Error("Failed to delete user permission");
        }
    }

    async getUserPermissionById(pageId: any,userId : any) {
        try {
            const userPermission = await UserPermission.findOne({
            where: { pageId :  pageId ,userId: userId},
                include: [
                    { model: User, attributes: ['userId', 'userName'] },
                    { model: Page, attributes: ['pageId', 'pageName'] }
                ]
            });
            console.log("🚀 ~ moduleService ~ getUserPermissionById ~ userPermission:", userPermission)
            return userPermission;
        } catch (error) {
            console.log("🚀 ~ moduleService ~ getUserPermissionById ~ error:", error);
            throw new Error("Failed to retrieve user permission");
        }
    }
    

    async GotPermissionData(user){
        try {
            const userWisePermission = await UserPermission.findAll({where : {userId : user.userId,canView : true},include : [Page]})
            console.log("🚀 ~ moduleService ~ GotPermissionData ~ userWisePermission:", userWisePermission)
            if(userWisePermission.length == 0){
                const userDetails = await User.findByPk(user.userId)
                const getRoleWisePermission = await RolePermission.findAll({where : {roleId : userDetails.roleId}})
                
                const pageData = await Page.findAll({where : {pageId : getRoleWisePermission.map((ele : any) => ele.pageId)}})
                const moduleData = await Module.findAll({where : {moduleId : pageData.map((ele : any) => ele.moduleId)}})
                const moduleTypeData = await ModuleType.findAll({where : {moduleTypeId : moduleData.map((ele : any) => ele.moduleTypeId)}})
    
                const fileterdModule = moduleTypeData.map((moduleType) => {
                    const moduleFiltered = moduleData.filter((module) => module.moduleTypeId === moduleType.moduleTypeId).map((module) => {
                        const relatedPages = pageData.filter((page) => page.moduleId === module.moduleId)
                        return {
                            moduleId: module.moduleId,
                            moduleTypeId: module.moduleTypeId,
                            moduleName: module.moduleName,
                            createdAt: module.createdAt,
                            updatedAt: module.updatedAt,
                            pageData: relatedPages.map((page) => ({
                                pageId: page.pageId,
                                moduleId: page.moduleId,
                                pageName: page.pageName,
                                pageUrl: page.pageUrl,
                                createdAt: page.createdAt,
                                updatedAt: page.updatedAt
                            }))
                        };
                    })
                    return {
                        moduleTypeId: moduleType.moduleTypeId,
                        moduleTypeName: moduleType.moduleTypeName,
                        createdAt: moduleType.createdAt,
                        updatedAt: moduleType.updatedAt,
                        moduleData: moduleFiltered
                    };
                })
                const finalObj = {
                    Permissions: userWisePermission,
                    moduleTypeData: fileterdModule
                };
                return finalObj
            }else{
            const pageData = await Page.findAll({where : {pageId : userWisePermission.map((ele : any) => ele.pageId)}})
            const moduleData = await Module.findAll({where : {moduleId : pageData.map((ele : any) => ele.moduleId)}})
            const moduleTypeData = await ModuleType.findAll({where : {moduleTypeId : moduleData.map((ele : any) => ele.moduleTypeId)}})

            const fileterdModule = moduleTypeData.map((moduleType) => {
                const moduleFiltered = moduleData.filter((module) => module.moduleTypeId === moduleType.moduleTypeId).map((module) => {
                    const relatedPages = pageData.filter((page) => page.moduleId === module.moduleId)
                    return {
                        moduleId: module.moduleId,
                        moduleTypeId: module.moduleTypeId,
                        moduleName: module.moduleName,
                        createdAt: module.createdAt,
                        updatedAt: module.updatedAt,
                        pageData: relatedPages.map((page) => ({
                            pageId: page.pageId,
                            moduleId: page.moduleId,
                            pageName: page.pageName,
                            pageUrl: page.pageUrl,
                            createdAt: page.createdAt,
                            updatedAt: page.updatedAt
                        }))
                    };
                })
                return {
                    moduleTypeId: moduleType.moduleTypeId,
                    moduleTypeName: moduleType.moduleTypeName,
                    createdAt: moduleType.createdAt,
                    updatedAt: moduleType.updatedAt,
                    moduleData: moduleFiltered
                };
            })
            const finalObj = {
                Permissions: userWisePermission,
                moduleTypeData: fileterdModule
            };
            return finalObj
            }
        } catch (error) {
            console.log("🚀 ~ moduleService ~ GotPermissionData ~ error:", error)
            
        }
    }

    async getRolePermission() {
        try {
          const permissions = await RolePermission.findAll({
            include: [Role, Page],
          });
      
          if (!permissions || permissions.length === 0) {
            throw new Error('No permissions found for this role.');
          }
      
          console.log("🚀 ~ moduleService ~ getRolePermission ~ permissions:", permissions);
          return permissions;
      
        } catch (error) {
          console.error("🚀 ~ moduleService ~ getRolePermission ~ error:", error.message || error);
     
          throw new Error('Failed to retrieve role permissions.');
        }
      }

    async getUserPermission(){
        try {
            const gotData = await UserPermission.findAll({
                include: [{model : User , attributes : ['userId','userName']}, {model : Page , attributes : ['pageId','pageName']}],
              })
            return gotData
        } catch (error) {
            console.log("🚀 ~ moduleService ~ getRolePermission ~ error:", error)
            
        }
    }
}

export default new moduleService()