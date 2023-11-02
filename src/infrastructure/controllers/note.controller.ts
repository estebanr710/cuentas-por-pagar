import { Request, Response } from "express";
import { NoteUseCase } from "../../application/note.use.case";

import { matchedData } from "express-validator";

export class NoteController {

    constructor(private noteUseCase: NoteUseCase) { }

    public insertController = async (req: Request, res: Response) => {
        try {
            let { invoice_id, user_id, not_description } = matchedData(req);
            const NOTE = await this.noteUseCase.registerNote({ invoice_id, user_id, not_description });
            switch (NOTE) {
                case 'INVOICE_NOT_FOUND':
                res.status(404).send({ status: 404, message: NOTE });
                    break;
                case 'USER_NOT_FOUND':
                res.status(404).send({ status: 404, message: NOTE });
                    break;
                default:
                res.status(201).send(NOTE);
                    break;
            }
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }
}