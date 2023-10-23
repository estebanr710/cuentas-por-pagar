/**
* @implements {object} Table
* @implements {object} Column
* @implements {object} Model
* @implements {object} DataType
*/
import { Table, Column, Model, DataType, IsUUID, HasOne } from "sequelize-typescript";
import User from "./local.users.schema";

/**
* Declare Tablename user
* @default
*/
@Table({
   timestamps: false,
   tableName: "roles"
})

/**
* Declare role model
* @default
*/
export default class Role extends Model {

    // ID <uuid> field
    @IsUUID(4)
    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    id!: string;

    // Role description field
    @Column({
        type: DataType.STRING
    })
    rol_description!: string;

    // "One to one" relationship to "Users" table
    @HasOne(() => User, {
        foreignKey: "role_id"
    })
    user!: User;
}