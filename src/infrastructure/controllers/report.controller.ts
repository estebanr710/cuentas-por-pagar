import * as excel from "exceljs";
import * as fs from "fs";
import { Request, Response } from "express";
import { matchedData } from "express-validator";

export class ReportController {

    public generateController = async (req: Request, res: Response) => {
        try {
            let { simi_state, state, from, to } = matchedData(req);

            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Informe');

            worksheet.addRow(['Nombre', 'Edad']);
            worksheet.addRow(['Juan', 25]);
            worksheet.addRow(['María', 30]);
            worksheet.addRow(['Pedro', 22]);

            const TEMP_PATH: string = `${__dirname}/../temp`;

            const filePath = `${TEMP_PATH}/ejemplo.xlsx`;
            await workbook.xlsx.writeFile(filePath);

            res.download(`${TEMP_PATH}/ejemplo.xlsx`, (err) => {
                if (err) {
                    res.status(500).send(`Error: ${err}`);
                } else {
                    fs.unlinkSync(`${TEMP_PATH}/ejemplo.xlsx`);
                };
            });
        } catch (e) {
            res.status(500).send(`Error: ${e}`);
        }
    }
}