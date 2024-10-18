import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { RoomType } from './roomType.model';
import { Outlet } from './outlet.model';
import { Reservation } from './reservation.model';
import RoomImage from './roomImages.model';

@Table({
  tableName: 'Rooms',
  timestamps: true,
})
export class Room extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  roomId!: number;

  @ForeignKey(() => RoomType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roomTypeId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  roomNumber!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  floor!: number;

  @Column({
    type: DataType.ENUM('available', 'occupied', 'maintenance'),
    allowNull: false,
  })
  status!: string;

  @ForeignKey(() => Outlet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  outletid!: number;

  @HasMany(() => Reservation)
  reservation !: Reservation[];

  @HasMany(() => RoomImage)
  roomImage !: RoomImage[];

  @BelongsTo(() => Outlet)
  outlet!: Outlet;
  
  @BelongsTo(() => RoomType)
  roomType!: RoomType;
}
