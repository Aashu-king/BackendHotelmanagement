import { Table, Column, Model, DataType, PrimaryKey, ForeignKey } from 'sequelize-typescript';
import Role from './role.model';
import Page from './page.model'; 

@Table({
  tableName: 'role_permissions',
  timestamps: true,
})
class RolePermission extends Model {
  @PrimaryKey
  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId!: number;

  @PrimaryKey
  @ForeignKey(() => Page)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pageId!: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  canView!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  canEdit!: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  canDelete!: boolean;
}

export default RolePermission;
