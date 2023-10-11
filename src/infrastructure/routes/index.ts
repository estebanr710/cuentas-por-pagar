/**
 * @implements {module} express/Router
 * @implements {function} fs/readdirSync
 */
import { Router } from "express";
import { readdirSync } from "fs"

const ROUTER = Router();

/**
 * @constant {string} PATH_ROUTES
 * @description Actual directory
 */
const PATH_ROUTER = `${__dirname}`;

/**
 * Returns the extension of a file name.
 * 
 * @param {string} fileName Name of the file 
 * @returns {string} Returns extension of file
 */
const cleanFileName = (fileName:string) => {

    const FILE = fileName.split(".").shift();
    return FILE;
}

/**
 * Function that filters `all` the files in the current directory, removes their extensions and then, for each of the file names declares a route using the application's `router`.
 * 
 * @returns {void}
 */
readdirSync(PATH_ROUTER).filter((fileName) => {

    const CLEAN_NAME = cleanFileName(fileName);

    if (CLEAN_NAME !== 'index') {

        import(`./${CLEAN_NAME}`).then((moduleRouter)=> {

            ROUTER.use(`/${CLEAN_NAME}`, moduleRouter.ROUTER);
        });
    }
});

/**
 * @exports module router
 */
export default ROUTER;