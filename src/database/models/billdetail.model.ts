import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import Bill from './bills.model';
import { Outlet } from './outlet.model';

@Table({
  tableName: 'BillDetails',
  timestamps: true
})
export default class BillDetail extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  billDetailId!: number;

  @ForeignKey(() => Bill)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  billId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  amount!: number;

  @BelongsTo(() => Bill)
  bill !: Bill

}
