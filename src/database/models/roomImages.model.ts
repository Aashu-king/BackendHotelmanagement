

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
  import { Room } from './room.model'; 
  
  @Table({
    tableName: 'rooms_image',
    timestamps: true,
  })
   class RoomImage extends Model{
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    })
    id!: number;
  
    @ForeignKey(() => Room)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    roomId!: number;
  
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
  
    @BelongsTo(() => Room)
    room!: Room;
  }
  
  export default RoomImage