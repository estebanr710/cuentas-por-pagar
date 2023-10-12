/**
 * @implements {class} Sequelize-typescript
 */
import { Sequelize } from "sequelize-typescript";

/**
 * @implements {model} UsersTA
 */
import User from "../../models/local.users.schema";

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
        User
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
    } catch (e)
    {
        console.log(`E-connect: ${e}`);
    }
}

/**
 * @exports object LOCAL_SEQUELIZE
 * @exports function dbLocalConnection
 */
export { dbLocalConnection, LOCAL_SEQUELIZE };