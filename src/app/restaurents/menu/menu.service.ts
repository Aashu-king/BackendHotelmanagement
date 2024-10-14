import { Menu } from "../../../database/models/menu.model";

class MenuService {
  // Get all menu items
  async getAllMenuItems() {
    return await Menu.findAll();
  }

  // Get menu item by ID
  async getMenuItemById(menuItemId: number) {
    return await Menu.findByPk(menuItemId);
  }

  // Create a new menu item
  async createMenuItem(menuData: any) {
    return await Menu.create(menuData);
  }

  // Update menu item by ID
  async updateMenuItem(menuItemId: number, updateData: any) {
    const menuItem = await Menu.findByPk(menuItemId);
    if (menuItem) {
      return await menuItem.update(updateData);
    }
    return null;
  }

  // Delete a menu item by ID
  async deleteMenuItem(menuItemId: number) {
    const menuItem = await Menu.findByPk(menuItemId);
    if (menuItem) {
      await menuItem.destroy();
      return true;
    }
    return false;
  }
}

export default new MenuService();
