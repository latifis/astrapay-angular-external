import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note, CreateNoteRequest } from '../models/note.model';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private readonly baseUrl = '/api/notes';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.baseUrl);
  }

  createNote(payload: CreateNoteRequest): Observable<Note> {
    return this.http.post<Note>(this.baseUrl, payload);
  }

  deleteNote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}