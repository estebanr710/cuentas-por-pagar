import { Router } from "express";

import authMiddleware from "../middlewares/jwt.middleware";

import { MySqlAttachmentRepository } from "../repositories/mysql/attachment.repository";
import { AttachmentUseCase } from "../../application/attachment.use.case";
import { AttachmentController } from "../controllers/attachment.controller"; 

import { validatorCreateAttachment, validatorGetAttachmentById, validatorGetAttachmentsByInvoiceId, validatorSendToFTP } from "../validators/attachment.validator";

const ROUTER = Router();

let attachmentRepository = new MySqlAttachmentRepository();
let attachmentUseCase = new AttachmentUseCase(attachmentRepository);
let attachmentController = new AttachmentController(attachmentUseCase);

ROUTER.post("/", 
    authMiddleware,
    validatorCreateAttachment,
    attachmentController.insertController
)

ROUTER.get("/invoice/:invoice_id", 
    authMiddleware,
    validatorGetAttachmentsByInvoiceId,
    attachmentController.getController
)

ROUTER.get("/:id", 
    authMiddleware,
    validatorGetAttachmentById,
    attachmentController.getByIdController
)

ROUTER.get("/content/:id", 
    authMiddleware,
    validatorGetAttachmentById,
    attachmentController.getContentController
)

ROUTER.put("/sendToFTP/:id", 
    authMiddleware,
    validatorSendToFTP,
    attachmentController.sendToFTP
)

ROUTER.put("/sendToFTP", 
    attachmentController.sendToFTP2
)

export { ROUTER };