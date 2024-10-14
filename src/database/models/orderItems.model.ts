import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Orders } from './orders.models';
import { Menu } from './menu.model';

@Table({
  tableName: 'Order_Items',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class OrderItems extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  order_item_id!: number;

  @ForeignKey(() => Orders)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  order_id!: number;

  @BelongsTo(() => Orders)
  order!: Orders;

  @ForeignKey(() => Menu)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  menu_item_id!: number;

  @BelongsTo(() => Menu)
  menu!: Menu;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  quantity!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  price!: number;
}
