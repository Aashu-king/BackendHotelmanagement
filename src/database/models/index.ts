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

const sequelize = new Sequelize({
  database : 'hotelmanagement',
  password : 'Aashutosh@123',
  host : 'localhost',
  username : 'root',
  dialect : 'mysql',
  models : [Hotel,Outlet,User,RolePermission,UserPermission,Module,ModuleType,BillDetail,Bill,CheckIn,CheckOut,Reservation,Room,RoomRate,RoomType,Guest,Page,Role]
})

export default sequelize