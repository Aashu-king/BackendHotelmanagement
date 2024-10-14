import { Request, Response } from 'express';
import MenuService from './menu.service';

class MenuController {
  // Get all menu items
  async getAllMenuItems(req: Request, res: Response) {
    try {
      const menuItems = await MenuService.getAllMenuItems();
      res.status(200).json(menuItems);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving menu items', error });
    }
  }

  // Get menu item by ID
  async getMenuItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const menuItem = await MenuService.getMenuItemById(Number(id));
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving menu item', error });
    }
  }

  // Create a new menu item
  async createMenuItem(req: Request, res: Response) {
    try {
      const { outletid, item_name, description, price, category } = req.body;
      const newMenuItem = await MenuService.createMenuItem({ outletid, item_name, description, price, category });
      res.status(201).json(newMenuItem);
    } catch (error) {
      res.status(500).json({ message: 'Error creating menu item', error });
    }
  }

  // Update a menu item
  async updateMenuItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { item_name, description, price, category } = req.body;
      const menuItem = await MenuService.updateMenuItem(Number(id), { item_name, description, price, category });
      if (!menuItem) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.status(200).json(menuItem);
    } catch (error) {
      res.status(500).json({ message: 'Error updating menu item', error });
    }
  }

  // Delete a menu item
  async deleteMenuItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await MenuService.deleteMenuItem(Number(id));
      if (!deleted) {
        return res.status(404).json({ message: 'Menu item not found' });
      }
      res.status(204).json({ message: 'Menu item deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting menu item', error });
    }
  }
}

export default new MenuController();
