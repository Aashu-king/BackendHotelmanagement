import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Suppliers',
  timestamps: true
})
export class Suppliers extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  })
  supplierId!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  supplierName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  contactNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  address!: string;
}
