import express from "express";
import hotelController from "../app/hotel/hotel.controller";
import outletController from "../app/outlet/outlet.controller";
import userController from "../app/user/user.controller";
import passport from "./../authentication/authmiddleware";
import moduleController from "../app/module/module.controller";
import RoomController from "../app/Rooms/Room.controller";
import dropdownController from "../app/allDropdown/dropdown.controller";
import bookingController from "../app/booking/booking.controller";
import dashboardController from "../app/dashboardSpecial/dashboard.controller";
import staffController from "../app/staff/staff.controller";
import orderItemsController from "../app/restaurents/orderItems/orderItems.controller";
import ordersController from "../app/restaurents/orders/orders.controller";
import menuController from "../app/restaurents/menu/menu.controller";
import paymentController from "../app/restaurents/payment/payment.controller";
import tablesController from "../app/restaurents/tables/tables.controller";
import upload from './../common/multerCinfig'

const router = express.Router();

//hotel
router.post('/hotels',hotelController.createHotel)
router.get('/get-hotel',hotelController.getHotels)
router.get('/hotel/:id', hotelController.getHotelById);
router.delete('/hotel/:id', hotelController.deleteHotel);
router.put('/hotel/:id', hotelController.updateHotel);
router.post('/upload', upload.array('images', 10), hotelController.uploadHotelImages);
router.post('/uploadOutlet', upload.array('images', 10), hotelController.uploadOutletImages);
router.post('/uploadRoom', upload.array('images', 10), hotelController.uploadRoomImages);


//outlet
router.post('/outlet',outletController.createoutlet)
router.get('/get-outlet',outletController.getoutlets)
router.get('/outlet/:id', outletController.getoutletById);
router.delete('/outlet/:id', outletController.deleteoutlet);
router.put('/outlet/:id', outletController.updateoutlet);

//userrelated
router.post('/role',userController.createRole)
router.post('/user',userController.createUser)
router.post('/login',userController.loginUser)
router.get('/getUser',userController.getusers)
router.get('/getRole',userController.getroles)
router.get('/user/:id', userController.getuserById);
router.put('/user/:id', userController.updateuser);


//module related
//for module part 
router.post('/moduletype', moduleController.CreateModuleType);
router.put('/module-type/:id', moduleController.UpdateModuleType);
router.delete('/module-type/:id', moduleController.DeleteModuleType);
router.get('/module-type/:id', moduleController.GetModuleTypeById);
router.get('/get-moduletype',moduleController.getModuleType)

router.post('/module', moduleController.CreateModule);
router.put('/module/:id', moduleController.UpdateModule);
router.delete('/module/:id', moduleController.DeleteModule);
router.get('/module/:id', moduleController.GetModuleById);
router.get('/get-module',moduleController.getModule)


router.post('/page', moduleController.CreatePage);
router.put('/page/:id', moduleController.UpdatePage);
router.delete('/page/:id', moduleController.DeletePage);
router.get('/page/:id', moduleController.GetPageById);
router.get('/get-page',moduleController.getPage)

//in module permission related
router.post('/rolewisePermission',moduleController.CreateRolePagePerm)

router.post('/userwisePermission',moduleController.CreateUserPagePerm)
router.put('/upuserpermission', moduleController.updateUserPermission);
router.delete('/user-permission', moduleController.deleteUserPermission);
router.get('/user-permission', moduleController.getUserPermissionById);

router.get('/getPerm',passport.authenticate('jwt', { session: false }),moduleController.permissionWiseData)

router.get('/userperm',moduleController.userpermissionData)
router.get('/roleperm',moduleController.rolepermissionData)


//room related

router.post('/room-type', RoomController.createRoomType);

router.put('/room-type/:roomTypeId', RoomController.updateRoomType);

router.get('/room-type/:roomTypeId', RoomController.getRoomTypeById);

router.get('/room-types', RoomController.getAllRoomTypes);

router.delete('/room-type/:roomTypeId', RoomController.deleteRoomType);


// Room Types
// router.post('/roomType', RoomController.createRoomType);

// Rooms
router.post('/room', RoomController.createRoom);
router.get('/rooms',passport.authenticate('jwt', { session: false }), RoomController.getRoomDetails);
router.get('/roomse/:roomId', RoomController.getRoomById);
router.put('/room/:roomId', RoomController.updateRoom);
router.delete('/room/:roomId', RoomController.deleteRoom);

// Room Rates
router.post('/roomRate', RoomController.createRoomRate);
router.get('/roomRates',passport.authenticate('jwt', { session: false }), RoomController.getRoomRates);
router.put('/roomRate/:rateId', RoomController.updateRoomRate);
router.get('/roomRates/:rateId', RoomController.ratesById);
router.delete('/roomRate/:rateId', RoomController.deleteRoomRate);

// Guests
router.post('/guest', RoomController.createGuest);
router.get('/guests',passport.authenticate('jwt', { session: false }), RoomController.getGuestDetails);
router.put('/guest/:guestId', RoomController.updateGuest);
router.delete('/guest/:guestId', RoomController.deleteGuest);
router.get('/guest/:guestId', RoomController.getGuestById);

// Reservations
router.post('/reservation', RoomController.createReservation);
router.get('/reservations',passport.authenticate('jwt', { session: false }), RoomController.getReservations);
router.get('/paymentStatus',passport.authenticate('jwt', { session: false }), RoomController.getPaymentStatus);
router.get('/reservationTotal',passport.authenticate('jwt', { session: false }), RoomController.getTotalAmountForRes);
router.put('/reservation/:reservationId', RoomController.updateReservation);
router.delete('/reservation/:reservationId', RoomController.deleteReservation);
router.get('/reservation/:reservationId', RoomController.reservationById);

router.get('/dropdown-hotels', dropdownController.hotelDropdown);
router.get('/dropdown-outlets', dropdownController.outletDropdown);
router.get('/dropdown-guests', dropdownController.guestDropdown);
router.get('/dropdown-modules', dropdownController.moduleDropdown);
router.get('/dropdown-moduleType', dropdownController.moduleTypeDropdown);
router.get('/dropdown-pages', dropdownController.pageDropdown);
router.get('/dropdown-reservations', dropdownController.reservationDropdown);
// router.get('/role-permissions', dropdownController.rolePermissionDropdown);
router.get('/dropdown-rooms', dropdownController.roomDropdown);
router.get('/dropdown-room-types', dropdownController.roomTypeDropdown);
router.get('/dropdown-room-rates', dropdownController.roomRateDropdown);
router.get('/dropdown-users', dropdownController.userDropdown); 
router.get('/dropdown-roles', dropdownController.roleDropdown); 
// router.get('/user-permissions', dropdownController.userPermissionDropdown);

router.post('/bill-detail', bookingController.createBillDetail);
router.put('/bill-detail/:billDetailId', bookingController.updateBillDetail);
router.delete('/bill-detail/:billDetailId', bookingController.deleteBillDetail);
router.get('/bill-detail/:billDetailId', bookingController.getBillDetailById);
router.get('/bill-details', bookingController.getAllBillDetails);

router.post('/check-in', bookingController.createCheckIn);
router.put('/check-in/:checkInId', bookingController.updateCheckIn);
router.delete('/check-in/:checkInId', bookingController.deleteCheckIn);
router.get('/check-in/:checkInId', bookingController.getByIdCheckIn);
router.get('/check-ins', bookingController.getAllCheckIns);

router.post('/check-out', bookingController.createCheckOut);
router.put('/check-out/:checkOutId', bookingController.updateCheckOut);
router.delete('/check-out/:checkOutId', bookingController.deleteCheckOut);
router.get('/check-out/:checkOutId', bookingController.getByIdCheckOuts);
router.get('/check-outs', bookingController.getAllCheckOuts);

router.post('/bill', bookingController.createBill);
router.put('/bill/:billId', bookingController.updateBill);
router.delete('/bill/:billId', bookingController.deleteBill);
router.get('/bill/:billId', bookingController.getBillDetailById);
router.get('/bills', bookingController.getAllBills);



//Dashboard
router.get('/theDate',passport.authenticate('jwt', { session: false }), dashboardController.RoomAvailable);
router.get('/theGuestData',passport.authenticate('jwt', { session: false }), dashboardController.GuestData);
router.get('/theSchdueling',passport.authenticate('jwt', { session: false }), staffController.addStaffShift);


//restaurents related

router.get('/tables', tablesController.getAllTables);
router.get('/tables/:id', tablesController.getTableById);
router.post('/tables', tablesController.createTable);
router.put('/tables/:id', tablesController.updateTable);
router.delete('/tables/:id', tablesController.deleteTable);

router.get('/table/reservations', tablesController.getAllReservations);
router.get('/table-reservations/:id', tablesController.getReservationById);
router.post('/table-reservation', tablesController.createReservation);
router.put('/table-reservations/:id', tablesController.updateReservation);
router.delete('/table-reservations/:id', tablesController.deleteReservation);

router.get('/order-items', orderItemsController.getAllOrderItems);
router.get('/orderItems/:id', orderItemsController.getOrderItemById);
router.post('/orderItems', orderItemsController.createOrderItem);
router.put('/orderItems/:id', orderItemsController.updateOrderItem);
router.delete('orderItems/:id', orderItemsController.deleteOrderItem);

router.get('/reorders', ordersController.getAllOrders);
router.get('/orders/:id', ordersController.getOrderById);
router.post('/orders', ordersController.createOrder);
router.put('/orders/:id', ordersController.updateOrder);
router.delete('/orders/:id', ordersController.deleteOrder);

router.get('/menu', menuController.getAllMenuItems);
router.get('/menus/:id', menuController.getMenuItemById);
router.post('/menus', menuController.createMenuItem);
router.put('/menus/:id', menuController.updateMenuItem);
router.delete('/menus/:id', menuController.deleteMenuItem);

router.get('/payments', paymentController.getAllPayments);
router.get('/payments/:id', paymentController.getPaymentById);
router.post('/payments', paymentController.createPayment);
router.put('/payments/:id', paymentController.updatePayment);
router.delete('/payments/:id', paymentController.deletePayment);
router.get('/graphData', dashboardController.graphData);
router.get('/outletGraphData', dashboardController.outletwiseCollectionData);


//user
router.get('/userrooms', RoomController.getRoomDetailsUser);

export default router