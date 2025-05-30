import { Table, Column, Model, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import Role from './role.model';
import { Shift } from './shift.model';

@Table({
  tableName: 'Staff',
  timestamps: true
})
export class Staff extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  staffId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  lastName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  phone!: string;



  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  hireDate!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  salary!: number;

}
