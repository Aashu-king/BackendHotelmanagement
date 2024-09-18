import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'roles',
  timestamps: true,
})
class Role extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  roleName!: string;
}

export default Role;
