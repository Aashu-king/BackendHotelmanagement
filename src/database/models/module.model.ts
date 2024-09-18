import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import ModuleType from './module-type.model'; 

@Table({
  tableName: 'modules',
  timestamps: true,
})
class Module extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  moduleId!: number;

  @ForeignKey(() => ModuleType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  moduleTypeId!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  moduleName!: string;
}

export default Module;
