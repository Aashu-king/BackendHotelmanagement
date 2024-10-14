import { Outlet } from "../../database/models/outlet.model"


class outletService{
    async createoutlet(name: any,address : any,city : any,state : any,zipCode : any ,phoneNumber : any,email : any,hotelId : any){
        try {
          const outletDataInsert =   await Outlet.create({
                name : name,
                address : address,
                city : city,
                state : state ,
                zipCode : zipCode,
                phoneNumber : phoneNumber,
                email : email,
                hotelId : hotelId
            })

            return outletDataInsert
        } catch (error) {
            console.log("🚀 ~ outletService ~ createoutlet ~ error:", error)
            
        }
    }  
    async deleteoutlet(){
        try {
            
        } catch (error) {
            console.log("🚀 ~ outletService ~ createoutlet ~ error:", error)
            
        }
    }
    async updateoutlet(){
        try {
            
        } catch (error) {
            console.log("🚀 ~ outletService ~ createoutlet ~ error:", error)
            
        }
    }
    async getoutlets(){
        try {
            
        } catch (error) {
            console.log("🚀 ~ outletService ~ createoutlet ~ error:", error)
            
        }
    }
    async getoutletById(){
        try {
            
        } catch (error) {
            console.log("🚀 ~ outletService ~ createoutlet ~ error:", error)
            
        }
    }
}

export default new outletService();