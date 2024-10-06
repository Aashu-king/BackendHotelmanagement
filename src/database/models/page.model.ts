import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, HasMany } from 'sequelize-typescript';
import Module from './module.model'; 
import RolePermission from './role-permission.model';

@Table({
  tableName: 'pages',
  timestamps: true,
})
class Page extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pageId!: number;

  @ForeignKey(() => Module)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  moduleId!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  pageName!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  pageUrl?: string;

  @HasMany(() => RolePermission)
  rolePermissions!: RolePermission[];
}

export default Page;
