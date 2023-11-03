import { Router } from "express";

// MySql Repository
import { MySqlInvoiceRepository } from "../repositories/mysql/invoice.repository"; 
// Use Case
import { InvoiceUseCase } from "../../application/invoice.use.case"; 
// Controller
import { InvoiceController } from "../controllers/invoice.controller"; 

import authMiddleware from "../middlewares/jwt.middleware";
import { validatorCreateInvoice, validatorGetInvoices } from "../validators/invoice.validator";

const ROUTER = Router();

let invoiceReposotory = new MySqlInvoiceRepository();
let invoiceUseCase = new InvoiceUseCase(invoiceReposotory);
let invoiceController = new InvoiceController(invoiceUseCase);

ROUTER.post("/", 
    authMiddleware, 
    validatorCreateInvoice,
    invoiceController.insertController
);

ROUTER.get("/:page?:size?", 
    authMiddleware, 
    validatorGetInvoices,
    invoiceController.getController
);

export { ROUTER };