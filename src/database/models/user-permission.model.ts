import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Role from './role.model';
import Page from './page.model'; 
import User from './user.model';

@Table({
  tableName: 'user_permissions',
  timestamps: true,
})
class UserPermission extends Model {
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number;

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

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Page)
  page!: Page;
}

export default UserPermission;
