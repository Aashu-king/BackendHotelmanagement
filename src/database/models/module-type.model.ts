import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'module_types',
  timestamps: true,
})
class ModuleType extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  moduleTypeId!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  moduleTypeName!: string;
}

export default ModuleType;
