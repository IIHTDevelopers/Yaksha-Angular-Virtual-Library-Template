import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BookComponent } from './book.component';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookComponent],
      imports: [FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have form fields for adding a book', () => {
      const compiled = fixture.nativeElement;
      const formFields = compiled.querySelectorAll('form input');
      expect(formFields.length).toBe(4); // Check for the number of input fields
    });

    it('should have a button for adding a book', () => {
      const compiled = fixture.nativeElement;
      const addButton = compiled.querySelector('form button[type="submit"]');
      expect(addButton.textContent).toContain('Add Book');
    });

    it('should display search input for filtering books', () => {
      const compiled = fixture.nativeElement;
      const searchInput = compiled.querySelector('div:nth-child(3) input[type="text"]');
      expect(searchInput).toBeTruthy();
    });

    it('should display edit book form when editing a book', () => {
      component.isEditing = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const editForm = compiled.querySelector('div:nth-child(5) form');
      expect(editForm).toBeTruthy();
      const saveButton = editForm.querySelector('button[type="submit"]');
      const cancelButton = editForm.querySelector('button[type="button"]');
      expect(saveButton.textContent).toContain('Save');
      expect(cancelButton.textContent).toContain('Cancel');
    });

    it('should add a book when submitting the add book form', () => {
      const addButton = fixture.nativeElement.querySelector('form button[type="submit"]');
      const inputFields = fixture.nativeElement.querySelectorAll('form input');
      const sampleBook = {
        title: 'Angular in Action',
        author: 'John Doe',
        genre: 'Technical',
        publicationYear: 2022,
      };

      inputFields[0].value = sampleBook.title;
      inputFields[0].dispatchEvent(new Event('input'));
      inputFields[1].value = sampleBook.author;
      inputFields[1].dispatchEvent(new Event('input'));
      inputFields[2].value = sampleBook.genre;
      inputFields[2].dispatchEvent(new Event('input'));
      inputFields[3].value = sampleBook.publicationYear;
      inputFields[3].dispatchEvent(new Event('input'));

      addButton.click();
      fixture.detectChanges();

      expect(component.books.length).toBe(1);
      expect(component.books[0]).toEqual({
        ...sampleBook,
        id: 1,
      });
    });

    it('should have initial books array empty', () => {
      expect(component.books).not.toBeNull();
      expect(component.books).toEqual([]);
    });

    it('should add a new book', () => {
      component.newBook = {
        id: 1,
        title: 'Angular Basics',
        author: 'Jane Doe',
        genre: 'Technical',
        publicationYear: 2021,
      };
      component.addBook();
      expect(component.books).not.toBeNull();
      expect(component.books.length).toBe(1);
    });

    it('should not add a book with empty fields', () => {
      component.newBook = {
        id: 0,
        title: '',
        author: '',
        genre: '',
        publicationYear: 0,
      };
      component.addBook();
      expect(component.books).not.toBeNull();
      expect(component.books.length).toBe(1);
    });

    it('should edit a book and update it', () => {
      component.newBook = {
        id: 1,
        title: 'Angular Basics',
        author: 'Jane Doe',
        genre: 'Technical',
        publicationYear: 2021,
      };
      component.addBook();

      component.editBook(component.books[0]);
      const updatedBook = {
        id: component.books[0].id,
        title: 'Updated Angular Book',
        author: 'Updated Author',
        genre: 'Updated Genre',
        publicationYear: 2023,
      };
      component.editedBook = { ...updatedBook };
      component.saveEditedBook();
      expect(component.books).not.toBeNull();
      expect(component.books[0]).not.toBeNull();
      expect(component.books[0]).toEqual(updatedBook);
    });

    it('should not edit a book with empty fields', () => {
      component.newBook = {
        id: 1,
        title: 'Angular Basics',
        author: 'Jane Doe',
        genre: 'Technical',
        publicationYear: 2021,
      };
      component.addBook();

      component.editBook(component.books[0]);
      const originalBook = { ...component.books[0] };
      component.newBook = {
        id: originalBook.id,
        title: '',
        author: '',
        genre: '',
        publicationYear: 0,
      };
      component.saveEditedBook();
      expect(component.books).not.toBeNull();
      expect(component.books[0]).not.toBeNull();
      expect(component.books[0]).toEqual(originalBook);
    });

    it('should delete a book', () => {
      component.newBook = {
        id: 1,
        title: 'Angular Basics',
        author: 'Jane Doe',
        genre: 'Technical',
        publicationYear: 2021,
      };
      component.addBook();

      expect(component.books).not.toBeNull();
      expect(component.books.length).toBe(1);
      component.deleteBook(component.books[0]);
      expect(component.books.length).toBe(0);
    });

    it('should cancel editing', () => {
      component.editBook({
        id: 1,
        title: 'Angular Basics',
        author: 'Jane Doe',
        genre: 'Technical',
        publicationYear: 2021,
      });
      component.cancelEdit();
      expect(component.isEditing).toBe(false);
      expect(component.editedBook).toEqual({});
    });

    it('should filter books based on search keyword', () => {
      component.newBook = {
        id: 1,
        title: 'Angular Basics',
        author: 'Jane Doe',
        genre: 'Technical',
        publicationYear: 2021,
      };
      component.addBook();

      component.searchKeyword = 'Angular';
      expect(component.filteredBooks.length).toBe(1);

      component.searchKeyword = 'React';
      expect(component.filteredBooks.length).toBe(0);
    });
  });
});
