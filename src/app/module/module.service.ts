import ModuleType from "../../database/models/module-type.model"
import Module from "../../database/models/module.model";
import Page from "../../database/models/page.model";
import RolePermission from "../../database/models/role-permission.model";
import UserPermission from "../../database/models/user-permission.model";
import User from "../../database/models/user.model";

class moduleService{
    async CreateModuleType(moduleTypeName : any){
        try {
            const createdMOduleType = await ModuleType.create({
                moduleTypeName : moduleTypeName
            })
            return createdMOduleType;
        } catch (error) {
            console.log("🚀 ~ moduleService ~ CreateModuleType ~ error:", error)
            
        }
    }
    async CreateModule(moduleName : any,moduleTypeId : any){
        try {
            const createdMOduleType = await Module.create({
                moduleName : moduleName,
                moduleTypeId : moduleTypeId
            })
            return createdMOduleType;
        } catch (error) {
            console.log("🚀 ~ moduleService ~ CreateModuleType ~ error:", error)
        }
    }

    async CreatePage(moduleId,pageName,pageUrl){
        try {
            const createdMOduleType = await Page.create({
                moduleId : moduleId,
                pageName : pageName,
                pageUrl : pageUrl
            })
            return createdMOduleType;
        } catch (error) {
            console.log("🚀 ~ moduleService ~ CreatePage ~ error:", error)
            
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
    async GotPermissionData(user){
        try {
            const userWisePermission = await UserPermission.findAll({where : {userId : user.userId,canView : true}})
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
                    userWisePermission: userWisePermission.map((permission) => ({
                        userId: permission.userId,
                        pageId: permission.pageId,
                        canView: permission.canView,
                        canEdit: permission.canEdit,
                        canDelete: permission.canDelete,
                        createdAt: permission.createdAt,
                        updatedAt: permission.updatedAt
                    })),
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
                userWisePermission: userWisePermission.map((permission) => ({
                    userId: permission.userId,
                    pageId: permission.pageId,
                    canView: permission.canView,
                    canEdit: permission.canEdit,
                    canDelete: permission.canDelete,
                    createdAt: permission.createdAt,
                    updatedAt: permission.updatedAt
                })),
                moduleTypeData: fileterdModule
            };
            return finalObj
            }
        } catch (error) {
            console.log("🚀 ~ moduleService ~ GotPermissionData ~ error:", error)
            
        }
    }
}

export default new moduleService()