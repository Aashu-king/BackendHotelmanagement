import { Request, Response } from "express"
import outletService from "./outlet.service"
import { Outlet } from "../../database/models/outlet.model";

class outletController{
    async createoutlet(req : Request,res : Response){
        try {
            const {name ,address,city,state,zipCode,phoneNumber,email,hotelId} = req.body
            const createdoutlet = await outletService.createoutlet(name ,address,city,state,zipCode,phoneNumber,email,hotelId);
            res.status(200).json(createdoutlet)
        } catch (error) {
            console.log("🚀 ~ outletService ~ createoutlet ~ error:", error)
            res.status(400).json({message : 'there is some error'})
        }
    }  
    async deleteoutlet(req : Request,res : Response){
        try {
            
        } catch (error) {
            console.log("🚀 ~ outletService ~ createoutlet ~ error:", error)
            
        }
    }
    async updateoutlet(req : Request,res : Response){
        try {
            
        } catch (error) {
            console.log("🚀 ~ outletService ~ createoutlet ~ error:", error)
            
        }
    }
    async getoutlets(req : Request,res : Response){
        try {
            const getData = await Outlet.findAll({attributes : {exclude : ['createdAt','deletedAt','updatedAt']}})
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
    async getoutletById(req : Request,res : Response){
        try {
            
        } catch (error) {
            console.log("🚀 ~ outletService ~ createoutlet ~ error:", error)
            
        }
    }
}

export default new outletController();