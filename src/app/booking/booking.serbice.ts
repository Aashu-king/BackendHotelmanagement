
// import { Outlet } from '../models/outlet.model';
import Bill from '../../database/models/bills.model';
import BillDetail from '../../database/models/billdetail.model';
import { Outlet } from '../../database/models/outlet.model';
import  BillDetailController  from './booking.controller';
import CheckIn from '../../database/models/checkin.model';
import CheckOut from '../../database/models/checkout.model';

 class BillDetailService {
     async createBillDetail(billDetailData: any) {
        try {
            const newBillDetail = await BillDetail.create(billDetailData);
            return newBillDetail;
        } catch (error) {
            console.log("🚀 ~ BillDetailService ~ createBillDetail ~ error:", error);
            throw new Error('Failed to create bill detail');
        }
    }

     async updateBillDetail(billDetailId: any, billDetailData: any) {
        try {
            const billDetail = await BillDetail.findByPk(billDetailId);
            if (!billDetail) return null;
            return await billDetail.update(billDetailData);
        } catch (error) {
            console.log("🚀 ~ BillDetailService ~ updateBillDetail ~ error:", error);
            throw new Error('Failed to update bill detail');
        }
    }

     async deleteBillDetail(billDetailId: any) {
        try {
            const billDetail = await BillDetail.findByPk(billDetailId);
            if (!billDetail) return null;
            await billDetail.destroy();
            return true;
        } catch (error) {
            console.log("🚀 ~ BillDetailService ~ deleteBillDetail ~ error:", error);
            throw new Error('Failed to delete bill detail');
        }
    }

     async getBillDetailById(billDetailId: any) {
        try {
            const billDetail = await BillDetail.findByPk(billDetailId, {
                include: [Bill]
            });
            if (!billDetail) return null;
            return billDetail;
        } catch (error) {
            console.log("🚀 ~ BillDetailService ~ getBillDetailById ~ error:", error);
            throw new Error('Failed to fetch bill detail');
        }
    }

    async getByIdCheckIn(checkInId: any) {
        try {
            const InDetail = await CheckIn.findByPk(checkInId);
            if (!InDetail) return null;
            return InDetail;
        } catch (error) {
            console.log("🚀 ~ BillDetailService ~ getBillDetailById ~ error:", error);
            throw new Error('Failed to fetch bill detail');
        }
    }
    

    async getByIdCheckOuts(checkOutId: any) {
        try {
            const InDetail = await CheckOut.findByPk(checkOutId);
            if (!InDetail) return null;
            return InDetail;
        } catch (error) {
            console.log("🚀 ~ BillDetailService ~ getBillDetailById ~ error:", error);
            throw new Error('Failed to fetch bill detail');
        }
    }

     async createCheckIn(checkInData: any) {
        try {
            const newCheckIn = await CheckIn.create(checkInData);
            return newCheckIn;
        } catch (error) {
            console.log("🚀 ~ CheckInService ~ createCheckIn ~ error:", error);
            throw new Error('Failed to create check-in');
        }
    }

     async updateCheckIn(checkInId: any, checkInData: any) {
        try {
            const checkIn = await CheckIn.findByPk(checkInId);
            if (!checkIn) return null;
            return await checkIn.update(checkInData);
        } catch (error) {
            console.log("🚀 ~ CheckInService ~ updateCheckIn ~ error:", error);
            throw new Error('Failed to update check-in');
        }
    }

     async deleteCheckIn(checkInId: any) {
        try {
            const checkIn = await CheckIn.findByPk(checkInId);
            if (!checkIn) return null;
            await checkIn.destroy();
            return true;
        } catch (error) {
            console.log("🚀 ~ CheckInService ~ deleteCheckIn ~ error:", error);
            throw new Error('Failed to delete check-in');
        }
    }

     async createCheckOut(checkOutData: any) {
        try {
            const newCheckOut = await CheckOut.create(checkOutData);
            return newCheckOut;
        } catch (error) {
            console.log("🚀 ~ CheckOutService ~ createCheckOut ~ error:", error);
            throw new Error('Failed to create check-out');
        }
    }

     async updateCheckOut(checkOutId: any, checkOutData: any) {
        try {
            const checkOut = await CheckOut.findByPk(checkOutId);
            if (!checkOut) return null;
            return await checkOut.update(checkOutData);
        } catch (error) {
            console.log("🚀 ~ CheckOutService ~ updateCheckOut ~ error:", error);
            throw new Error('Failed to update check-out');
        }
    }

     async deleteCheckOut(checkOutId: any) {
        try {
            const checkOut = await CheckOut.findByPk(checkOutId);
            if (!checkOut) return null;
            await checkOut.destroy();
            return true;
        } catch (error) {
            console.log("🚀 ~ CheckOutService ~ deleteCheckOut ~ error:", error);
            throw new Error('Failed to delete check-out');
        }
    }

     async createBill(billData: any) {
        try {
            const newBill = await Bill.create(billData);
            return newBill;
        } catch (error) {
            console.log("🚀 ~ BillService ~ createBill ~ error:", error);
            throw new Error('Failed to create bill');
        }
    }

     async updateBill(billId: any, billData: any) {
        try {
            const bill = await Bill.findByPk(billId);
            if (!bill) return null;
            return await bill.update(billData);
        } catch (error) {
            console.log("🚀 ~ BillService ~ updateBill ~ error:", error);
            throw new Error('Failed to update bill');
        }
    }

     async deleteBill(billId: any) {
        try {
            const bill = await Bill.findByPk(billId);
            if (!bill) return null;
            await bill.destroy();
            return true;
        } catch (error) {
            console.log("🚀 ~ BillService ~ deleteBill ~ error:", error);
            throw new Error('Failed to delete bill');
        }
    }

     async getAllBillDetails() {
        return BillDetail.findAll(); 
    }

     async getAllCheckIns() {
        return CheckIn.findAll(); 
    }

     async getAllCheckOuts() {
        return CheckOut.findAll(); 
    }

     async getAllBills() {
        return Bill.findAll(); 
    }
}

export default new BillDetailService()
