import { Table, Column, Model, DataType, ForeignKey, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import Role from './role.model';
import {Outlet} from './outlet.model';

@Table({
  tableName: 'users',
  timestamps: true,
})
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  userName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  passwordHash!: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;

  @ForeignKey(() => Outlet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  outletId!: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: true,
  })
  phoneNumber?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  address?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  city?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  state?: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  zipCode?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  dateOfBirth?: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isAdmin!: boolean;

  @BelongsTo(() => Role)
  role!: Role;

  @BelongsTo(() => Outlet)
  outlet!: Outlet;
}

export default User;
