import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { RoomType } from './roomType.model';
import { Outlet } from './outlet.model';

@Table({
  tableName: 'RoomRates',
  timestamps: true,
})
export class RoomRate extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  rateId!: number;

  @ForeignKey(() => RoomType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roomTypeId!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endDate!: Date;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  ratePerNight!: number;

  @ForeignKey(() => Outlet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  outletid!: number;
}
