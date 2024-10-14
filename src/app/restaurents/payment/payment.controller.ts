import { Request, Response } from 'express';
import PaymentsService from './payment.service';
import { Orders } from '../../../database/models/orders.models';

class PaymentsController {
  // Get all payments
  async getAllPayments(req: Request, res: Response) {
    try {
      const payments = await PaymentsService.getAllPayments();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving payments', error });
    }
  }

  // Get payment by ID
  async getPaymentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await PaymentsService.getPaymentById(Number(id));
      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.status(200).json(payment);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving payment', error });
    }
  }

  // Create a new payment
  async createPayment(req: Request, res: Response) {
    try {
      const newPayment = await PaymentsService.createPayment(req.body);
      if(newPayment){
        newPayment.order_id
        const updateTheStatusForBill = await Orders.update({order_status : 'In Progress'},{where : {order_id : newPayment.order_id}})
        console.log("🚀 ~ PaymentsController ~ createPayment ~ updateTheStatusForBill:", updateTheStatusForBill)
      }
      res.status(201).json(newPayment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating payment', error });
    }
  }

  // Update a payment
  async updatePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updatedPayment = await PaymentsService.updatePayment(Number(id), req.body);
      if (!updatedPayment) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.status(200).json(updatedPayment);
    } catch (error) {
      res.status(500).json({ message: 'Error updating payment', error });
    }
  }

  // Delete a payment
  async deletePayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await PaymentsService.deletePayment(Number(id));
      if (!success) {
        return res.status(404).json({ message: 'Payment not found' });
      }
      res.status(204).json({ message: 'Payment deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting payment', error });
    }
  }
}

export default new PaymentsController();
