import { Table, Column, Model, DataType, AutoIncrement, PrimaryKey, HasMany } from 'sequelize-typescript';
import HotelImage from './hotelImages.model';

@Table({
  tableName: 'hotels',
  timestamps: true,
  paranoid: true, // Enables soft deletion
})
class Hotel extends Model {
  
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  hotelid!: number; // The primary key with auto-increment

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

  @Column({
    type: DataType.DECIMAL(3, 2),
    allowNull: true,
  })
  rating?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  totalRooms?: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  website?: string;

  @HasMany(() => HotelImage)
  images!: HotelImage[];
}

export default Hotel;
