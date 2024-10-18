import { Sequelize } from "sequelize-typescript";
import Hotel from "./hotel.model";
import { Outlet } from "./outlet.model";
import User from "./user.model";
import Role from "./role.model";
import RolePermission from "./role-permission.model";
import UserPermission from "./user-permission.model";
import Module from "./module.model";
import ModuleType from "./module-type.model";
import Page from "./page.model";
import BillDetail from "./billdetail.model";
import Bill from "./bills.model";
import CheckIn from "./checkin.model";
import CheckOut from "./checkout.model";
import { Reservation } from "./reservation.model";
import { Room } from "./room.model";
import { RoomRate } from "./roomRate.model";
import { RoomType } from "./roomType.model";
import { Guest } from "./guest.model";
import { Inventory } from "./inventory.model";
import { Shift } from "./shift.model";
import { Staff } from "./staff.model";
import { Suppliers } from "./suppliers.model";
import { SuppliesOrders } from "./suppliesorder.table";
import { Supplies } from "./supply.model";
import { ReservationTime } from "./reservationTime.model";
import Cleaning from "./cleaning.model";
import { TableReservations } from "./tableReservation.model";
import { Menu } from "./menu.model";
import { OrderItems } from "./orderItems.model";
import { Orders } from "./orders.models";
import { Payments } from "./payment.model";
import { Tables } from "./tables.model";
import HotelImage from "./hotelImages.model";
import OutletImage from "./outletImage.model";
import RoomImage from "./roomImages.model";

const sequelize = new Sequelize({
  database : 'hotelmanagement',
  password : 'Aashutosh@123',
  host : 'localhost',
  username : 'root',
  dialect : 'mysql',
   timezone: '+00:00',
  models : [Hotel,Outlet,User,RolePermission,UserPermission,Module,ModuleType,BillDetail,Bill,CheckIn,CheckOut,Reservation,Room,RoomRate,RoomType,Guest,Page,Role,Inventory,Shift,Staff,Suppliers,SuppliesOrders,Supplies,ReservationTime,Cleaning,TableReservations,Menu,OrderItems,Orders,Payments,Tables,HotelImage,OutletImage,RoomImage]
})

export default sequelize