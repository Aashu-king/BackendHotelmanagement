import { Table, Column, Model, DataType, ForeignKey, CreatedAt, UpdatedAt, BelongsTo } from 'sequelize-typescript';
import { Reservation } from './reservation.model';

@Table({
  tableName: 'ReservationTimes',
  timestamps: true,
})
export class ReservationTime extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  reservationTimeId!: number;

  @ForeignKey(() => Reservation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reservationId!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  fromDate!: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
    defaultValue: '10:00:00',
  })
  fromTime!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  toDate!: string;

  @Column({
    type: DataType.TIME,
    allowNull: false,
    defaultValue: '09:00:00',
  })
  toTime!: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt!: Date;

  @BelongsTo(() => Reservation)
  reservations !: Reservation
}
