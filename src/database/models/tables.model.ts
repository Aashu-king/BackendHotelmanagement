import { Table, Column, Model, ForeignKey, DataType, CreatedAt, UpdatedAt, BelongsTo } from 'sequelize-typescript';
import { Outlet } from './outlet.model';

@Table({
  tableName: 'Tables',
  timestamps: true,
})
export class Tables extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  table_id: number;

  @ForeignKey(() => Outlet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  outletid!: number;

  @BelongsTo(() => Outlet)
  outlet!: Outlet;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  table_number: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  max_capacity: number;

  @Column({
    type: DataType.ENUM('Available', 'Reserved'),
    allowNull: false,
    defaultValue: 'Available',
  })
  status: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  reservation_start: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  reservation_end: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
