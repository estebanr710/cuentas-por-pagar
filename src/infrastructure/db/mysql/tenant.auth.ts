/**
 * @implements {class} Sequelize-typescript
 */
import { Sequelize } from "sequelize-typescript";

/**
 * @implements {model} UsersTA
 */
import { UserTA } from "../../models/tenant.auth.users.schema";

/**
 * DB Connection object.
 * @returns {object} Returns new `sequelize` object provided by `Sequelize` class.
 */
const TA_SEQUELIZE = new Sequelize({
    database: process.env.TA_MYSQL_DATABASE,
    username: process.env.TA_MYSQL_USER,
    password: process.env.TA_MYSQL_PASSWORD,
    host: process.env.TA_MYSQL_HOST,
    dialect: "mysql", 
    models: [
        UserTA
    ]
});

/**
 * DB Connection TA `async` function.
 * @returns {void}
 */
const dbTenantAuthConnection = async()=> {
    try {
        await TA_SEQUELIZE.authenticate();
        
        console.log("Successfull TENANT_AUTH connection");
    } catch (e) {
        console.log(`E-connect: ${e}`);
    }
}

/**
 * @exports object TA_SEQUELIZE
 * @exports function dbTenantAuthConnection
 */
export { dbTenantAuthConnection, TA_SEQUELIZE };