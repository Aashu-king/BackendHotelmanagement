import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Staff } from './staff.model';

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

  @ForeignKey(() => Staff)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  staffId!: number;

  @BelongsTo(() => Staff)
  staff!: Staff;

  @Column({
    type: DataType.TIME,
    allowNull: false
  })
  startTime!: string;

  @Column({
    type: DataType.TIME,
    allowNull: false
  })
  endTime!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  shiftDate!: Date;
}
