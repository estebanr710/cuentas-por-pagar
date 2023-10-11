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
   timestamps:false,
   tableName:"users"
})

/**
* Declare tenant-auth model
* @default
*/
export class UsersTA extends Model {

    // Name field
    @Column({
        type: DataType.STRING,
    })
    name!: string;

    // Email field
    @Column({
        type: DataType.STRING,
    
    })
    email!: string;

    // Password field
    @Column({
        type: DataType.STRING,
    })
    password!: string;

    // Last Logi field
    @Column({
        type: DataType.DATE,
    })
    lastLogin!: Date;

    // MicrosoftID field
    @Column({
        type: DataType.STRING,
    })
    microsoftid!: string;

    // Status field
    @Column({
        type: DataType.ENUM("active", "inactive")
    })
    status!: string;

    // Role field
    @Column({
        type: DataType.ENUM('user','admin',"superAdmin")
    })
    rol!: string
}