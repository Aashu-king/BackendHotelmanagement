import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Outlet } from './outlet.model';
import { Room } from './room.model';

@Table({
  tableName: 'RoomTypes',
  timestamps: true,
})
export class RoomType extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  roomTypeId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  typeName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  baseRate!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  maxOccupancy!: number;

  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  amenities?: string[];

  @ForeignKey(() => Outlet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  outletid!: number;

  @BelongsTo(() => Outlet)
  outlet!: Outlet;

  @HasMany(() => Room)
  room !: Room
}
