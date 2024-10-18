import moment from "moment";
import { Guest } from "../../database/models/guest.model";
import { Outlet } from "../../database/models/outlet.model";
import { Reservation } from "../../database/models/reservation.model";
import { Room } from "../../database/models/room.model";
import { RoomRate } from "../../database/models/roomRate.model";
import { RoomType } from "../../database/models/roomType.model";
import Bill from "../../database/models/bills.model";
import BillDetail from "../../database/models/billdetail.model";
import RoomImage from "../../database/models/roomImages.model";

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

    async GetTotalAmountForReservation(data){
        try {

            const RoomData = await Room.findOne({where : {roomId : data.roomId},attributes : ['roomId','roomTypeId']})
            console.log("🚀 ~ RoomService ~ createReservation ~ RoomData:", RoomData.roomTypeId)

            const RoomRateData  = await RoomRate.findOne({where : {roomTypeId : RoomData.roomTypeId},attributes : ['ratePerNight','rateId']})
            console.log("🚀 ~ RoomService ~ createReservation ~ RoomRateData:", RoomRateData.ratePerNight)
            const fromDate = moment(data.checkInDate)
            console.log("🚀 ~ RoomService ~ createReservation ~ fromDate:", fromDate)
            const toDate = moment(data.checkOutDate)
            console.log("🚀 ~ RoomService ~ createReservation ~ toDate:", toDate)
            const TotalNumberOfDays = toDate.diff(fromDate,'days')
            console.log("🚀 ~ RoomService ~ GetTotalAmountForReservation ~ TotalNumberOfDays:", TotalNumberOfDays)

            const TotalAmount = RoomRateData.ratePerNight * TotalNumberOfDays
            console.log("🚀 ~ RoomService ~ createReservation ~ TotalAmount:", TotalAmount)
            console.log("🚀 ~ RoomService ~ createReservation ~ TotalNumberOfDays:", TotalNumberOfDays)

            return TotalAmount;
        } catch (error) {
            console.log("🚀 ~ ReservationController ~ createReservation ~ error:", error);
            throw error;  
        }
    }
    
    async createReservation(data,billForm,billDetailForm) {
        try {
            console.log("🚀 ~ RoomService ~ createReservation ~ data:", data)

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

            const createBill = await Bill.create({
                guestId: billForm.guestId,              
                reservationId: createdReservationData.reservationId,  
                totalAmount: billForm.totalAmount,      
                paymentMethod: billForm.paymentMethod,  
                status: billForm.status,               
                outletid: billForm.outletid             
              });


            if (createBill && createBill.billId) {
                const createBillDetails = await BillDetail.create({
                    billId: createBill.billId,           
                    outletid: billDetailForm.outletid,    
                    description: billDetailForm.description,
                    amount: billDetailForm.amount        
                });
                console.log("🚀 ~ RoomService ~ createReservation ~ createBillDetails:", createBillDetails)
            
                console.log("🚀 ~ RoomService ~ createReservation ~ createBillDetails:", createBillDetails);
            }

            let obj = {
                reservation : createdReservationData,
                Bill : createBill,
                BillDetail : createBill
            }

            return obj;
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
            const rooms = await Room.findAll({ where: { outletid: user.outletId } ,include : [{model : Outlet,attributes : ['outletId','name']},{model : RoomType,attributes : ['roomTypeId','typeName']}]});
            return rooms;
        } catch (error) {
            console.log("🚀 ~ RoomService ~ getRoomDetails ~ error:", error);
            throw new Error('Failed to fetch room details');
        }
    }

    async getRoomDetailsUser() {
        try {
            const rooms = await Room.findAll({include : [{model : Outlet,attributes : ['outletId','name']},{model : RoomType,attributes : ['roomTypeId','typeName']},{model : RoomImage}]});
            return rooms;
        } catch (error) {
            console.log("🚀 ~ RoomService ~ getRoomDetails ~ error:", error);
            throw new Error('Failed to fetch room details');
        }
    }
    async getRoomRates(data) {
        try {
            const roomRates = await RoomRate.findAll({ where: { outletid: data.outletId } });
            return roomRates;
        } catch (error) {
            console.log("🚀 ~ RoomRateService ~ getRoomRates ~ error:", error);
            throw new Error('Failed to fetch room rates');
        }
    }

    async getGuestDetails(user) {
        try {
            const guests = await Guest.findAll({ where: { outletid: user.outletId } });
            return guests;
        } catch (error) {
            console.log("🚀 ~ GuestService ~ getGuestDetails ~ error:", error);
            throw new Error('Failed to fetch guest details');
        }
    }

    async getGuestById(guestId) {
        try {
            const guests = await Guest.findByPk(guestId);
            return guests;
        } catch (error) {
            console.log("🚀 ~ GuestService ~ getGuestDetails ~ error:", error);
            throw new Error('Failed to fetch guest details');
        }
    }

    async reservationById(reservationId) {
        try {
            const guests = await Reservation.findByPk(reservationId);
            return guests;
        } catch (error) {
            console.log("🚀 ~ GuestService ~ getGuestDetails ~ error:", error);
            throw new Error('Failed to fetch guest details');
        }
    }

    async ratesById(rateId) {
        try {
            const guests = await RoomRate.findByPk(rateId);
            return guests;
        } catch (error) {
            console.log("🚀 ~ GuestService ~ getGuestDetails ~ error:", error);
            throw new Error('Failed to fetch guest details');
        }
    }

    async getReservations(data) {
        try {
            const reservations = await Reservation.findAll({ where: { outletid: data.outletId } });
            return reservations;
        } catch (error) {
            console.log("🚀 ~ ReservationService ~ getReservations ~ error:", error);
            throw new Error('Failed to fetch reservations');
        }
    }

    async getPaymentStatus(data,reservationId){
        try {
            // const reservations = await Reservation.findAll({ where: [{ reservationId: data.reservationId },{ outletid: data.outletId }] });
            // console.log("🚀 ~ RoomService ~ getReservations ~ reservations:", reservations)
            const isBillCleared = await Bill.findOne({where : [{ reservationId: reservationId },{ outletid: data.outletId },{status : 'unpaid'}]})
            let totalOfBill = isBillCleared.totalAmount
            // isBillCleared.map((ele : any) => {
            //     totalOfBill += ele.totalAmount
            // })
            console.log("🚀 ~ RoomService ~ isBillCleared.map ~ totalOfBill:", totalOfBill)
            const amountthatHasBeenPaid = await BillDetail.findAll({where : {billId : isBillCleared.billId}})
            console.log("🚀 ~ RoomService ~ getReservations ~ amountthatHasBeenPaid:", amountthatHasBeenPaid)
            let theAmountActuallyPaid = 0
            amountthatHasBeenPaid.map((ele : any) => {
                theAmountActuallyPaid += ele.amount
            })
            console.log("🚀 ~ RoomService ~ amountthatHasBeenPaid.map ~ theAmountActuallyPaid:", theAmountActuallyPaid)
            console.log("🚀 ~ RoomService ~ getReservations ~ isBillCleared:", isBillCleared)
            let obj = {}
            if(totalOfBill != theAmountActuallyPaid){
                obj['canHeCheckIn'] = false,
                obj['AmountTobePaidMore'] = totalOfBill - theAmountActuallyPaid
                obj['billId'] = isBillCleared.billId
                obj['outletid'] = isBillCleared.outletid
            }else if(totalOfBill == theAmountActuallyPaid){
                obj['canHeCheckIn'] = true,
                obj['AmountTobePaidMore'] = 0
                const statusNeedTobeUpdated = await Reservation.update({paymentStatus : 'paid'},
                    {where : {reservationId : reservationId}})
                    const statusForBill = await Bill.update({status : 'paid'},
                       { where : {reservationId : reservationId}}
                    )

                    if(statusNeedTobeUpdated || statusForBill){
                        console.log("🚀 ~ RoomService ~ getPaymentStatus ~ statusNeedTobeUpdated:", statusNeedTobeUpdated)
                    }else{
                        console.log("🚀 ~ RoomService ~ getPaymentStatus :", statusNeedTobeUpdated)

                    }
                    
            }else{
                obj = {}
            }
            console.log("🚀 ~ RoomService ~ getPaymentStatus ~ obj:", obj)

            return obj;
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
            const updatedContent =  await roomRate.update(roomRateData);
            return updatedContent
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
