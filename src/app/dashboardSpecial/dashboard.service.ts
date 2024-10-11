import { Op } from "sequelize";
import { Reservation } from "../../database/models/reservation.model";
import moment from "moment";
import { Room } from "../../database/models/room.model";
import { RoomType } from "../../database/models/roomType.model";
import { Outlet } from "../../database/models/outlet.model";
import { Guest } from "../../database/models/guest.model";
import Bill from "../../database/models/bills.model";
import BillDetail from "../../database/models/billdetail.model";

class DashboardService{
    async RoomAvailable(theDate: any) {
        try {
            console.log("🚀 ~ RoomAvailable ~ Checking for reservations on date:", theDate);
            const parsedDate = moment(theDate, 'YYYY-MM-DD').startOf('day');
            const endOfDay = moment(theDate, 'YYYY-MM-DD').endOf('day');
            console.log("🚀 ~ DashboardService ~ RoomAvailable ~ parsedDate:", parsedDate)
            const result = await Reservation.findAndCountAll({
                where: {
                    checkInDate: {
                        [Op.lte]: endOfDay.toDate(),
                    },
                    checkOutDate: {
                        [Op.gt]: parsedDate.toDate(),
                    },
                },
                include : [{model : Guest,attributes : ['guestId','firstName','lastName']},{model : Outlet,attributes : ['outletid','name']},{model : Room,attributes : ['roomId','roomNumber','floor']}]
            });

            const reservedRoomId = result.rows.map((reservation : any) => reservation.roomId)
            const availableRoomsResult = await Room.findAndCountAll({where : {
                roomId : {
                    [Op.notIn] : reservedRoomId
                }
            },
            include : [{model : RoomType,attributes : ['roomTypeId','typeName']},{model : Outlet,attributes : ['outletid','name']}]
        })
            
    
            if (result.count > 0 || availableRoomsResult.count > 0) {
                console.log("🚀 ~ RoomAvailable ~ Reservations found on date:", result.rows);
                return {
                    reservedRooms: {
                        count: result.count,
                        data: result.rows
                    },
                    availableRooms: {
                        count: availableRoomsResult.count,
                        data: availableRoomsResult.rows
                    }
                };
            } else {
                console.log("🚀 ~ RoomAvailable ~ No reservations found on date:", theDate);
                return {
                    reservedRooms: {
                        count: 0,
                        data: []
                    },
                    availableRooms: {
                        count: 0,
                        data: []
                    }
                };
            }
        } catch (error) {
            console.error("🚀 ~ RoomAvailable ~ Error occurred while checking availability:", error);
            throw new Error('Error while checking room availability');  // Re-throw the error to be handled by the controller
        }
    }

    async gusestData(firstName?: any, lastName?: any) {
        try {
            const options: any = {
                include: [
                    { model: Reservation },
                    {
                        model: Bill,
                        include: [{ model: BillDetail }]
                    }
                ]
            };
            console.log("🚀 ~ DashboardService ~ gusestData ~ options:", options)
    
            if (firstName || lastName) {
                options.where = {};
    
                if (firstName) {
                    options.where.firstName = {
                        [Op.like]: `%${firstName}%` 
                    };
                }
    
                if (lastName) {
                    options.where.lastName = {
                        [Op.like]: `%${lastName}%` 
                    };
                }
            }
    
            // Fetch data using the options
            const data = await Guest.findAll(options);
            console.log("🚀 ~ DashboardService ~ gusestData ~ data:", data)
            return data;
        } catch (error) {
            // Handle errors
            console.error("Error fetching guest data:", error);
            throw error; 
        }
    }
    
}


export default new DashboardService();