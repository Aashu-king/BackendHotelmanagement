import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Suppliers } from './suppliers.model';

@Table({
  tableName: 'SuppliesOrders',
  timestamps: true
})
export class SuppliesOrders extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  orderId!: number;

  @ForeignKey(() => Suppliers)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  supplierId!: number;

  @BelongsTo(() => Suppliers)
  supplier!: Suppliers;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  orderDate!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  totalAmount!: number;

  @Column({
    type: DataType.ENUM('pending', 'delivered'),
    allowNull: false
  })
  status!: 'pending' | 'delivered';
}
