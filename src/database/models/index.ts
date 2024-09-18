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

const sequelize = new Sequelize({
  database : 'hotelmanagement',
  password : 'Aashutosh@123',
  host : 'localhost',
  username : 'root',
  dialect : 'mysql',
  models : [Hotel,Outlet,Role,User,RolePermission,UserPermission,Module,ModuleType,Page]
})

export default sequelize