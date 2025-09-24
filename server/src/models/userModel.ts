import { Table, Column, Model, DataType } from "sequelize-typescript";
import { user } from "../types/userTypes";

@Table({
  tableName: "user",
  timestamps: true,
})
export default class User extends Model<user> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  lastLogin!: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isVerified!: boolean;

  @Column(DataType.STRING)
  resetPasswordToken?: string;

  @Column(DataType.DATE)
  resetPasswordExpiresAt?: Date;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  verificationToken?: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  verificationTokenExpiresAt?: Date | null;
}
