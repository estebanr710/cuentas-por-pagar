/**
* @implements {object} Table
* @implements {object} Column
* @implements {object} Model
* @implements {object} DataType
*/
import { Table, Column, Model, DataType, IsUUID, HasOne } from "sequelize-typescript";
import Invoice from "./local.invoices.schema";

/**
* Declare Tablename user
* @default
*/
@Table({
   timestamps: false,
   tableName: "providers"
})

/**
* Declare provider model
* @default
*/
export default class Provider extends Model {

    // ID <uuid> field
    @IsUUID(4)
    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    id!: string;

    // Provider NIT field
    @Column({
        type: DataType.STRING
    })
    pro_nit!: string;

    // Provider name field
    @Column({
        type: DataType.STRING
    })
    pro_name!: string;

    // Provider email field
    @Column({
        type: DataType.STRING
    })
    pro_email!: string;

    // Provider email field
    @Column({
        type: DataType.BOOLEAN
    })
    pro_state!: boolean;

    // "One to one" relationship to "Users" table
    @HasOne(() => Invoice, {
        foreignKey: "provider_id"
    })
    invoice!: Invoice;
}