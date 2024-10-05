import { Request, Response } from 'express';
import  BillDetailService  from './booking.serbice';

 class BillDetailController {
    async createBillDetail(req: Request, res: Response) {
        try {
            const billDetailData = req.body;
            const newBillDetail = await BillDetailService.createBillDetail(billDetailData);
            return res.status(201).json({ success: true, data: newBillDetail });
        } catch (error) {
            console.log("🚀 ~ BillDetailController ~ createBillDetail ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to create bill detail', error: error.message });
        }
    }

    async updateBillDetail(req: Request, res: Response) {
        try {
            const billDetailId = req.params.billDetailId;
            const billDetailData = req.body;
            const updatedBillDetail = await BillDetailService.updateBillDetail(billDetailId, billDetailData);
            if (!updatedBillDetail) {
                return res.status(404).json({ success: false, message: 'Bill detail not found' });
            }
            return res.status(200).json({ success: true, data: updatedBillDetail });
        } catch (error) {
            console.log("🚀 ~ BillDetailController ~ updateBillDetail ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to update bill detail', error: error.message });
        }
    }

    async deleteBillDetail(req: Request, res: Response) {
        try {
            const billDetailId = req.params.billDetailId;
            const deleted = await BillDetailService.deleteBillDetail(billDetailId);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Bill detail not found' });
            }
            return res.status(200).json({ success: true, message: 'Bill detail deleted successfully' });
        } catch (error) {
            console.log("🚀 ~ BillDetailController ~ deleteBillDetail ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to delete bill detail', error: error.message });
        }
    }

    async getBillDetailById(req: Request, res: Response) {
        try {
            const billDetailId = req.params.billDetailId;
            const billDetail = await BillDetailService.getBillDetailById(billDetailId);
            if (!billDetail) {
                return res.status(404).json({ success: false, message: 'Bill detail not found' });
            }
            return res.status(200).json({ success: true, data: billDetail });
        } catch (error) {
            console.log("🚀 ~ BillDetailController ~ getBillDetailById ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to fetch bill detail', error: error.message });
        }
    }

    async createCheckIn(req: Request, res: Response) {
        try {
            const checkInData = req.body;
            const newCheckIn = await BillDetailService.createCheckIn(checkInData);
            return res.status(201).json({ success: true, data: newCheckIn });
        } catch (error) {
            console.log("🚀 ~ CheckInController ~ createCheckIn ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to create check-in', error: error.message });
        }
    }

    async updateCheckIn(req: Request, res: Response) {
        try {
            const checkInId = req.params.checkInId;
            const checkInData = req.body;
            const updatedCheckIn = await BillDetailService.updateCheckIn(checkInId, checkInData);
            if (!updatedCheckIn) {
                return res.status(404).json({ success: false, message: 'Check-in not found' });
            }
            return res.status(200).json({ success: true, data: updatedCheckIn });
        } catch (error) {
            console.log("🚀 ~ CheckInController ~ updateCheckIn ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to update check-in', error: error.message });
        }
    }

    async deleteCheckIn(req: Request, res: Response) {
        try {
            const checkInId = req.params.checkInId;
            const deleted = await BillDetailService.deleteCheckIn(checkInId);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Check-in not found' });
            }
            return res.status(200).json({ success: true, message: 'Check-in deleted successfully' });
        } catch (error) {
            console.log("🚀 ~ CheckInController ~ deleteCheckIn ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to delete check-in', error: error.message });
        }
    }

    async createCheckOut(req: Request, res: Response) {
        try {
            const checkOutData = req.body;
            const newCheckOut = await BillDetailService.createCheckOut(checkOutData);
            return res.status(201).json({ success: true, data: newCheckOut });
        } catch (error) {
            console.log("🚀 ~ CheckOutController ~ createCheckOut ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to create check-out', error: error.message });
        }
    }

    async updateCheckOut(req: Request, res: Response) {
        try {
            const checkOutId = req.params.checkOutId;
            const checkOutData = req.body;
            const updatedCheckOut = await BillDetailService.updateCheckOut(checkOutId, checkOutData);
            if (!updatedCheckOut) {
                return res.status(404).json({ success: false, message: 'Check-out not found' });
            }
            return res.status(200).json({ success: true, data: updatedCheckOut });
        } catch (error) {
            console.log("🚀 ~ CheckOutController ~ updateCheckOut ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to update check-out', error: error.message });
        }
    }

    async deleteCheckOut(req: Request, res: Response) {
        try {
            const checkOutId = req.params.checkOutId;
            const deleted = await BillDetailService.deleteCheckOut(checkOutId);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Check-out not found' });
            }
            return res.status(200).json({ success: true, message: 'Check-out deleted successfully' });
        } catch (error) {
            console.log("🚀 ~ CheckOutController ~ deleteCheckOut ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to delete check-out', error: error.message });
        }
    }

    async createBill(req: Request, res: Response) {
        try {
            const billData = req.body;
            const newBill = await BillDetailService.createBill(billData);
            return res.status(201).json({ success: true, data: newBill });
        } catch (error) {
            console.log("🚀 ~ BillController ~ createBill ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to create bill', error: error.message });
        }
    }

    async updateBill(req: Request, res: Response) {
        try {
            const billId = req.params.billId;
            const billData = req.body;
            const updatedBill = await BillDetailService.updateBill(billId, billData);
            if (!updatedBill) {
                return res.status(404).json({ success: false, message: 'Bill not found' });
            }
            return res.status(200).json({ success: true, data: updatedBill });
        } catch (error) {
            console.log("🚀 ~ BillController ~ updateBill ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to update bill', error: error.message });
        }
    }

    async deleteBill(req: Request, res: Response) {
        try {
            const billId = req.params.billId;
            const deleted = await BillDetailService.deleteBill(billId);
            if (!deleted) {
                return res.status(404).json({ success: false, message: 'Bill not found' });
            }
            return res.status(200).json({ success: true, message: 'Bill deleted successfully' });
        } catch (error) {
            console.log("🚀 ~ BillController ~ deleteBill ~ error:", error);
            return res.status(500).json({ success: false, message: 'Failed to delete bill', error: error.message });
        }
    }
}


export default new BillDetailController()
