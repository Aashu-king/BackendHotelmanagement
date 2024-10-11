import { Request, Response } from "express";
import Role from "../../database/models/role.model"
import { Room } from "../../database/models/room.model"
import User from "../../database/models/user.model"
import staffService from "./staff.service"

interface DecodedRequest extends Request {
    decoded?: any; 
  }
class StaffController{
    async addStaffShift(req : Request, res : Response){
        try {

            const userDe = (req as DecodedRequest).user
            console.log("🚀 ~ StaffController ~ addStaffShift ~ userDe:", userDe)

            const getDataRole = await staffService.getDataRole(userDe);
            if (getDataRole.count === 0) {
                return res.status(404).json({ message: "No house keeping staff found" });
            }

            const getRoomData = await staffService.getRoomData(userDe);
            if (getRoomData.count === 0) {
                return res.status(404).json({ message: "No rooms found" });
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            const lastShift = await staffService.findOneShift(yesterday);

            let startIndex = 0;
            if (lastShift) {
                const lastStaffId = lastShift.userId;
                startIndex = getDataRole.rows.findIndex(staff => staff.userId === lastStaffId) + 1;
                if (startIndex >= getDataRole.rows.length) {
                    startIndex = 0;
                }
            }

            // Assign rooms to staff for cleaning
            let staffIndex = startIndex;
            for (const room of getRoomData.rows) {
                const staff = getDataRole.rows[staffIndex];
                
                const existingShift = await staffService.findOneIfItExistedBefore(staff.userId,room.roomId,today) 
          
                  if (!existingShift) {
                    const createShiftData = await staffService.addStaffShift(staff.userId, room.roomId);
                    if (!createShiftData) {
                      return res.status(500).json({ message: `Failed to assign room ${room.roomId} to staff ${staff.userId}` });
                    }
                  } else {
                    console.log(`Shift for room ${room.roomId} and staff ${staff.userId} already exists today.`);
                  }
          
                  staffIndex = (staffIndex + 1) % getDataRole.rows.length; 
                }

            return res.status(200).json({ message: "Rooms assigned to staff successfully" });
       
        } catch (error) {
            console.log("🚀 ~ StaffController ~ addStaffShift ~ error:", error)
            
        }
    }
}

export default new StaffController()