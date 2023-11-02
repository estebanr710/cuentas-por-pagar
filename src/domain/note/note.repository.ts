import { NoteEntity } from "./note.entity";

export interface NoteRepository {
    registerNote(note: NoteEntity): Promise<NoteEntity | null | string>;
}