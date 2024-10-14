import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Guest } from './guest.model';
import { Orders } from './orders.models';

@Table({
  tableName: 'Payments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Payments extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  payment_id!: number;

  @ForeignKey(() => Guest)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  guestId!: number;

  @BelongsTo(() => Guest)
  guest!: Guest;

  @ForeignKey(() => Orders)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  order_id!: number;

  @BelongsTo(() => Orders)
  order!: Orders;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  payment_date!: Date;

  @Column({
    type: DataType.ENUM('Cash', 'Card', 'Room Bill'),
    allowNull: false
  })
  payment_method!: 'Cash' | 'Card' | 'Room Bill';

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  amount!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  is_settled!: boolean;
}
