import { Menu } from "../../../database/models/menu.model";
import { OrderItems } from "../../../database/models/orderItems.model";
import { Orders } from "../../../database/models/orders.models";

class OrderItemsService {
  // Get all order items
  async getAllOrderItems() {
    return await OrderItems.findAll({include : [{model : Menu},{model : Orders}]});
  }

  // Get order item by ID
  async getOrderItemById(orderItemId: number) {
    return await OrderItems.findByPk(orderItemId);
  }

  // Create a new order item
  async createOrderItem(orderItemData: any) {
    return await OrderItems.create(orderItemData);
  }

  // Update order item by ID
  async updateOrderItem(orderItemId: number, updateData: any) {
    const orderItem = await OrderItems.findByPk(orderItemId);
    if (orderItem) {
      return await orderItem.update(updateData);
    }
    return null;
  }

  // Delete an order item by ID
  async deleteOrderItem(orderItemId: number) {
    const orderItem = await OrderItems.findByPk(orderItemId);
    if (orderItem) {
      await orderItem.destroy();
      return true;
    }
    return false;
  }
}

export default new OrderItemsService();
