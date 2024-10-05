import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import CheckIn from './checkin.model';
import { Outlet } from './outlet.model';

@Table({
  tableName: 'CheckOut',
  timestamps: true
})
export default class CheckOut extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  checkOutId!: number;

  @ForeignKey(() => CheckIn)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  checkInId!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  checkOutTime!: Date;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  finalBillAmount!: number;

  @Column({
    type: DataType.ENUM('paid', 'unpaid'),
    allowNull: false
  })
  paymentStatus!: string;

  @ForeignKey(() => Outlet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  outletid!: number;
}
