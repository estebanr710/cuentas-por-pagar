import { Router } from "express";

// MySql Repository
import { MySqlNoteRepository } from "../repositories/mysql/note.repository"; 
// Use Case
import { NoteUseCase } from "../../application/note.use.case"; 
// Controller
import { NoteController } from "../controllers/note.controller"; 

import authMiddleware from "../middlewares/jwt.middleware";
import validatorCreateNote from "../validators/note.validator";

const ROUTER = Router();

let noteReposotory = new MySqlNoteRepository();
let noteUseCase = new NoteUseCase(noteReposotory);
let noteController = new NoteController(noteUseCase);

ROUTER.post("/",
    authMiddleware,
    validatorCreateNote,
    noteController.insertController
);

export { ROUTER };