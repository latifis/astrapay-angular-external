import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes',
  standalone: false,
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  content = '';
  loading = false;
  error = '';

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.error = '';
    this.noteService.getNotes().subscribe({
      next: (data) => {
        this.notes = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load notes.';
        this.loading = false;
      },
    });
  }

  create() {
    const trimmed = this.content.trim();
    if (!trimmed) return;

    this.noteService.createNote({ content: trimmed }).subscribe({
      next: (note) => {
        this.notes.unshift(note);
        this.content = '';
      },
      error: () => (this.error = 'Failed to create note.')
    });
  }

  remove(id: number) {
    this.noteService.deleteNote(id).subscribe({
      next: () => {
        this.notes = this.notes.filter(n => n.id !== id);
      },
      error: () => (this.error = 'Failed to delete note.')
    });
  }
}