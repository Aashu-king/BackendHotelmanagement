import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Supplies',
  timestamps: true
})
export class Supplies extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  supplyId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  description?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  quantity!: number;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  unitCost!: number;
}
