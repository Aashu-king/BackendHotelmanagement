import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Guest } from './guest.model';
import { Outlet } from './outlet.model';
import { OrderItems } from './orderItems.model';
import { Payments } from './payment.model';

@Table({
  tableName: 'Orders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Orders extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  order_id!: number;

 
  @ForeignKey(() => Guest)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  guestId!: number;

  @BelongsTo(() => Guest)
  guest!: Guest;

  @ForeignKey(() => Outlet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  outletid!: number;

  @BelongsTo(() => Outlet)
  outlet!: Outlet;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  order_date!: Date;

  @Column({
    type: DataType.ENUM('Pending', 'In Progress', 'Delivered', 'Completed'),
    allowNull: false
  })
  order_status!: 'Pending' | 'In Progress' | 'Delivered' | 'Completed';

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  total_amount!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  is_room_service!: boolean;

  @HasMany(() => OrderItems)
  orderItems !: OrderItems[]
  @HasMany(() => Payments)
  payment !: Payments[]
}
