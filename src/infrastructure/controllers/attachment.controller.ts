import { Request, Response } from "express";
import { AttachmentUseCase } from "../../application/attachment.use.case";

import { matchedData } from "express-validator";

export class AttachmentController {

    constructor(private attachmentUseCase: AttachmentUseCase) {}

    public getController = async (req: Request, res: Response) => {
        try {
            let attachments = await this.attachmentUseCase.getAttachments();
            res.send({ attachments });
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    public getByIdController = async (req: Request, res: Response) => {
        try {
            let { id } = matchedData(req);
            const ATTACHMENT = await this.attachmentUseCase.getAttachment(id);
            if (!ATTACHMENT) {
                res.status(404).send({ status: 404, message: "ROLE_NOT_EXISTS" });
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
            res.status(201).send(ATTACHMENT);
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
}