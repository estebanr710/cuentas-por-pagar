/**
* @implements {object} Table
* @implements {object} Column
* @implements {object} Model
* @implements {object} DataType
*/
import { Table, Column, Model, DataType, IsUUID, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./local.users.schema";
import Invoice from "./local.invoices.schema";

/**
* Declare Tablename user
* @default
*/
@Table({
   timestamps: false,
   tableName: "notes"
})

/**
* Declare role model
* @default
*/
export default class Note extends Model {

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

    // User ID <Reference> field
    @IsUUID(4)
    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING
    })
    user_id!: string;

    // "One to one" relationship to "Users" table
    @BelongsTo(() => User)
    user!: User;

    // Note description field
    @Column({
        type: DataType.STRING
    })
    not_description!: string;

    // Note type field
    @Column({
        type: DataType.ENUM('OBSERVATION', 'EDITION', 'MANAGMENT')
    })
    not_type!: string;

    // Note type field
    @Column({
        type: DataType.DATE
    })
    not_datetime!: Date;
}