import Attachment from "../models/local.attachments.schema";
import Client from "ssh2-sftp-client";
import { getDiggestValue, getJWTByUser } from "./handle.microsoft";
import axios from "axios";
import randomString from "./handle.random.string";
import * as fs from "fs";

const SFTP_HOST = process.env.SFTP_HOST ?? '__default__';
const SFTP_PORT = Number(process.env.SFTP_PORT) ?? 22;
const SFTP_USER = process.env.SFTP_USER ?? '__default__';
const SFTP_PASSWORD = process.env.SFTP_PASSWORD ?? '__default__';

const saveToFTPServer = async (ATTACHMENT: any) => {
    try {
        let { id, invoice_id } = ATTACHMENT;

        const ACCESS_TOKEN = await getJWTByUser();
        const DIGGEST_VALUE = await getDiggestValue();

        const BASE_URL: string = process.env.BASE_URL ?? '__default__';
        const SITE_NAME: string = process.env.SHAREPOINT_SITE ?? '__default__';

        let ENDPOINT: string = `${BASE_URL}/sites/${SITE_NAME}/_api/web/GetFolderByServerRelativeUrl('${ATTACHMENT.att_relative_path}')/Files('${ATTACHMENT.att_relative_path}/${ATTACHMENT.att_name}.${ATTACHMENT.att_extension}')/$value`;

        const FILE: any = await axios.get(ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}`,
                'X-RequestDigest': DIGGEST_VALUE
            },
            responseType: 'stream'
        });

        const TEMP_FILENAME: string = `temp_${randomString()}.${ATTACHMENT.att_extension}`;

        const TEMP_PATH: string = `${__dirname}/../temp`;

        const FILE_STREAM = fs.createWriteStream(`${TEMP_PATH}/${TEMP_FILENAME}`);

        FILE.data.pipe(FILE_STREAM);

        await new Promise((resolve, reject) => {
            FILE_STREAM.on('finish', resolve);
            FILE_STREAM.on('error', reject);
        });

        FILE_STREAM.end();

        const CLIENT = new Client();

        await CLIENT.connect({
            host: SFTP_HOST,
            port: SFTP_PORT,
            username: SFTP_USER,
            password: SFTP_PASSWORD
        });

        if (!await CLIENT.exists(`public_html/cuentas-por-pagar/${invoice_id}`)) {
            await CLIENT.mkdir(`public_html/cuentas-por-pagar/${invoice_id}`, false);
        }

        await CLIENT.fastPut(`${TEMP_PATH}/${TEMP_FILENAME}`, `public_html/cuentas-por-pagar/${invoice_id}/${TEMP_FILENAME}`);

        const att_local_relative_path = `cuentas-por-pagar/${invoice_id}/${TEMP_FILENAME}`;

        await Attachment.update({ att_local_relative_path }, { where: { id } });

        fs.unlinkSync(`${TEMP_PATH}/${TEMP_FILENAME}`);
        
        CLIENT.end();

        return 200;
    } catch (e) {
        console.log(`Error: ${e}`);
    }
}

export default saveToFTPServer;