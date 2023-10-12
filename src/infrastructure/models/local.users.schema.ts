/**
* @implements {object} Table
* @implements {object} Column
* @implements {object} Model
* @implements {object} DataType
*/
import { Table, Column, Model, DataType } from "sequelize-typescript";

/**
* Declare Tablename user
* @default
*/
@Table({
   timestamps: false,
   tableName: "users"
})

/**
* Declare tenant-auth model
* @default
*/
export class User extends Model {

    // Name field
    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    id!: string;

    // Email field
    @Column({
        type: DataType.STRING
    })
    name!: string;

    // Email field
    @Column({
        type: DataType.STRING
    })
    email!: string;

    // Password field
    @Column({
        type: DataType.STRING
    })
    description!: string;
}