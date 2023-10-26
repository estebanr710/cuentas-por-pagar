/**
 * @fileoverview API and server side of `cuentas-por-pagar` app.
 * 
 * @version 1.0
 * 
 * @author Juan Esteban Rodríguez <juan.rodriguez@spagrupoinmobiliario.com>
 * @copyright spagrupoinmobiliario.com
 * 
 * History
 * v1.0 - Deploy of the application. 
 * ----
 * The deploy of the application was done by Juan Esteban Rodríguez
*/

/**
 * @implements dotenv/config
 * @implements express
 * @implements cors
 * @implements Router index
 */
import "dotenv/config";
import  express from "express";
import cors from "cors";
import ROUTER from "./infrastructure/routes";

/**
 * @implements {function} dbTenantAuthConnection
 * @implements {function} dbLocalConnection
 */
import { dbLocalConnection } from "./infrastructure/db/mysql/local";
import { dbTenantAuthConnection } from "./infrastructure/db/mysql/tenant.auth";

/**
 * Constant provided by `.env` file
 * @constant {object} PORT
 * @description `express` module constant
 */
const PORT = process.env.PORT || 3001;

/**
 * @constant {object} app
 * @description `express` module constant
 */
const APP = express();

/**
 * App global configuration
 * [ cors, json, router, public folder ]
 */
APP.use(cors());
APP.use(express.json());
APP.use(express.static('temp'));
APP.use(ROUTER);

/**
 * DB Connections launchers
 * [ TENANT_AUTH, LOCAL ]
*/
dbTenantAuthConnection();
dbLocalConnection();

/**
 * Application launcher
 */
APP.listen(PORT, () => {
    console.log(`Application running at PORT: ${PORT}`);
});