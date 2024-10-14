import { Request, Response } from 'express';
import OrdersService from './orders.service';

class OrdersController {
  // Get all orders
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await OrdersService.getAllOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving orders', error });
    }
  }

  // Get order by ID
  async getOrderById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      console.log("🚀 ~ OrdersController ~ getOrderById ~  req.params:",  req.params)
      const order = await OrdersService.getOrderById(Number(id));
      console.log("🚀 ~ OrdersController ~ getOrderById ~ order:", order)
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving order', error });
    }
  }

  // Create a new order
  async createOrder(req: Request, res: Response) {
    try {
      console.log("🚀 ~ OrdersController ~ createOrder ~ req.body:", req.body)
      const { orderData} = req.body;
      const newOrder = await OrdersService.createOrder(orderData);
      if(newOrder){
        const data = orderData.orderItems.map((item : any) => ({
          ...item,
          order_id : newOrder.order_id
        }))
        const dataForOrderItem = await OrdersService.createOrderItems(data)
        console.log("🚀 ~ OrdersController ~ createOrder ~ dataForOrderItem:", dataForOrderItem)
        if(dataForOrderItem){
          res.status(201).json("createdSucessfully");
        }else{
          res.status(500).json('something went wrong')
        }
      }
    } catch (error) {
      res.status(500).json({ message: 'Error creating order', error });
    }
  }

  // Update an order
  async updateOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { guestId, outletid, order_date, order_status, total_amount, is_room_service } = req.body;
      const order = await OrdersService.updateOrder(Number(id), { guestId, outletid, order_date, order_status, total_amount, is_room_service });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error updating order', error });
    }
  }

  // Delete an order
  async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await OrdersService.deleteOrder(Number(id));
      if (!deleted) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(204).json({ message: 'Order deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting order', error });
    }
  }
}

export default new OrdersController();
