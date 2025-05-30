import { Table, Column, Model, ForeignKey, DataType, HasMany, BelongsTo } from 'sequelize-typescript';
import {Guest} from './guest.model';
import BillDetail from './billdetail.model';
import { Outlet } from './outlet.model';
import { Reservation } from './reservation.model';

@Table({
  tableName: 'Bills',
  timestamps: true
})
export default class Bill extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  billId!: number;

  @ForeignKey(() => Guest)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  guestId!: number;

  @ForeignKey(() => Reservation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reservationId!: number;

  
  @BelongsTo(() => Reservation)
  reservation !: Reservation

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  totalAmount!: number;

  @Column({
    type: DataType.ENUM('credit card', 'cash', 'online'),
    allowNull: false
  })
  paymentMethod!: string;

  @Column({
    type: DataType.ENUM('paid', 'unpaid'),
    allowNull: false
  })
  status!: string;

  @ForeignKey(() => Outlet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  outletid!: number;

  @HasMany(() => BillDetail)
  billDetails!: BillDetail[];

  

  @BelongsTo(() => Guest)
  guest !: Guest

  @BelongsTo(() => Outlet)
  outlet !: Outlet
}
