import * as excel from "exceljs";
import * as fs from "fs";
import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { LOCAL_SEQUELIZE } from "../db/mysql/local";
import randomString from "../handlers/handle.random.string";

export class ReportController {

    public generateController = async (req: Request, res: Response) => {
        try {
            let { simi_state, state, from, to } = matchedData(req);

            let query = "";

            // Set query conditions
            
            if (simi_state || state || from || to) {
                query += " WHERE";
            }
            
            // ./Set query conditions
            
            const [ DATA, META_DATA ] = await LOCAL_SEQUELIZE.query(query);
            
            if (DATA.length === 0) {
                res.status(404).send("NO_MATCHES_FOUND");
            }
            
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Informe');

            // Headers
            worksheet.addRow([
                "REFERENCIA",
                "TÍTULO",
                "PROVEEDOR",
                "ESTADO",
                "CP SIMI",
                "CONTABILIZADO",
                "VALOR",
                "CREADA",
                "MODIFICADA",
                "MODIFICADA POR",
                "ADMINISTRADA",
                "ADMINISTRADA POR"
            ]);

            for (const e of DATA) {
                /* worksheet.addRow([

                ]); */
            }

            const TEMP_PATH = `${__dirname}/../temp`;
            const TEMP_NAME = `${randomString()}.xlsx`;
            const FILE_PATH = `${TEMP_PATH}/${TEMP_NAME}`;

            await workbook.xlsx.writeFile(FILE_PATH);

            res.download(FILE_PATH, (err) => {
                if (err) {
                    res.status(500).send(`Error: ${err}`);
                } else {
                    fs.unlinkSync(FILE_PATH);
                };
            });
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }
}