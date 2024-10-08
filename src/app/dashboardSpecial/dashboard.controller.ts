import { Request, Response } from "express";
import dashboardService from "./dashboard.service";

class DashboardController{
    async RoomAvailable(req: Request, res: Response) {
        try {
            const { theDate } = req.query;
    
            if (!theDate) {
                return res.status(400).json({
                    message: "Date parameter is missing. Please provide a valid date.",
                });
            }
    
            console.log("🚀 ~ RoomAvailableController ~ Checking availability for date:", theDate);
            
            const theDataWeGot = await dashboardService.RoomAvailable(theDate);
            
            if (theDataWeGot) {
                return res.status(200).json(theDataWeGot);
            } else {
                return res.status(201).json({
                    message: `No reservations found on the provided date: ${theDate}`,
                });
            }
    
        } catch (error) {
            console.error("🚀 ~ RoomAvailableController ~ Error occurred:", error);
            
            // Send a generic error response to the client
            return res.status(500).json({
                message: "An internal server error occurred while checking room availability.",
            });
        }
    }
}


export default new DashboardController();