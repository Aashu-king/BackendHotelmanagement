import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import RolePermission from './role-permission.model';
import User from './user.model';

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

  @HasMany(() => RolePermission)
  rolePermissions!: RolePermission[];

  @HasMany(() => User)
  user!: User[];
}

export default Role;
