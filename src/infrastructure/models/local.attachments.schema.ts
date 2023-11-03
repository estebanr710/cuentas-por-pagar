/**
* @implements {object} Table
* @implements {object} Column
* @implements {object} Model
* @implements {object} DataType
*/
import { Table, Column, Model, DataType, IsUUID, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import Invoice from "./local.invoices.schema";

/**
* Declare Tablename attachments
* @default
*/
@Table({
   timestamps: false,
   tableName: "attachments"
})

/**
* Declare attachment model
* @default
*/
export default class Attachment extends Model {

    // ID <uuid> field
    @IsUUID(4)
    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    id!: string;

    // Invoice ID <Reference> field
    @IsUUID(4)
    @ForeignKey(() => Invoice)
    @Column({
        type: DataType.STRING
    })
    invoice_id!: string;

    // "Many to one" relationship to "Invoices" table
    @BelongsTo(() => Invoice)
    invoice!: Invoice;

    // Attachment name field
    @Column({
        type: DataType.STRING
    })
    att_name!: string;

    // Attachment extension field
    @Column({
        type: DataType.STRING
    })
    att_extension!: string;

    // Attachment relative path field
    @Column({
        type: DataType.STRING
    })
    att_relative_path!: string;
}