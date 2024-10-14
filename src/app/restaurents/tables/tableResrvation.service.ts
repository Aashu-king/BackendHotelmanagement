import { TableReservations } from "../../../database/models/tableReservation.model";

class TableReservationsService {
  async getAllReservations() {
    return await TableReservations.findAll();
  }

  async getReservationById(reservationId: number) {
    return await TableReservations.findByPk(reservationId);
  }

  async createReservation(reservationData: any) {
    return await TableReservations.create(reservationData);
  }

  async updateReservation(reservationId: number, updateData: any) {
    const reservation = await TableReservations.findByPk(reservationId);
    if (reservation) {
      return await reservation.update(updateData);
    }
    return null;
  }

  async deleteReservation(reservationId: number) {
    const reservation = await TableReservations.findByPk(reservationId);
    if (reservation) {
      await reservation.destroy();
      return true;
    }
    return false;
  }
}

export default new TableReservationsService();
