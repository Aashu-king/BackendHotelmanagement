import { Table, Column, Model, ForeignKey, DataType, CreatedAt, UpdatedAt, BelongsTo } from 'sequelize-typescript';
import { Guest } from './guest.model';
import { Tables } from './tables.model';

@Table({
  tableName: 'TableReservations',
  timestamps: true,
})
export class TableReservations extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  reservation_id: number;

  @ForeignKey(() => Guest)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  guestId!: number;

  @BelongsTo(() => Guest)
  guest!: Guest;

  @ForeignKey(() => Tables)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  table_id: number;

  @BelongsTo(() => Tables)
  tables!: Tables;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  reservation_start: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  reservation_end: Date;

  @Column({
    type: DataType.ENUM('Confirmed', 'Cancelled', 'Completed'),
    allowNull: false,
    defaultValue: 'Confirmed',
  })
  status: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;
}
