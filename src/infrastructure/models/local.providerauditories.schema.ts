/**
* @implements {object} Table
* @implements {object} Column
* @implements {object} Model
* @implements {object} DataType
*/
import { Table, Column, Model, DataType, IsUUID, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import Invoice from "./local.invoices.schema";
import Provider from "./local.providers.schema";
import User from "./local.users.schema";

/**
* Declare Tablename providers
* @default
*/
@Table({
   timestamps: false,
   tableName: "providerauditories"
})

/**
* Declare provider model
* @default
*/
export default class ProviderAuditory extends Model {

    // ID <uuid> field
    @IsUUID(4)
    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    id!: string;

    // Provider auditory provider <Reference> field
    @IsUUID(4)
    @ForeignKey(() => Provider)
    @Column({
        type: DataType.STRING
    })
    provider_id!: string;

    // "One to one" relationship to "Provider" table
    @BelongsTo(() => Provider)
    provider!: Provider;

    // Provider auditory NIT field
    @Column({
        type: DataType.STRING
    })
    pro_aud_pro_nit!: string;

    // Provider auditory name field
    @Column({
        type: DataType.STRING
    })
    pro_aud_pro_name!: string;

    // Provider auditory email field
    @Column({
        type: DataType.STRING
    })
    pro_aud_pro_email!: string;

    // Provider auditory document type field
    @Column({
        type: DataType.NUMBER
    })
    pro_aud_pro_document_type!: number;

    // Provider auditory bank field
    @Column({
        type: DataType.NUMBER
    })
    pro_aud_pro_bank!: number;

    // Provider auditory account number field
    @Column({
        type: DataType.STRING
    })
    pro_aud_pro_account_number!: string;

    // Provider auditory account number field
    @Column({
        type: DataType.ENUM('AHORROS', 'CORRIENTE')
    })
    pro_aud_pro_account_type!: string;

    // Provider auditory email field
    @Column({
        type: DataType.BOOLEAN
    })
    pro_aud_pro_state!: boolean;

    // Provider auditory email field
    @Column({
        type: DataType.DATE
    })
    pro_aud_datetime!: Date;

    // Provider auditory user <Reference> field
    @IsUUID(4)
    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING
    })
    pro_aud_user!: string;

    // "One to one" relationship to "User" table
    @BelongsTo(() => User)
    user!: User;
    // Provider auditory account number field

    @Column({
        type: DataType.ENUM('EDITION', 'CREATION')
    })
    pro_aud_type!: string;
}