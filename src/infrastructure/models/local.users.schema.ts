/**
* @implements {object} Table
* @implements {object} Column
* @implements {object} Model
* @implements {object} DataType
*/
import { Table, Column, Model, DataType, HasOne, BelongsTo, PrimaryKey, IsUUID, ForeignKey } from "sequelize-typescript";

import Role from "./local.roles.schema";
import Invoice from "./local.invoices.schema";

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
export default class User extends Model {

    // ID <uuid> field
    @IsUUID(4)
    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    id!: string;

    // User name field
    @Column({
        type: DataType.STRING
    })
    use_name!: string;

    // User email field
    @Column({
        type: DataType.STRING
    })
    use_email!: string;

    // User Microsoft ID field
    @Column({
        type: DataType.STRING
    })
    use_microsoft_id!: string;

    // Role ID <Reference> field
    @IsUUID(4)
    @ForeignKey(() => Role)
    @Column({
        type: DataType.STRING
    })
    role_id!: string;

    // "One to one" relationship to "Roles" table
    @BelongsTo(() => Role)
    role!: Role;

    // "One to one" relationship to "Invoices" table
    @HasOne(() => Invoice, {
        foreignKey: "inv_modified_by"
    })
    invoice_modifier!: Invoice;

    // "One to one" relationship to "Invoices" table
    @HasOne(() => Invoice, {
        foreignKey: "inv_managed_by"
    })
    invoice_manager!: Invoice;
}