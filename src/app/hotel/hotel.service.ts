import Hotel from "../../database/models/hotel.model"

class hotelService{
    async createHotel(name: any,address : any,city : any,state : any,zipCode : any ,phoneNumber : any,email : any,rating : any,isActive : any ,website : any){
        try {
          const hotelDataInsert =   await Hotel.create({
                name : name,
                address : address,
                city : city,
                state : state ,
                zipCode : zipCode,
                phoneNumber : phoneNumber,
                email : email,
                rating : rating,
                isActive : isActive,
                website : website
            })

            return hotelDataInsert
        } catch (error) {
            console.log("🚀 ~ hotelService ~ createHotel ~ error:", error)
            
        }
    }  
    async deleteHotel(){
        try {
            
        } catch (error) {
            console.log("🚀 ~ hotelService ~ createHotel ~ error:", error)
            
        }
    }
    async updateHotel(){
        try {
            
        } catch (error) {
            console.log("🚀 ~ hotelService ~ createHotel ~ error:", error)
            
        }
    }
    async getHotels(){
        try {
            
        } catch (error) {
            console.log("🚀 ~ hotelService ~ createHotel ~ error:", error)
            
        }
    }
    async getHotelById(){
        try {
            
        } catch (error) {
            console.log("🚀 ~ hotelService ~ createHotel ~ error:", error)
            
        }
    }
}

export default new hotelService();