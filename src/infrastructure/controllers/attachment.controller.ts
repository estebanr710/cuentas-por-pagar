import { Request, Response } from "express";
import { AttachmentUseCase } from "../../application/attachment.use.case";

import { matchedData } from "express-validator";

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
                res.status(201).send(ATTACHMENT);
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
}