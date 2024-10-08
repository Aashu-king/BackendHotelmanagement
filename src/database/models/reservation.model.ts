import { Table, Column, Model, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Guest } from './guest.model';
import { Room } from './room.model'
import { Outlet } from './outlet.model';
import User from './user.model';
import { ReservationTime } from './reservationTime.model';
@Table({
  tableName: 'Reservations',
  timestamps: true,
})
export class Reservation extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  reservationId!: number;

  @ForeignKey(() => Guest)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  guestId!: number;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roomId!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  reservationDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  checkInDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  checkOutDate!: Date;

  @Column({
    type: DataType.ENUM('pending', 'confirmed', 'canceled'),
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.ENUM('paid', 'pending', 'partially paid'),
    allowNull: false,
  })
  paymentStatus!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  totalAmount!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  specialRequests?: string;

  @ForeignKey(() => Outlet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  outletid!: number;

  @BelongsTo(() => Room)
  room!: Room;

  @BelongsTo(() => Guest)
  guest!: Guest;

  @BelongsTo(() => Outlet)
  outlet !: Outlet
}
