export interface Note {
  id: number;
  content: string;
}

export interface CreateNoteRequest {
  content: string;
}