import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Room } from './room.model';

@Table({
  tableName: 'Inventory',
  timestamps: true
})
export class Inventory extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  inventoryId!: number;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  roomId!: number;

  @BelongsTo(() => Room)
  room!: Room;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  itemName!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  quantity!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false
  })
  lastRestockedDate!: Date;
}
