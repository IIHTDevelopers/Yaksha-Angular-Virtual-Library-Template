import { Component } from '@angular/core';

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  books: Book[] = [];
  newBook: Book = {} as Book;
  editedBook: Book = {} as Book;
  isEditing = false;
  searchKeyword = '';

  constructor() { }

  addBook(): void {
  }

  editBook(book: Book): void {
  }

  saveEditedBook(): void {
  }

  cancelEdit(): void {
  }

  deleteBook(book: Book): void {
  }

  get filteredBooks(): Book[] {
    return [];
  }
}
