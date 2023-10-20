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
   tableName: "roles"
})

/**
* Declare tenant-auth model
* @default
*/
export default class Role extends Model {

    // ID <uuid> field
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
}