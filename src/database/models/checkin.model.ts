import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import {Reservation} from './reservation.model';
import {Room} from './room.model';
import { Outlet } from './outlet.model';

@Table({
  tableName: 'CheckIn',
  timestamps: true
})
export default class CheckIn extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  checkInId!: number;

  @ForeignKey(() => Reservation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  reservationId!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  checkInTime!: Date;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  assignedRoomId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  additionalRequests!: string;

  @ForeignKey(() => Outlet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  outletid!: number;
}
