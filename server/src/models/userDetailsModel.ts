import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
} from "sequelize-typescript";
import { userDetails } from "../types/userDetailsTypes";
import User from "./userModel";

@Table({
  tableName: "userDetails",
  timestamps: true,
})
export default class UserDetails extends Model<userDetails> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullname!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column(DataType.STRING)
  phone?: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  dateofbirth!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  address?: string | null;

  //  relation with usermodel
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  id!: number;

  @BelongsTo(() => User)
  user!: User;
}
