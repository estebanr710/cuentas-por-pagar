/**
* @implements {object} Table
* @implements {object} Column
* @implements {object} Model
* @implements {object} DataType
*/
import { Table, Column, Model, DataType, IsUUID, ForeignKey, BelongsTo, HasOne, HasMany } from "sequelize-typescript";

import User from "./local.users.schema";
import Attachment from "./local.attachments.schema";
import State from "./local.states.schema";
import Provider from "./local.providers.schema";
import Note from "./local.notes.schema";
import Approver from "./local.approvers.schema";
import IxCC from "./local.ixcc.schema";

/**
* Declare Tablename invoices
* @default
*/
@Table({
   timestamps: false,
   tableName: "invoices"
})

/**
* Declare invoice model
* @default
*/
export default class Invoice extends Model {

    // ID <uuid> field
    @IsUUID(4)
    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    id!: string;

    // Invoice reference field
    @Column({
        type: DataType.NUMBER,
        unique: true
    })
    inv_reference!: number;

    // Invoice title field
    @Column({
        type: DataType.STRING
    })
    inv_title!: string;

    // Povider ID <Reference> field
    @IsUUID(4)
    @ForeignKey(() => Provider)
    @Column({
        type: DataType.STRING
    })
    provider_id!: string;

    // "One to one" relationship to "Providers" table
    @BelongsTo(() => Provider)
    provider!: Provider;
    
    // State ID <Reference> field
    @IsUUID(4)
    @ForeignKey(() => State)
    @Column({
        type: DataType.STRING
    })
    state_id!: string;

    // "One to one" relationship to "States" table
    @BelongsTo(() => State)
    state!: State;

    // Invoice CP SIMI field
    @Column({
        type: DataType.STRING
    })
    inv_cp_simi!: string;

    // Invoice SIMI state field
    @Column({
        type: DataType.BOOLEAN
    })
    inv_simi_state!: boolean;
    
    // Invoice email body field
    @Column({
        type: DataType.TEXT,
        get() {
            return this.getDataValue('inv_email_body').toString('utf8')
        }
    })
    inv_email_body!: string;
    
    // Invoice senders email field
    @Column({
        type: DataType.STRING
    })
    inv_senders_email!: string;
    
    // Invoice amount field
    @Column({
        type: DataType.NUMBER
    })
    inv_amount!: number;
    
    // Invoice createdAt <Timestamps> field
    @Column({
        type: DataType.DATE
    })
    inv_created_at!: Date;
    
    // Invoice modifiedAt <Timestamps> field
    @Column({
        type: DataType.DATE
    })
    inv_modified_at!: Date;
    
    // Invoice modifiedBy <Reference> field
    @IsUUID(4)
    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING
    })
    inv_modified_by!: string;

    // "One to one" relationship to "Users" table
    @BelongsTo(() => User)
    modifier!: User;
    
    // Invoice managedAt <Timestamps> field
    @Column({
        type: DataType.DATE
    })
    inv_managed_at!: Date;
    
    // Invoice managedBy <Reference> field
    @IsUUID(4)
    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING
    })
    inv_managed_by!: string;

    // "One to one" relationship to "Users" table
    @BelongsTo(() => User)
    manager!: User;

    // "One to many" relationship to "Attachments" table
    @HasMany(() => Attachment, {
        foreignKey: "invoice_id"
    })
    attachments!: Attachment[];

    // "One to many" relationship to "Notes" table
    @HasMany(() => Note, {
        foreignKey: "invoice_id"
    })
    notes!: Note[];

    // "One to many" relationship to "Approvers" table
    @HasMany(() => Approver, {
        foreignKey: "invoice_id"
    })
    approvers!: Approver[];

    // "One to many" relationship to "Approvers" table
    @HasMany(() => IxCC, {
        foreignKey: "invoice_id"
    })
    ixcc!: IxCC[];
}