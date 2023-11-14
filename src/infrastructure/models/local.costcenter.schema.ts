/**
* @implements {object} Table
* @implements {object} Column
* @implements {object} Model
* @implements {object} DataType
*/
import { Table, Column, Model, DataType, IsUUID, HasOne } from "sequelize-typescript";

/**
* Declare Tablename roles
* @default
*/
@Table({
   timestamps: false,
   tableName: "costcenter"
})

/**
* Declare role model
* @default
*/
export default class CostCenter extends Model {

    // ID <uuid> field
    @IsUUID(4)
    @Column({
        type: DataType.STRING,
        primaryKey: true
    })
    id!: string;

    // Cost center description field
    @Column({
        type: DataType.STRING
    })
    cos_cen_description!: string;

    // Cost center state field
    @Column({
        type: DataType.BOOLEAN
    })
    cos_cen_state!: boolean;
}