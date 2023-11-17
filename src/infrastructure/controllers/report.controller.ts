import * as excel from "exceljs";
import * as fs from "fs";
import { Request, Response } from "express";
import { matchedData } from "express-validator";

import { LOCAL_SEQUELIZE } from "../db/mysql/local";
import randomString from "../handlers/handle.random.string";

export class ReportController {

    public generateController = async (req: Request, res: Response) => {
        try {
            /* let { simi_state, state, from, to } = matchedData(req); */

            let query = "SELECT `Invoice`.`inv_reference`, `Invoice`.`inv_title`, `Invoice`.`inv_cp_simi`, `Invoice`.`inv_simi_state`, `Invoice`.`inv_amount`, `Invoice`.`inv_created_at`, `Invoice`.`inv_modified_at`, `Invoice`.`inv_managed_at`, `state`.`sta_description` AS `sta_description`, `provider`.`pro_name` AS `pro_name`, `provider`.`pro_nit` AS `pro_nit`, `modifier`.`use_name` AS `modifier`, `manager`.`use_name` AS `manager` FROM `invoices` AS `Invoice` LEFT OUTER JOIN `states` AS `state` ON `Invoice`.`state_id` = `state`.`id` LEFT OUTER JOIN `providers` AS `provider` ON `Invoice`.`provider_id` = `provider`.`id` LEFT OUTER JOIN `users` AS `modifier` ON `Invoice`.`inv_modified_by` = `modifier`.`id` LEFT OUTER JOIN `users` AS `manager` ON `Invoice`.`inv_modified_by` = `manager`.`id`";

            // Set query conditions
            
            /* if (simi_state || state || from || to) {
                query += " WHERE";
            } */
            
            // ./Set query conditions
            
            const [ DATA, META_DATA ] = await LOCAL_SEQUELIZE.query(query);
            
            if (DATA.length === 0) {
                res.status(404).send("NO_MATCHES_FOUND");
            }
            
            const workbook = new excel.Workbook();
            const worksheet = workbook.addWorksheet('Informe');

            // Headers
            worksheet.columns = [
                { header: 'REFERENCIA', key: 'reference' },
                { header: 'TÍTULO', key: 'title' },
                { header: 'NIT PROVEEDOR', key: 'pro_nit' },
                { header: 'NOMBRE PROVEEDOR', key: 'pro_name' },
                { header: 'ESTADO', key: 'state' },
                { header: 'CP SIMI', key: 'cp_simi' },
                { header: 'CONTABILIZADO', key: 'simi_state' },
                { header: 'VALOR', key: 'amount' },
                { header: 'CREADA', key: 'created', style: { numFmt: 'yyyy/mm/dd hh:mm:ss' } },
                { header: 'MODIFICADA', key: 'modified_at', style: { numFmt: 'yyyy/mm/dd hh:mm:ss' } },
                { header: 'MODIFICADA POR', key: 'modified_by' },
                { header: 'ADMINISTRADA', key: 'managed_at', style: { numFmt: 'yyyy/mm/dd hh:mm:ss' } },
                { header: 'ADMINISTRADA POR', key: 'managed_by' }
            ];

            for (const e of DATA as any) {
                worksheet.addRow({
                    reference: e.inv_reference,
                    title: e.inv_title,
                    pro_nit: e.pro_nit ? e.pro_nit : "",
                    pro_name: e.pro_name ? e.pro_name : "",
                    state: e.sta_description,
                    cp_simi: e.inv_cp_simi ? e.inv_cp_simi : "",
                    simi_state: e.inv_simi_state ? "CONTABILIZADO" : "NO CONTABILIZADO",
                    amount: e.inv_amount ? e.inv_amount : 0,
                    created: e.inv_created_at,
                    modified_at: e.inv_modified_at ? e.inv_modified_at : "",
                    modified_by: e.modifier ? e.modifier : "",
                    managed_at: e.inv_managed_at ? e.inv_managed_at : "",
                    managed_by: e.manager ? e.manager : ""
                });
            }

            const TEMP_PATH = `${__dirname}/../temp`;
            const TEMP_NAME = `Reporte-${randomString()}.xlsx`;
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