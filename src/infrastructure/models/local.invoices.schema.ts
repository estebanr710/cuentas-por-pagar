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
   tableName: "invoices"
})

/**
* Declare tenant-auth model
* @default
*/
export default class Invoice extends Model {

    // ID <uuid> field
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
    @Column({
        type: DataType.STRING
    })
    provider_id!: string;
    
    // State ID <Reference> field
    @Column({
        type: DataType.STRING
    })
    state_id!: string;

    // Invoice CP SIMI field
    @Column({
        type: DataType.STRING
    })
    inv_cp_simi!: string;

    // Invoice SIMI state field
    @Column({
        type: DataType.STRING
    })
    inv_simi_state!: string;
    
    // Invoice email body field
    @Column({
        type: DataType.TEXT
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
    @Column({
        type: DataType.STRING
    })
    inv_modified_by!: string;
    
    // Invoice managedAt <Timestamps> field
    @Column({
        type: DataType.DATE
    })
    inv_managed_at!: Date;
    
    // Invoice managedBy <Reference> field
    @Column({
        type: DataType.STRING
    })
    inv_managed_by!: string;

}