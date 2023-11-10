import { Router } from "express";

// MySql Repository
import { MySqlInvoiceRepository } from "../repositories/mysql/invoice.repository"; 
// Use Case
import { InvoiceUseCase } from "../../application/invoice.use.case"; 
// Controller
import { InvoiceController } from "../controllers/invoice.controller"; 

import authMiddleware from "../middlewares/jwt.middleware";
import {
    validatorCreateInvoice,
    validatorGetInvoices,
    validatorGetInvoice,
    validatorAddApprovers,
    validatorAddNote,
    validatorApproveInvoice,
    validatorApproverActions,
    validatorUpdateInvoice
} from "../validators/invoice.validator";

const ROUTER = Router();

let invoiceReposotory = new MySqlInvoiceRepository();
let invoiceUseCase = new InvoiceUseCase(invoiceReposotory);
let invoiceController = new InvoiceController(invoiceUseCase);

ROUTER.post("/", 
    authMiddleware, 
    validatorCreateInvoice,
    invoiceController.insertController
);

ROUTER.get("/:id", 
    authMiddleware, 
    validatorGetInvoice,
    invoiceController.getByIdController
);

ROUTER.get("/:page?:size?", 
    authMiddleware, 
    validatorGetInvoices,
    invoiceController.getController
);

ROUTER.put("/approvers/add", 
    authMiddleware, 
    validatorAddApprovers,
    invoiceController.addApproverController
);

ROUTER.put("/approvers/approve", 
    authMiddleware, 
    validatorApproveInvoice,
    invoiceController.aproveController
);

ROUTER.put("/approvers/reject", 
    authMiddleware, 
    validatorApproverActions,
    invoiceController.rejectController
);

ROUTER.put("/approvers/return", 
    authMiddleware, 
    validatorApproverActions,
    invoiceController.returnController
);

ROUTER.put("/cancel", 
    authMiddleware, 
    validatorApproverActions,
    invoiceController.cancelController
);

ROUTER.put("/notes/add", 
    authMiddleware, 
    validatorAddNote,
    invoiceController.addNoteController
);

ROUTER.put("/", 
    authMiddleware, 
    validatorUpdateInvoice,
    invoiceController.updateController
);

export { ROUTER };