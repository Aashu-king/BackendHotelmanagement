import { Table, Column, Model, DataType, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, HasMany } from 'sequelize-typescript';
import  Hotel  from './hotel.model';
import { RoomType } from './roomType.model';
import { Room } from './room.model';

@Table({
  tableName: 'outlets',
  timestamps: true,
  paranoid: true, // For soft deletes
})
export class Outlet extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
      outletid !: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  city!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  state!: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  zipCode!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  phoneNumber?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  email?: string;

  @ForeignKey(() => Hotel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  hotelId!: number; // Foreign key to Hotel model

  @BelongsTo(() => Hotel)
  hotel!: Hotel;

  @HasMany(() => RoomType)
  roomType!: RoomType[]; 

  @HasMany(() => Room)
  room!: Room[];
}
