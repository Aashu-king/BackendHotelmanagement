import User from "../../database/models/user.model"
import Role from "../../database/models/role.model"


class userService{
    async createRole(roleName: any){
        try {
          const userDataInsert =   await Role.create({
                roleName : roleName,
            })
            return userDataInsert
        } catch (error) {
            console.log("🚀 ~ userService ~ createuser ~ error:", error)
            
        }
    }  
    async createUser(
        userName: any,
        email: any,
        hashedPassword: any,
        firstName?: any,
        lastName?: any,
        phoneNumber?: any,
        address?: any,
        city?:any,
        state?: any,
        zipCode?: any,
        roleId?: any,
        outletId?:any,
        isActive?: any,
    ) {
        try {
            const createdUser = await User.create({
                userName : userName,
                email : email,
                passwordHash : hashedPassword,
                firstName : firstName,
                lastName : lastName,
                phoneNumber : phoneNumber,
                address : address,
                city  :city,
                state : state,
                zipCode : zipCode,
                roleId : roleId,
                outletId : outletId,
                isActive : isActive
            });
            return createdUser;
        } catch (error) {
            console.log("🚀 ~ userService ~ createUser ~ error:", error);
            throw new Error('An error occurred while creating the user.');
        }
    }
    async updateuser(){
        try {
            
        } catch (error) {
            console.log("🚀 ~ userService ~ createuser ~ error:", error)
            
        }
    }
    async getusers(){
        try {
            const gotUserdetails = await User.findAll({attributes : ['userId','userName']})
            return gotUserdetails;
        } catch (error) {
            console.log("🚀 ~ userService ~ createuser ~ error:", error)
            
        }
    }
    async getroles(){
        try {
            const gotRoledetails = await Role.findAll({attributes : ['roleId','roleName']})
            return gotRoledetails;
        } catch (error) {
            console.log("🚀 ~ userService ~ createuser ~ error:", error)
            
        }
    }
    async getuserById(){
        try {
            
        } catch (error) {
            console.log("🚀 ~ userService ~ createuser ~ error:", error)
            
        }
    }
}

export default new userService();