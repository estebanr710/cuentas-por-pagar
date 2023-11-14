/**
* @implements {object} Table
* @implements {object} Column
* @implements {object} Model
* @implements {object} DataType
*/
import { Table, Column, Model, DataType, IsUUID, HasOne, ForeignKey, BelongsTo } from "sequelize-typescript";
import Invoice from "./local.invoices.schema";
import CostCenter from "./local.costcenter.schema";

/**
* Declare Tablename IxCC
* @default
*/
@Table({
   timestamps: false,
   tableName: "invoicexcostcenter"
})

/**
* Declare role model
* @default
*/
export default class IxCC extends Model {

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

    // "Many to many" relationship to "Invoices" table
    @BelongsTo(() => Invoice)
    invoice!: Invoice;

    // Cost center ID <Reference> field
    @IsUUID(4)
    @ForeignKey(() => CostCenter)
    @Column({
        type: DataType.STRING
    })
    costcenter_id!: string;

    // "Many to many" relationship to "Cost Center" table
    @BelongsTo(() => CostCenter)
    user!: CostCenter;

    // IxCC percentage field
    @Column({
        type: DataType.NUMBER
    })
    percentage!: number;
}