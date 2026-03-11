import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
      next: () => {
        this.content = '';
        this.load();
      },
      error: () => (this.error = 'Failed to create note.'),
    });
  }

  remove(id: number) {
    this.noteService.deleteNote(id).subscribe({
      next: () => this.load(),
      error: () => (this.error = 'Failed to delete note.'),
    });
  }
}