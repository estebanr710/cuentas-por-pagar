export interface NoteEntity {
    id?: string,
    invoice_id: string,
    not_description: string,
    not_type: string,
    not_datetime?: Date | undefined
}