import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
  import { Outlet } from './outlet.model'; 
  
  @Table({
    tableName: 'outlets_image',
    timestamps: true, 
  })
   class OutletImage extends Model {
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    })
    id!: number;
  
    @ForeignKey(() => Outlet)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    outletId!: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    imageUrl!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    imageName!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    fileType!: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: true,
    })
    description!: string;
  
    @CreatedAt
    @Column({
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.NOW,
    })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({
      type: DataType.DATE,
      allowNull: false,
      defaultValue: DataType.NOW,
    })
    updatedAt!: Date;
  
    @BelongsTo(() => Outlet)
    outlet!: Outlet;
  }

  export default OutletImage