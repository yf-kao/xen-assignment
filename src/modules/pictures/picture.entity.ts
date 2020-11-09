import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript';

@Table
export class Picture extends Model<Picture> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  filename: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;
}