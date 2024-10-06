import { Response, Request } from "express";
import Hotel from "../../database/models/hotel.model";
import {Guest} from "../../database/models/guest.model";
import Module from "../../database/models/module.model";
import {Outlet} from "../../database/models/outlet.model";
import Page from "../../database/models/page.model";
import {Reservation} from "../../database/models/reservation.model";
import RolePermission from "../../database/models/role-permission.model";
import {Room} from "../../database/models/room.model";
import {RoomType} from "../../database/models/roomType.model";
import {RoomRate} from "../../database/models/roomRate.model";
import User from "../../database/models/user.model";
import Role from "../../database/models/role.model";
import ModuleType from "../../database/models/module-type.model";

class DropDown {
    async hotelDropdown(req: Request, res: Response) {
        try {
            const hotelData = await Hotel.findAll({ attributes: ['hotelid', 'name'] });
            res.status(200).json(hotelData);
        } catch (error) {
            console.error("🚀 ~ DropDown ~ hotelDropdown ~ error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async outletDropdown(req: Request, res: Response) {
        try {
            const outletData = await Outlet.findAll({ attributes: ['outletid', 'name'] });
            res.status(200).json(outletData);
        } catch (error) {
            console.error("🚀 ~ DropDown ~ outletDropdown ~ error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async guestDropdown(req: Request, res: Response) {
        try {
            const guestData = await Guest.findAll({ attributes: ['guestId', 'firstName', 'lastName'] });
            res.status(200).json(guestData);
        } catch (error) {
            console.error("🚀 ~ DropDown ~ guestDropdown ~ error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async moduleDropdown(req: Request, res: Response) {
        try {
            const moduleData = await Module.findAll({ attributes: ['moduleId', 'moduleName'] });
            res.status(200).json(moduleData);
        } catch (error) {
            console.error("🚀 ~ DropDown ~ moduleDropdown ~ error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async moduleTypeDropdown(req: Request, res: Response) {
        try {
            const moduleData = await ModuleType.findAll({ attributes: ['moduleTypeId', 'moduleTypeName'] });
            res.status(200).json(moduleData);
        } catch (error) {
            console.error("🚀 ~ DropDown ~ moduleDropdown ~ error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async pageDropdown(req: Request, res: Response) {
        try {
            const pageData = await Page.findAll({ attributes: ['pageId', 'pageName'] });
            res.status(200).json(pageData);
        } catch (error) {
            console.error("🚀 ~ DropDown ~ pageDropdown ~ error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async reservationDropdown(req: Request, res: Response) {
        try {
            const reservationData = await Reservation.findAll({ attributes: ['reservationId', 'status'] });
            res.status(200).json(reservationData);
        } catch (error) {
            console.error("🚀 ~ DropDown ~ reservationDropdown ~ error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // async rolePermissionDropdown(req: Request, res: Response) {
    //     try {
    //         const rolePermissionData = await RolePermission.findAll({ attributes: ['roleId', 'pageId'] });
    //         res.status(200).json(rolePermissionData);
    //     } catch (error) {
    //         console.error("🚀 ~ DropDown ~ rolePermissionDropdown ~ error:", error);
    //         res.status(500).json({ message: "Internal Server Error" });
    //     }
    // }

    async roomDropdown(req: Request, res: Response) {
        try {
            const roomData = await Room.findAll({ attributes: ['roomId', 'roomNumber'] });
            res.status(200).json(roomData);
        } catch (error) {
            console.error("🚀 ~ DropDown ~ roomDropdown ~ error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async roomTypeDropdown(req: Request, res: Response) {
        try {
            const roomTypeData = await RoomType.findAll({ attributes: ['roomTypeId', 'typeName'] });
            res.status(200).json(roomTypeData);
        } catch (error) {
            console.error("🚀 ~ DropDown ~ roomTypeDropdown ~ error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async roomRateDropdown(req: Request, res: Response) {
        try {
            const roomRateData = await RoomRate.findAll({ attributes: ['rateId', 'ratePerNight', 'startDate', 'endDate'] });
            res.status(200).json(roomRateData);
        } catch (error) {
            console.error("🚀 ~ DropDown ~ roomRateDropdown ~ error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async userDropdown(req: Request, res: Response) {
        try {
            const userData = await User.findAll({ attributes: ['userId', 'userName'] });
            res.status(200).json(userData);
        } catch (error) {
            console.error("🚀 ~ DropDown ~ userDropdown ~ error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    async roleDropdown(req: Request, res: Response) {
        try {
            const userData = await Role.findAll({ attributes: ['roleId', 'roleName'] });
            res.status(200).json(userData);
        } catch (error) {
            console.error("🚀 ~ DropDown ~ userDropdown ~ error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    // async userPermissionDropdown(req: Request, res: Response) {
    //     try {
    //         const userPermissionData = await UserPermission.findAll({ attributes: ['userId', 'pageId'] });
    //         res.status(200).json(userPermissionData);
    //     } catch (error) {
    //         console.error("🚀 ~ DropDown ~ userPermissionDropdown ~ error:", error);
    //         res.status(500).json({ message: "Internal Server Error" });
    //     }
    // }
}

export default new DropDown();
