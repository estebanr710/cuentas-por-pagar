import { Request, Response } from "express";
import { AttachmentUseCase } from "../../application/attachment.use.case";

import { matchedData } from "express-validator";
import axios from "axios";

import { getDiggestValue, getJWTByUser } from "../handlers/handle.microsoft";
import randomString from "../handlers/handle.random.string";
import * as fs from "fs";
import saveToFTPServer from "../handlers/handle.local.file";

export class AttachmentController {

    constructor(private attachmentUseCase: AttachmentUseCase) {}

    // Get attachments by invoice_id <Reference>
    public getController = async (req: Request, res: Response) => {
        try {
            let { invoice_id } = matchedData(req);
            let attachments = await this.attachmentUseCase.getAttachments(invoice_id);
            res.send({ attachments });
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
    
    // Get individual attachment by id 
    public getByIdController = async (req: Request, res: Response) => {
        try {
            let { id } = matchedData(req);
            const ATTACHMENT = await this.attachmentUseCase.getAttachment(id);
            if (!ATTACHMENT) {
                res.status(404).send({ status: 404, message: "ATTACHMENT_NOT_EXISTS" });
            } else {
                res.send(ATTACHMENT);
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    public insertController = async (req: Request, res: Response) => {
        try {
            let { invoice_id, att_name, att_extension, att_relative_path } = matchedData(req);
            const ATTACHMENT = await this.attachmentUseCase.registerAttachment({ invoice_id, att_name, att_extension, att_relative_path });
            if (ATTACHMENT === "INVOICE_NOT_FOUND") {
                res.status(404).send({ status: 404, message: "INVOICE_NOT_FOUND" });
            } else {
                saveToFTPServer(ATTACHMENT as any);
                res.status(201).send(ATTACHMENT);
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    // Get attachment's content by id
    public getContentController = async (req: Request, res: Response) => {
        try {

            let { id } = matchedData(req);

            const ATTACHMENT = await this.attachmentUseCase.getAttachment(id);

            if (!ATTACHMENT) {
                res.status(404).send({ status: 404, message: "ATTACHMENT_NOT_EXISTS" });
            } else {
                // Content...

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

                res.download(`${TEMP_PATH}/${TEMP_FILENAME}`, (err) => {
                    if (err) {
                        res.status(500).send(`Error: ${err}`);
                    } else {
                        fs.unlinkSync(`${TEMP_PATH}/${TEMP_FILENAME}`);
                    };
                });
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
}