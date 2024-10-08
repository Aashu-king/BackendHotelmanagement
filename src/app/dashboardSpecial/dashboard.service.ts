import { Op } from "sequelize";
import { Reservation } from "../../database/models/reservation.model";
import moment from "moment";
import { Room } from "../../database/models/room.model";
import { RoomType } from "../../database/models/roomType.model";
import { Outlet } from "../../database/models/outlet.model";
import { Guest } from "../../database/models/guest.model";

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
}


export default new DashboardService();