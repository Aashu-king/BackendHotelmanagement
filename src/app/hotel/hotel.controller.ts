import { Request, Response } from "express"
import hotelService from "./hotel.service"
import Hotel from "../../database/models/hotel.model";
import HotelImage from "../../database/models/hotelImages.model";
import OutletImage from "../../database/models/outletImage.model";
import RoomImage from "../../database/models/roomImages.model";

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

    async uploadHotelImages(req : Request ,res : Response){
        try {   
            const { hotelid, descriptions } = req.body; 
            console.log("🚀 ~ hotelController ~ uploadHotelImages ~ req.body:", req.body)

        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: 'No files uploaded' });
        }
        const array : any = req.files
        console.log("🚀 ~ hotelController ~ uploadHotelImages ~  req.files:",  req.files)
        
        const imageRecords = array.map((file, index) => ({
          hotelId: hotelid, 
          imageName : file.filename,
          fileType : file.mimetype,
          imageUrl: file.path, 
          description: descriptions ? descriptions[index] : null 
        }));

          const imageUploaded =   await HotelImage.bulkCreate(imageRecords);
        if(imageUploaded){
            return res.status(201).json({ message: 'Images uploaded successfully' });
        }else{
            return res.status(402).json({ error: 'Failed to upload images some error' });
        }
            
        } catch (error) {
            console.log("🚀 ~ hotelController ~ uploadHotelImages ~ error:", error)
            return res.status(500).json({ error: 'Failed to upload images', details: error.message });
        }
    }
    async uploadOutletImages(req : Request ,res : Response){
        try {   
            const { outletid, descriptions } = req.body; 
            console.log("🚀 ~ hotelController ~ uploadOutletImages ~ req.body:", req.body)

        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: 'No files uploaded' });
        }
        const array : any = req.files
        console.log("🚀 ~ hotelController ~ uploadOutletImages ~ req.files:", req.files)
        
        const imageRecords = array.map((file, index) => ({
            outletId: outletid, 
            imageName : file.filename,
            fileType : file.mimetype,
          imageUrl: file.path, 
          description: descriptions ? descriptions[index] : null 
        }));

          const imageUploaded =   await OutletImage.bulkCreate(imageRecords);
        if(imageUploaded){
            return res.status(201).json({ message: 'Images uploaded successfully' });
        }else{
            return res.status(402).json({ error: 'Failed to upload images some error' });
        }
            
        } catch (error) {
            console.log("🚀 ~ hotelController ~ uploadHotelImages ~ error:", error)
            return res.status(500).json({ error: 'Failed to upload images', details: error.message });
        }
    }
    async uploadRoomImages(req : Request ,res : Response){
        try {   
            const { roomId, descriptions } = req.body; 

        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ error: 'No files uploaded' });
        }
        const array : any = req.files
        
        const imageRecords = array.map((file, index) => ({
          roomId: roomId, 
          imageName : file.filename,
          fileType : file.mimetype,
          imageUrl: file.path, 
          description: descriptions ? descriptions[index] : null 
        }));

          const imageUploaded =   await RoomImage.bulkCreate(imageRecords);
        if(imageUploaded){
            return res.status(201).json({ message: 'Images uploaded successfully' });
        }else{
            return res.status(402).json({ error: 'Failed to upload images some error' });
        }
            
        } catch (error) {
            console.log("🚀 ~ hotelController ~ uploadHotelImages ~ error:", error)
            return res.status(500).json({ error: 'Failed to upload images', details: error.message });
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
            const getData = await Hotel.findAll({include : [{model : HotelImage}], attributes : {exclude : ['createdAt','deletedAt','updatedAt']}})
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