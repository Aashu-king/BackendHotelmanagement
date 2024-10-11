import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    PrimaryKey,
    AutoIncrement,
    BelongsTo,
    CreatedAt,
    UpdatedAt
  } from 'sequelize-typescript';
  import User from './user.model'; 
  import {Room} from './room.model'; 
  
  @Table({
    tableName: 'Cleaning',
    timestamps: true 
  })
  export default class Cleaning extends Model{
    
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    shiftId!: number;
  
    @ForeignKey(() => User)
    @PrimaryKey
    @Column(DataType.INTEGER)
    userId!: number;
  
    @ForeignKey(() => Room)
    @PrimaryKey
    @Column(DataType.INTEGER)
    roomId!: number;
  
    @Column({
      type: DataType.TIME,
      defaultValue: '10:00:00' 
    })
    startTime!: string; // Stores time in HH:mm:ss format
  
    @Column({
      type: DataType.TIME,
      defaultValue: '10:00:00' 
    })
    endTime!: string; // Stores time in HH:mm:ss format
  
    @Column({
      type: DataType.DATEONLY,
      allowNull: false
    })
    shiftDate!: string; // Stores date in YYYY-MM-DD format
  
    @CreatedAt
    @Column({
      type: DataType.DATE,
      defaultValue: DataType.NOW,
      allowNull: false
    })
    createdAt!: Date;
  
    @UpdatedAt
    @Column({
      type: DataType.DATE,
      defaultValue: DataType.NOW,
      allowNull: false
    })
    updatedAt!: Date;
  
    @BelongsTo(() => User)
    user!: User;
  
    @BelongsTo(() => Room)
    room!: Room;
  }
  
  