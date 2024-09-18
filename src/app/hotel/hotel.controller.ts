import { Request, Response } from "express"
import hotelService from "./hotel.service"
import Hotel from "../../database/models/hotel.model";

class hotelController{
    async createHotel(req : Request,res : Response){
        try {
            const {name ,address,city,state,zipCode,phoneNumber,email,rating,isActive,website} = req.body
            const createdHotel = await hotelService.createHotel(name ,address,city,state,zipCode,phoneNumber,email,rating,isActive,website);
            res.status(200).json(createdHotel)
        } catch (error) {
            console.log("🚀 ~ hotelService ~ createHotel ~ error:", error)
            res.status(400).json({message : 'there is some error'})
        }
    }  
    async deleteHotel(req : Request,res : Response){
        try {
            
        } catch (error) {
            console.log("🚀 ~ hotelService ~ createHotel ~ error:", error)
            
        }
    }
    async updateHotel(req : Request,res : Response){
        try {
            
        } catch (error) {
            console.log("🚀 ~ hotelService ~ createHotel ~ error:", error)
            
        }
    }
    async getHotels(req : Request,res : Response){
        try {
            const getData = await Hotel.findAll({attributes : {exclude : ['createdAt','deletedAt','updatedAt']}})
            console.log("🚀 ~ hotelController ~ getHotels ~ getData:", getData)
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
    async getHotelById(req : Request,res : Response){
        try {
            
        } catch (error) {
            console.log("🚀 ~ hotelService ~ createHotel ~ error:", error)
            
        }
    }
}

export default new hotelController();