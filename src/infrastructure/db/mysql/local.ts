/**
 * @implements {class} Sequelize-typescript
 */
import { Sequelize } from "sequelize-typescript";

/**
 * @implements {model} Invoice
 * @implements {model} Role
 * @implements {model} User
 * @implements {model} Attachment
 * @implements {model} State
 */
import Invoice from "../../models/local.invoices.schema";
import Role from "../../models/local.roles.schema";
import User from "../../models/local.users.schema";
import Attachment from "../../models/local.attachments.schema";
import State from "../../models/local.states.schema";
import Provider from "../../models/local.providers.schema";
import Note from "../../models/local.notes.schema";
import Approver from "../../models/local.approvers.schema";
import CostCenter from "../../models/local.costcenter.schema";
import IxCC from "../../models/local.ixcc.schema";
import User2 from "../../models/local.users2.schema";
import ProviderAuditory from "../../models/local.providerauditories.schema";

/**
 * DB Connection object.
 * @returns {object} Returns new `sequelize` object provided by `Sequelize` class.
 */
const LOCAL_SEQUELIZE = new Sequelize({
    database: process.env.LOCAL_DATABASE,
    username: process.env.LOCAL_USER,
    password: process.env.LOCAL_PASSWORD,
    host: process.env.LOCAL_HOST,
    dialect: "mysql", 
    models: [
        Invoice,
        Role,
        User,
        User2,
        Attachment,
        State,
        Provider,
        Note,
        Approver,
        CostCenter,
        IxCC,
        ProviderAuditory
    ]
});

/**
 * DB Connection LOCAL `async` function.
 * @returns {void}
 */
const dbLocalConnection = async()=> {
    try {
        await LOCAL_SEQUELIZE.authenticate();
        
        console.log("Successfull LOCAL connection");
    } catch (e) {
        console.log(`E-connect: ${e}`);
    }
}

/**
 * @exports object LOCAL_SEQUELIZE
 * @exports function dbLocalConnection
 */
export { dbLocalConnection, LOCAL_SEQUELIZE };