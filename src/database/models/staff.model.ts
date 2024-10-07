import { Table, Column, Model, DataType } from 'sequelize-typescript';

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

  @Column({
    type: DataType.ENUM('Manager', 'Housekeeping', 'Front Desk'),
    allowNull: false
  })
  role!: 'Manager' | 'Housekeeping' | 'Front Desk';

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
