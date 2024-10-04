import express from "express";
import hotelController from "../app/hotel/hotel.controller";
import outletController from "../app/outlet/outlet.controller";
import userController from "../app/user/user.controller";
import passport from "./../authentication/authmiddleware";
import moduleController from "../app/module/module.controller";
import RoomController from "../app/Rooms/Room.controller";
import dropdownController from "../app/allDropdown/dropdown.controller";

const router = express.Router();

//hotel
router.post('/hotels',hotelController.createHotel)
router.get('/get-hotel',hotelController.getHotels)



//outlet
router.post('/outlet',outletController.createoutlet)
router.get('/get-outlet',outletController.getoutlets)


//userrelated
router.post('/role',userController.createRole)
router.post('/user',userController.createUser)
router.post('/login',userController.loginUser)
router.get('/getUser',userController.getusers)
router.get('/getRole',userController.getroles)

//module related
router.post('/moduletype',moduleController.CreateModuleType)
router.post('/module',moduleController.CreateModule)
router.get('/get-page',moduleController.getPage)
router.get('/get-module',moduleController.getModule)
router.get('/get-moduletype',moduleController.getModuleType)
router.post('/page',moduleController.CreatePage)
router.post('/rolewisePermission',moduleController.CreateRolePagePerm)
router.post('/userwisePermission',moduleController.CreateUserPagePerm)
router.get('/getPerm',passport.authenticate('jwt', { session: false }),moduleController.permissionWiseData)

//room related
router.post('/createRoom',RoomController.createRoomType)


// Room Types
router.post('/roomType', RoomController.createRoomType);

// Rooms
router.post('/room', RoomController.createRoom);
router.get('/rooms/:outletid', RoomController.getRoomDetails);
router.put('/room/:roomId', RoomController.updateRoom);
router.delete('/room/:roomId', RoomController.deleteRoom);

// Room Rates
router.post('/roomRate', RoomController.createRoomRate);
router.get('/roomRates/:outletid', RoomController.getRoomRates);
router.put('/roomRate/:rateId', RoomController.updateRoomRate);
router.delete('/roomRate/:rateId', RoomController.deleteRoomRate);

// Guests
router.post('/guest', RoomController.createGuest);
router.get('/guests/:outletid', RoomController.getGuestDetails);
router.put('/guest/:guestId', RoomController.updateGuest);
router.delete('/guest/:guestId', RoomController.deleteGuest);

// Reservations
router.post('/reservation', RoomController.createReservation);
router.get('/reservations/:outletid', RoomController.getReservations);
router.put('/reservation/:reservationId', RoomController.updateReservation);
router.delete('/reservation/:reservationId', RoomController.deleteReservation);

router.get('/dropdown-hotels', dropdownController.hotelDropdown);
router.get('/dropdown-outlets', dropdownController.outletDropdown);
router.get('/dropdown-guests', dropdownController.guestDropdown);
router.get('/dropdown-modules', dropdownController.moduleDropdown);
router.get('/dropdown-pages', dropdownController.pageDropdown);
router.get('/dropdown-reservations', dropdownController.reservationDropdown);
// router.get('/role-permissions', dropdownController.rolePermissionDropdown);
router.get('/dropdown-rooms', dropdownController.roomDropdown);
router.get('/dropdown-room-types', dropdownController.roomTypeDropdown);
router.get('/dropdown-room-rates', dropdownController.roomRateDropdown);
router.get('/dropdown-users', dropdownController.userDropdown); 
router.get('/dropdown-roles', dropdownController.roleDropdown); 
// router.get('/user-permissions', dropdownController.userPermissionDropdown);



export default router