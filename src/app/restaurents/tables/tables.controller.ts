import { Request, Response } from "express";
import TablesService from './tables.service';
import TableReservationsService from './tableResrvation.service';

class tablesController {
  // Get all tables
  async getAllTables(req: Request, res: Response) {
    try {
      const tables = await TablesService.getAllTables();
      res.status(200).json(tables);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving tables', error });
    }
  }

  // Get a table by ID
  async getTableById(req: Request, res: Response) {
    try {
      const table = await TablesService.getTableById(parseInt(req.params.id));
      if (!table) {
        return res.status(404).json({ message: 'Table not found' });
      }
      res.status(200).json(table);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving table', error });
    }
  }

  // Create a new table
  async createTable(req: Request, res: Response) {
    try {
      const newTable = await TablesService.createTable(req.body);
      res.status(201).json(newTable);
    } catch (error) {
      res.status(500).json({ message: 'Error creating table', error });
    }
  }

  // Update a table
  async updateTable(req: Request, res: Response) {
    try {
      const updatedTable = await TablesService.updateTable(parseInt(req.params.id), req.body);
      if (!updatedTable) {
        return res.status(404).json({ message: 'Table not found' });
      }
      res.status(200).json(updatedTable);
    } catch (error) {
      res.status(500).json({ message: 'Error updating table', error });
    }
  }

  // Delete a table
  async deleteTable(req: Request, res: Response) {
    try {
      const deletedTable = await TablesService.deleteTable(parseInt(req.params.id));
      if (!deletedTable) {
        return res.status(404).json({ message: 'Table not found' });
      }
      res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting table', error });
    }
  }

  // Get all reservations
  async getAllReservations(req: Request, res: Response) {
    try {
      const reservations = await TableReservationsService.getAllReservations();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving reservations', error });
    }
  }

  // Get reservation by ID
  async getReservationById(req: Request, res: Response) {
    try {
      const reservation = await TableReservationsService.getReservationById(parseInt(req.params.id));
      if (!reservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      res.status(200).json(reservation);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving reservation', error });
    }
  }

  // Create a new reservation
  async createReservation(req: Request, res: Response) {
    try {
        console.log("🚀 ~ tablesController ~ createReservation ~ req.body:", req.body)
      const newReservation = await TableReservationsService.createReservation(req.body);
      res.status(201).json(newReservation);
    } catch (error) {
      res.status(500).json({ message: 'Error creating reservation', error });
    }
  }

  // Update reservation
  async updateReservation(req: Request, res: Response) {
    try {
      const updatedReservation = await TableReservationsService.updateReservation(parseInt(req.params.id), req.body);
      if (!updatedReservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      res.status(200).json(updatedReservation);
    } catch (error) {
      res.status(500).json({ message: 'Error updating reservation', error });
    }
  }

  // Delete reservation
  async deleteReservation(req: Request, res: Response) {
    try {
      const deletedReservation = await TableReservationsService.deleteReservation(parseInt(req.params.id));
      if (!deletedReservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting reservation', error });
    }
  }
}

export default new tablesController();
