import { Router } from "express";

// MySql Repository
import { MySqlInvoiceRepository } from "../repositories/mysql/invoice.repository"; 
// Use Case
import { InvoiceUseCase } from "../../application/invoice.use.case"; 
// Controller
import { InvoiceController } from "../controllers/invoice.controller"; 

import authMiddleware from "../middlewares/jwt.middleware";

const ROUTER = Router();

let invoiceReposotory = new MySqlInvoiceRepository();
let invoiceUseCase = new InvoiceUseCase(invoiceReposotory);
let invoiceController = new InvoiceController(invoiceUseCase);

ROUTER.post("/", authMiddleware, invoiceController.insertController);

export { ROUTER };