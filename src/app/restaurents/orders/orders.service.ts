import { Guest } from "../../../database/models/guest.model";
import { OrderItems } from "../../../database/models/orderItems.model";
import { Orders } from "../../../database/models/orders.models";
import { Outlet } from "../../../database/models/outlet.model";
import { Payments } from "../../../database/models/payment.model";

class OrdersService {
  // Get all orders
  async getAllOrders() {
    return await Orders.findAll({include : [{model : Guest},{model : Outlet},{model : Payments}]});
  }

  // Get order by ID
  async getOrderById(orderId: number) {
    console.log("🚀 ~ OrdersService ~ getOrderById ~ orderId:", orderId)
    return await Orders.findOne({where : {order_id : orderId},include : [{model : OrderItems}]});
  }

  // Create a new order
  async createOrder(orderData: any) {
    console.log("🚀 ~ OrdersService ~ createOrder ~ orderData:", orderData)
    return await Orders.create(orderData);
  }

  async createOrderItems(orderData: any) {
    console.log("🚀 ~ OrdersService ~ createOrder ~ orderData:", orderData)
    return await OrderItems.bulkCreate(orderData);
  }

  // Update order by ID
  async updateOrder(orderId: number, updateData: any) {
    const order = await Orders.findByPk(orderId);
    if (order) {
      return await order.update(updateData);
    }
    return null;
  }

  // Delete an order by ID
  async deleteOrder(orderId: number) {
    const order = await Orders.findByPk(orderId);
    if (order) {
      await order.destroy();
      return true;
    }
    return false;
  }
}

export default new OrdersService();
