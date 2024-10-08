import { Table, Column, Model, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { Outlet } from './outlet.model';
import Bill from './bills.model';

@Table({
  tableName: 'Guests',
  timestamps: true,
})
export class Guest extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  guestId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  identificationType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  identificationNumber!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dateOfBirth!: Date;

  @ForeignKey(() => Outlet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  outletid!: number;

  @HasMany(() => Bill)
  bill!: Bill[];
}
