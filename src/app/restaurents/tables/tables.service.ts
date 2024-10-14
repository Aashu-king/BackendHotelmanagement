import { Tables } from "./../../../database/models/tables.model";

class TablesService {
  async getAllTables() {
    return await Tables.findAll();
  }

  async getTableById(tableId: number) {
    return await Tables.findByPk(tableId);
  }

  async createTable(tableData: any) {
    return await Tables.create(tableData);
  }

  async updateTable(tableId: number, updateData: any) {
    const table = await Tables.findByPk(tableId);
    if (table) {
      return await table.update(updateData);
    }
    return null;
  }

  async deleteTable(tableId: number) {
    const table = await Tables.findByPk(tableId);
    if (table) {
      await table.destroy();
      return true;
    }
    return false;
  }
  
}

export default new TablesService();
