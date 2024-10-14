import { Request, Response } from 'express';
import OrderItemsService from './orderItems.service';

class OrderItemsController {
  // Get all order items
  async getAllOrderItems(req: Request, res: Response) {
    try {
      const orderItems = await OrderItemsService.getAllOrderItems();
      res.status(200).json(orderItems);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving order items', error });
    }
  }

  // Get order item by ID
  async getOrderItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const orderItem = await OrderItemsService.getOrderItemById(Number(id));
      if (!orderItem) {
        return res.status(404).json({ message: 'Order item not found' });
      }
      res.status(200).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving order item', error });
    }
  }

  // Create a new order item
  async createOrderItem(req: Request, res: Response) {
    try {
      const { order_id, menu_item_id, quantity, price } = req.body;
      const newOrderItem = await OrderItemsService.createOrderItem({ order_id, menu_item_id, quantity, price });
      res.status(201).json(newOrderItem);
    } catch (error) {
      res.status(500).json({ message: 'Error creating order item', error });
    }
  }

  // Update an order item
  async updateOrderItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { order_id, menu_item_id, quantity, price } = req.body;
      const orderItem = await OrderItemsService.updateOrderItem(Number(id), { order_id, menu_item_id, quantity, price });
      if (!orderItem) {
        return res.status(404).json({ message: 'Order item not found' });
      }
      res.status(200).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: 'Error updating order item', error });
    }
  }

  // Delete an order item
  async deleteOrderItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await OrderItemsService.deleteOrderItem(Number(id));
      if (!deleted) {
        return res.status(404).json({ message: 'Order item not found' });
      }
      res.status(204).json({ message: 'Order item deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting order item', error });
    }
  }
}

export default new OrderItemsController();
