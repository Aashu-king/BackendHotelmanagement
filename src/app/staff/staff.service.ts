import Cleaning from "../../database/models/cleaning.model";
import Role from "../../database/models/role.model";
import { Room } from "../../database/models/room.model";
import User from "../../database/models/user.model";

interface DecodedRequest extends Request {
    decoded?: any; 
}

class StaffService {
    // Adds a staff shift
    async addStaffShift(staffId: number, roomId: number) {
        try {
            const shiftAdded = await Cleaning.create({
                userId: staffId,
                roomId: roomId,
                shiftDate: new Date() // Assigns current date
            });
            return shiftAdded;
        } catch (error) {
            console.error("Error in addStaffShift:", error);
            throw new Error("Could not add staff shift");
        }
    }

    // Retrieves role data for users with the 'House Keeping' role
    async getDataRole(user: any) {
        try {
            console.log("🚀 ~ StaffService ~ getDataRole ~ user.outletId:", user.outletId)
            const gotData = await User.findAndCountAll({
                where: { outletid: user.outletId },
                include: [{ model: Role, where: { roleName: 'House Keeping' } }]
            });
            console.log("🚀 ~ StaffService ~ getDataRole ~ gotData:", gotData)
            return gotData;
        } catch (error) {
            console.error("Error in getDataRole:", error);
            throw new Error("Could not retrieve role data");
        }
    }

    // Retrieves room data for the specified outlet
    async getRoomData(user: any) {
        try {
            const roomData = await Room.findAndCountAll({
                where: { outletid: user.outletId }
            });
            return roomData;
        } catch (error) {
            console.error("Error in getRoomData:", error);
            throw new Error("Could not retrieve room data");
        }
    }

    // Finds the last shift from the previous day
    async findOneShift(yesterday: Date) {
        try {
            const shiftData = await Cleaning.findOne({
                where: { shiftDate: yesterday },
                order: [['createdAt', 'DESC']]
            });
            return shiftData;
        } catch (error) {
            console.error("Error in findOneShift:", error);
            throw new Error("Could not retrieve last shift data");
        }
    }

    async findOneIfItExistedBefore(userId,roomId,today){
        const data =  await Cleaning.findOne({
            where: {
              userId: userId,
              roomId: roomId,
              shiftDate: today
            }
          });

          return data
    }
}


export default new StaffService();
