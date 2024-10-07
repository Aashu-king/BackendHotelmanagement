import { Request, Response } from "express";
import RoomService from "./Room.service";

interface DecodedRequest extends Request {
    decoded?: any; 
  }

class RoomController {
    async createRoomType(req: Request, res: Response) {
        try {
            const roomdata = req.body;
            const createdRoomData = await RoomService.createRoomType(roomdata);
            res.status(200).json(createdRoomData);
        } catch (error) {
            console.log("🚀 ~ RoomController ~ createRoom ~ error:", error);
        }
    }

    async updateRoomType(req: Request, res: Response) {
        try {
            const {roomTypeId} = req.params;
            const roomData = req.body;
            const updatedRoomData = await RoomService.updateRoomType(roomTypeId, roomData);
            if (updatedRoomData) {
                res.status(200).json({ message: 'Room type updated successfully', data: updatedRoomData });
            } else {
                res.status(404).json({ message: 'Room type not found' });
            }
        } catch (error) {
            console.log("🚀 ~ RoomController ~ updateRoomType ~ error:", error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    async getRoomTypeById(req: Request, res: Response) {
        try {
            const {roomTypeId} = req.params;
            const roomType = await RoomService.getRoomTypeById(roomTypeId);
            if (roomType) {
                res.status(200).json(roomType);
            } else {
                res.status(404).json({ message: 'Room type not found' });
            }
        } catch (error) {
            console.log("🚀 ~ RoomController ~ getRoomTypeById ~ error:", error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    async getAllRoomTypes(req: Request, res: Response) {
        try {
            const roomTypes = await RoomService.getAllRoomTypes();
            res.status(200).json(roomTypes);
        } catch (error) {
            console.log("🚀 ~ RoomController ~ getAllRoomTypes ~ error:", error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    async deleteRoomType(req: Request, res: Response) {
        try {
            const {roomTypeId} = req.params;
            const deletedRoomType = await RoomService.deleteRoomType(roomTypeId);
            if (deletedRoomType) {
                res.status(200).json({ message: 'Room type deleted successfully' });
            } else {
                res.status(404).json({ message: 'Room type not found' });
            }
        } catch (error) {
            console.log("🚀 ~ RoomController ~ deleteRoomType ~ error:", error);
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
    

    async createRoom(req: Request, res: Response) {
        try {
            const roomData = req.body;
            const createdRoom = await RoomService.createRoom(roomData);
            return res.status(201).json({
                success: true,
                message: 'Room created successfully',
                data: createdRoom,
            });
        } catch (error) {
            console.log("🚀 ~ RoomController ~ createRoom ~ error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create room',
                error: error.message,
            });
        }
    }

    

    async getRoomById(req: Request, res: Response) {
        try {
            const roomId = req.params.id;
            const room = await RoomService.getRoomById(roomId);
            if (room) {
                return res.status(200).json({
                    success: true,
                    data: room,
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: 'Room not found',
                });
            }
        } catch (error) {
            console.log("🚀 ~ RoomController ~ getRoomById ~ error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve room',
                error: error.message,
            });
        }
    }

    async getAllRooms(req: Request, res: Response) {
        try {
            const rooms = await RoomService.getAllRooms();
            return res.status(200).json({
                success: true,
                data: rooms,
            });
        } catch (error) {
            console.log("🚀 ~ RoomController ~ getAllRooms ~ error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve rooms',
                error: error.message,
            });
        }
    }


        

    async createRoomRate(req: Request, res: Response) {
        try {
            const roomRateData = req.body;
            const createdRoomRate = await RoomService.createRoomRate(roomRateData);
            return res.status(201).json({
                success: true,
                message: 'Room rate created successfully',
                data: createdRoomRate,
            });
        } catch (error) {
            console.log("🚀 ~ RoomRateController ~ createRoomRate ~ error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create room rate',
                error: error.message,
            });
        }
    }

    async createGuest(req: Request, res: Response) {
        try {
            const guestData = req.body;
            const createdGuest = await RoomService.createGuest(guestData);
            return res.status(201).json({
                success: true,
                message: 'Guest created successfully',
                data: createdGuest,
            });
        } catch (error) {
            console.log("🚀 ~ GuestController ~ createGuest ~ error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create guest',
                error: error.message,
            });
        }
    }

    async createReservation(req: Request, res: Response) {
        try {
            const reservationData = req.body;
            const createdReservation = await RoomService.createReservation(reservationData);
            return res.status(201).json({
                success: true,
                message: 'Reservation created successfully',
                data: createdReservation,
            });
        } catch (error) {
            console.log("🚀 ~ ReservationController ~ createReservation ~ error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to create reservation',
                error: error.message,
            });
        }
    }

    async getRoomDetails(req: Request, res: Response) {
        try {
            const userDe = (req as DecodedRequest).user
            const rooms = await RoomService.getRoomDetails(userDe);
            return res.status(200).json({
                success: true,
                data: rooms,
            });
        } catch (error) {
            console.log("🚀 ~ RoomController ~ getRoomDetails ~ error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve room details',
                error: error.message,
            });
        }
    }

    async getRoomRates(req: Request, res: Response) {
        try {
            const { outletid } = req.params;
            const roomRates = await RoomService.getRoomRates({ outletid });
            return res.status(200).json({
                success: true,
                data: roomRates,
            });
        } catch (error) {
            console.log("🚀 ~ RoomRateController ~ getRoomRates ~ error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve room rates',
                error: error.message,
            });
        }
    }

    async getGuestDetails(req: Request, res: Response) {
        try {
            const userDe = (req as DecodedRequest).user
            const guests = await RoomService.getGuestDetails(userDe);
            return res.status(200).json({
                success: true,
                data: guests,
            });
        } catch (error) {
            console.log("🚀 ~ GuestController ~ getGuestDetails ~ error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve guest details',
                error: error.message,
            });
        }
    }

    async getGuestById(req: Request, res: Response) {
        try {
            const {guestId} = req.params
            const guests = await RoomService.getGuestDetails(guestId);
            return res.status(200).json({
                success: true,
                data: guests,
            });
        } catch (error) {
            console.log("🚀 ~ GuestController ~ getGuestDetails ~ error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve guest details',
                error: error.message,
            });
        }
    }

    async reservationById(req: Request, res: Response) {
        try {
            const {reservationId} = req.params
            const reservations = await RoomService.reservationById(reservationId);
            return res.status(200).json({
                success: true,
                data: reservations,
            });
        } catch (error) {
            console.log("🚀 ~ GuestController ~ getGuestDetails ~ error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve guest details',
                error: error.message,
            });
        }
    }

    async getReservations(req: Request, res: Response) {
        try {
            const { outletid } = req.params;
            const reservations = await RoomService.getReservations({ outletid });
            return res.status(200).json({
                success: true,
                data: reservations,
            });
        } catch (error) {
            console.log("🚀 ~ ReservationController ~ getReservations ~ error:", error);
            return res.status(500).json({
                success: false,
                message: 'Failed to retrieve reservations',
                error: error.message,
            });
        }
    }

    async updateRoom(req: Request, res: Response) {
        try {
            const roomId = req.params.roomId;
            const roomData = req.body;
            const updatedRoom = await RoomService.updateRoom(roomId, roomData);
            if (!updatedRoom) {
                return res.status(404).json({ success: false, message: 'Room not found' });
            }
            return res.status(200).json({ success: true, data: updatedRoom });
        } catch (error) {
            console.log("🚀 ~ HotelController ~ updateRoom ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to update room', error: error.message });
        }
    }

    async deleteRoom(req: Request, res: Response) {
        try {
            const roomId = req.params.roomId;
            const deleted = await RoomService.deleteRoom(roomId);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Room not found' });
            }
            return res.status(200).json({ success: true, message: 'Room deleted successfully' });
        } catch (error) {
            console.log("🚀 ~ HotelController ~ deleteRoom ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to delete room', error: error.message });
        }
    }

    async updateRoomRate(req: Request, res: Response) {
        try {
            const rateId = req.params.rateId;
            const roomRateData = req.body;
            const updatedRoomRate = await RoomService.updateRoomRate(rateId, roomRateData);
            if (!updatedRoomRate) {
                return res.status(404).json({ success: false, message: 'Room rate not found' });
            }
            return res.status(200).json({ success: true, data: updatedRoomRate });
        } catch (error) {
            console.log("🚀 ~ HotelController ~ updateRoomRate ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to update room rate', error: error.message });
        }
    }

    async deleteRoomRate(req: Request, res: Response) {
        try {
            const rateId = req.params.rateId;
            const deleted = await RoomService.deleteRoomRate(rateId);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Room rate not found' });
            }
            return res.status(200).json({ success: true, message: 'Room rate deleted successfully' });
        } catch (error) {
            console.log("🚀 ~ HotelController ~ deleteRoomRate ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to delete room rate', error: error.message });
        }
    }

    async updateGuest(req: Request, res: Response) {
        try {
            const guestId = req.params.guestId;
            const guestData = req.body;
            const updatedGuest = await RoomService.updateGuest(guestId, guestData);
            if (!updatedGuest) {
                return res.status(404).json({ success: false, message: 'Guest not found' });
            }
            return res.status(200).json({ success: true, data: updatedGuest });
        } catch (error) {
            console.log("🚀 ~ HotelController ~ updateGuest ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to update guest', error: error.message });
        }
    }

    async deleteGuest(req: Request, res: Response) {
        try {
            const guestId = req.params.guestId;
            const deleted = await RoomService.deleteGuest(guestId);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Guest not found' });
            }
            return res.status(200).json({ success: true, message: 'Guest deleted successfully' });
        } catch (error) {
            console.log("🚀 ~ HotelController ~ deleteGuest ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to delete guest', error: error.message });
        }
    }

    async updateReservation(req: Request, res: Response) {
        try {
            const reservationId = req.params.reservationId;
            const reservationData = req.body;
            const updatedReservation = await RoomService.updateReservation(reservationId, reservationData);
            if (!updatedReservation) {
                return res.status(404).json({ success: false, message: 'Reservation not found' });
            }
            return res.status(200).json({ success: true, data: updatedReservation });
        } catch (error) {
            console.log("🚀 ~ HotelController ~ updateReservation ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to update reservation', error: error.message });
        }
    }

    async deleteReservation(req: Request, res: Response) {
        try {
            const reservationId = req.params.reservationId;
            const deleted = await RoomService.deleteReservation(reservationId);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Reservation not found' });
            }
            return res.status(200).json({ success: true, message: 'Reservation deleted successfully' });
        } catch (error) {
            console.log("🚀 ~ HotelController ~ deleteReservation ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to delete reservation', error: error.message });
        }
    }
}

export default new RoomController();
