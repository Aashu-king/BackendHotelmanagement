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
  import Hotel  from './hotel.model'; 
  
  @Table({
    tableName: 'hotel_images',
    timestamps: true, 
  })
   class HotelImage extends Model {
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    })
    id!: number;
  
    @ForeignKey(() => Hotel)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    hotelId!: number;
  
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
  
    // Define the relationship with the Hotel model
    @BelongsTo(() => Hotel)
    hotel!: Hotel;
  }

  export default HotelImage
  