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
   tableName: "states"
})

/**
* Declare role model
* @default
*/
export default class State extends Model {

    // ID <uuid> field
    @IsUUID(4)
    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    id!: string;

    // State description field
    @Column({
        type: DataType.STRING
    })
    sta_description!: string;

    // "One to one" relationship to "Invoices" table
    @HasOne(() => Invoice, {
        foreignKey: "state_id"
    })
    invoice!: Invoice;
}