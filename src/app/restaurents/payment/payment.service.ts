import { Guest } from "../../../database/models/guest.model";
import { Menu } from "../../../database/models/menu.model";
import { Payments } from "../../../database/models/payment.model";

class PaymentsService {
  // Get all payments
  async getAllPayments() {
    return await Payments.findAll({include : [{model : Guest}]});
  }

  // Get payment by ID
  async getPaymentById(paymentId: number) {
    return await Payments.findByPk(paymentId);
  }

  // Create a new payment
  async createPayment(paymentData: any) {
    return await Payments.create(paymentData);
  }

  // Update payment by ID
  async updatePayment(paymentId: number, updateData: any) {
    const payment = await Payments.findByPk(paymentId);
    if (payment) {
      return await payment.update(updateData);
    }
    return null;
  }

  // Delete a payment by ID
  async deletePayment(paymentId: number) {
    const payment = await Payments.findByPk(paymentId);
    if (payment) {
      await payment.destroy();
      return true;
    }
    return false;
  }
}

export default new PaymentsService();
