import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Outlet } from './outlet.model';

@Table({
  tableName: 'Menu',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Menu extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  menu_item_id!: number;

  @ForeignKey(() => Outlet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  outletid!: number;

  @BelongsTo(() => Outlet)
  outlet!: Outlet;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  item_name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  price!: number;

  @Column({
    type: DataType.ENUM('Appetizer', 'Main Course', 'Dessert'),
    allowNull: false
  })
  category!: 'Appetizer' | 'Main Course' | 'Dessert';
}
