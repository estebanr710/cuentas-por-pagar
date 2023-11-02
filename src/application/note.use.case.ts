import { NoteEntity } from "../domain/note/note.entity";
import { NoteRepository } from "../domain/note/note.repository";
import { NoteValue } from "../domain/note/note.value";

export class NoteUseCase {

    constructor(private readonly noteRepository: NoteRepository) { }

    public registerNote = async ({ invoice_id, user_id, not_description, not_type }: NoteEntity) => {
        let noteValue = new NoteValue({ invoice_id, user_id, not_description, not_type });
        let noteCreated = await this.noteRepository.registerNote(noteValue);
        return noteCreated;
    }
}