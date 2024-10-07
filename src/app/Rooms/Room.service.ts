import { Guest } from "../../database/models/guest.model";
import { Outlet } from "../../database/models/outlet.model";
import { Reservation } from "../../database/models/reservation.model";
import { Room } from "../../database/models/room.model";
import { RoomRate } from "../../database/models/roomRate.model";
import { RoomType } from "../../database/models/roomType.model";

class RoomService {
    async createRoomType(data) { 
        try {
            const createdRoomData = await RoomType.create({
                typeName: data.typeName,
                description: data.description,
                baseRate: data.baseRate,
                maxOccupancy: data.maxOccupancy,
                amenities: data.amenities,
                outletid: data.outletid
            });
            return createdRoomData;
        } catch (error) {
            console.log("🚀 ~ RoomController ~ createRoom ~ error:", error);
        }
    }

    async updateRoomType(roomTypeId: string, data: any) {
        try {
            const roomType = await RoomType.findByPk(roomTypeId);
            if (!roomType) {
                return null;
            }
            const updatedRoomType = await roomType.update({
                typeName: data.typeName,
                description: data.description,
                baseRate: data.baseRate,
                maxOccupancy: data.maxOccupancy,
                amenities: data.amenities,
                outletid: data.outletid
            });
            return updatedRoomType;
        } catch (error) {
            console.log("🚀 ~ RoomService ~ updateRoomType ~ error:", error);
            throw new Error('Failed to update room type');
        }
    }

    async getRoomTypeById(roomTypeId: string) {
        try {
            const roomType = await RoomType.findByPk(roomTypeId);
            return roomType;
        } catch (error) {
            console.log("🚀 ~ RoomService ~ getRoomTypeById ~ error:", error);
            throw new Error('Failed to get room type');
        }
    }

    async getAllRoomTypes() {
        try {
            const roomTypes = await RoomType.findAll({include : {model : Outlet,attributes : ['outletId','name']}});
            return roomTypes;
        } catch (error) {
            console.log("🚀 ~ RoomService ~ getAllRoomTypes ~ error:", error);
            throw new Error('Failed to get all room types');
        }
    }

    async deleteRoomType(roomTypeId: string) {
        try {
            const roomType = await RoomType.findByPk(roomTypeId);
            if (!roomType) {
                return null;
            }
            await roomType.destroy();
            return true;
        } catch (error) {
            console.log("🚀 ~ RoomService ~ deleteRoomType ~ error:", error);
            throw new Error('Failed to delete room type');
        }
    }

    async createRoom(data) {
        try {
            const createdRoomData = await Room.create({
                roomTypeId: data.roomTypeId,
                roomNumber: data.roomNumber,
                floor: data.floor,
                status: data.status,
                outletid: data.outletid,
            });
            return createdRoomData;
        } catch (error) {
            console.log("🚀 ~ RoomController ~ createRoom ~ error:", error);
            throw error;  
        }
    }

    async getRoomById(roomId: string) {
        try {
            const room = await Room.findByPk(roomId);
            return room;
        } catch (error) {
            console.log("🚀 ~ RoomService ~ getRoomById ~ error:", error);
            throw new Error('Failed to retrieve room');
        }
    }

    async getAllRooms() {
        try {
            const rooms = await Room.findAll();
            return rooms;
        } catch (error) {
            console.log("🚀 ~ RoomService ~ getAllRooms ~ error:", error);
            throw new Error('Failed to retrieve rooms');
        }
    }
    
    
    

    async createRoomRate(data) {
        try {
            const createdRoomRateData = await RoomRate.create({
                roomTypeId: data.roomTypeId,     
                startDate: data.startDate,      
                endDate: data.endDate, 
                ratePerNight: data.ratePerNight,
                outletid: data.outletid
            });
            return createdRoomRateData;
        } catch (error) {
            console.log("🚀 ~ RoomController ~ createRoomRate ~ error:", error);
            throw error;  
        }
    }
    
    async createReservation(data) {
        try {
            const createdReservationData = await Reservation.create({
                guestId: data.guestId,
                roomId: data.roomId,
                reservationDate: data.reservationDate,
                checkInDate: data.checkInDate,
                checkOutDate: data.checkOutDate,
                status: data.status,
                paymentStatus: data.paymentStatus,
                totalAmount: data.totalAmount,
                specialRequests: data.specialRequests,
                outletid: data.outletid
            });
            return createdReservationData;
        } catch (error) {
            console.log("🚀 ~ ReservationController ~ createReservation ~ error:", error);
            throw error;  
        }
    }
    
    async createGuest(data) {
        try {
            const createdGuestData = await Guest.create({
                firstName: data.firstName,           
                lastName: data.lastName,              
                email: data.email,
                phone: data.phone,
                address: data.address,
                identificationType: data.identificationType,
                identificationNumber: data.identificationNumber,
                dateOfBirth: data.dateOfBirth,
                outletid: data.outletid
            });
            return createdGuestData;
        } catch (error) {
            console.log("🚀 ~ GuestController ~ createGuest ~ error:", error);
            throw error;  
        }
    }
    
    async getRoomDetails(user) {
        try {
            const rooms = await Room.findAll({ where: { outletid: user.outletId } ,include : [{model : Outlet,attributes : ['outletId','name']},{model : Room,attributes : ['roomTypeId','typeName']}]});
            return rooms;
        } catch (error) {
            console.log("🚀 ~ RoomService ~ getRoomDetails ~ error:", error);
            throw new Error('Failed to fetch room details');
        }
    }

    async getRoomRates(data) {
        try {
            const roomRates = await RoomRate.findAll({ where: { outletid: data.outletid } });
            return roomRates;
        } catch (error) {
            console.log("🚀 ~ RoomRateService ~ getRoomRates ~ error:", error);
            throw new Error('Failed to fetch room rates');
        }
    }

    async getGuestDetails(data) {
        try {
            const guests = await Guest.findAll({ where: { outletid: data.outletid } });
            return guests;
        } catch (error) {
            console.log("🚀 ~ GuestService ~ getGuestDetails ~ error:", error);
            throw new Error('Failed to fetch guest details');
        }
    }

    async getReservations(data) {
        try {
            const reservations = await Reservation.findAll({ where: { outletid: data.outletid } });
            return reservations;
        } catch (error) {
            console.log("🚀 ~ ReservationService ~ getReservations ~ error:", error);
            throw new Error('Failed to fetch reservations');
        }
    }

    async updateRoom(roomId: any, roomData: any) {
        try {
            const room = await Room.findByPk(roomId);
            if (!room) return null;
            return await room.update(roomData);
        } catch (error) {
            console.log("🚀 ~ RoomService ~ updateRoom ~ error:", error);
            throw new Error('Failed to update room');
        }
    }

    async deleteRoom(roomId: any) {
        try {
            const room = await Room.findByPk(roomId);
            if (!room) return null;
            await room.destroy();
            return true;
        } catch (error) {
            console.log("🚀 ~ RoomService ~ deleteRoom ~ error:", error);
            throw new Error('Failed to delete room');
        }
    }

    async updateRoomRate(rateId: any, roomRateData: any) {
        try {
            const roomRate = await RoomRate.findByPk(rateId);
            if (!roomRate) return null;
            return await roomRate.update(roomRateData);
        } catch (error) {
            console.log("🚀 ~ RoomRateService ~ updateRoomRate ~ error:", error);
            throw new Error('Failed to update room rate');
        }
    }

    async deleteRoomRate(rateId: any) {
        try {
            const roomRate = await RoomRate.findByPk(rateId);
            if (!roomRate) return null;
            await roomRate.destroy();
            return true;
        } catch (error) {
            console.log("🚀 ~ RoomRateService ~ deleteRoomRate ~ error:", error);
            throw new Error('Failed to delete room rate');
        }
    }

    async updateGuest(guestId: any, guestData: any) {
        try {
            const guest = await Guest.findByPk(guestId);
            if (!guest) return null;
            return await guest.update(guestData);
        } catch (error) {
            console.log("🚀 ~ GuestService ~ updateGuest ~ error:", error);
            throw new Error('Failed to update guest');
        }
    }

    async deleteGuest(guestId: any) {
        try {
            const guest = await Guest.findByPk(guestId);
            if (!guest) return null;
            await guest.destroy();
            return true;
        } catch (error) {
            console.log("🚀 ~ GuestService ~ deleteGuest ~ error:", error);
            throw new Error('Failed to delete guest');
        }
    }

    async updateReservation(reservationId: any, reservationData: any) {
        try {
            const reservation = await Reservation.findByPk(reservationId);
            if (!reservation) return null;
            return await reservation.update(reservationData);
        } catch (error) {
            console.log("🚀 ~ ReservationService ~ updateReservation ~ error:", error);
            throw new Error('Failed to update reservation');
        }
    }

    async deleteReservation(reservationId: any) {
        try {
            const reservation = await Reservation.findByPk(reservationId);
            if (!reservation) return null;
            await reservation.destroy();
            return true;
        } catch (error) {
            console.log("🚀 ~ ReservationService ~ deleteReservation ~ error:", error);
            throw new Error('Failed to delete reservation');
        }
    }
}

export default new RoomService();
