import { NoteRepository } from "../../../domain/note/note.repository";

import Note from "../../models/local.notes.schema";

export class MySqlNoteRepository implements NoteRepository {

    async registerNote(noteMock: any): Promise<any> {
        const NOTE = await Note.create(noteMock);
        return NOTE;
    }
}