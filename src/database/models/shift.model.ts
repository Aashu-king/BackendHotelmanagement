import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Staff } from './staff.model';
import User from './user.model';

@Table({
  tableName: 'Shift',
  timestamps: true
})
export class Shift extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  shiftId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Column({
    type: DataType.TIME,
    allowNull: false,
    defaultValue: '08:00:00'  
  })
  startTime!: string;
  
  @Column({
    type: DataType.TIME,
    allowNull: false,
    defaultValue: '10:00:00'  
  })
  endTime!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  shiftDate!: Date;
}
