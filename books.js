/** @format */
////////////////////////////////////////////////////////////////////////////////
// Book-Tab UI element declaration, identification, initialization
////////////////////////////////////////////////////////////////////////////////
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const bookForm_EL = document.querySelector('#book-form'),
  bookTitle_EL = document.querySelector('#book-title'),
  bookAuthor_EL = document.querySelector('#book-author'),
  bookISBN_EL = document.querySelector('#book-isbn'),
  bookSearch_EL = document.querySelector('#book-search'),
  bookTableBody_EL = document.querySelector('#book-tbody'),
  modalEditFooter_EL = document.querySelector('.modal-footer');
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Objects and Functions
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.booked = false;
  }
}
class UIBooks {
  static addBook(title, author, isbn) {
    // Creates new UI Element and member object
    const newBook_EL = document.createElement('tr'),
      book = new Book(title, author, isbn);
    newBook_EL.id = 'book-tr';
    newBook_EL.innerHTML = `
    <td><span class="far fa-copy hover-grow tooltip tooltip--bottom-right" data-tooltip="Copy ISBN"></span>${book.isbn}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td class="options-td">
      <div id="options-icons">
        <a
          href="#modal-edit"
          class="fas fa-edit fa-lg hover-grow"
        ></a>
        <a
          href="#modal-warning"
          class="fas fa-trash fa-lg hover-grow"
        ></a>
      </div>
    </td>
    `;
    // Adds new book to dataset
    bookDataset.push(book);
    // Adds new book to UI-row
    bookTableBody_EL.appendChild(newBook_EL);
    toastAlert('A new Book has been added', 'success');
  }

  static removeBook(bookIsbn, e) {
    // Removes book's UI-row
    e.target.parentElement.parentElement.parentElement.remove();
    // Removes book from dataset
    let book = returnObjWithId(bookIsbn, 'book');
    bookDataset.splice(bookDataset.indexOf(book), 1);
    toastAlert('Book has been removed', 'success');
  }

  static editBook(isbn, title, author) {
    // Edits book UI-row
    document.querySelectorAll('#book-tr').forEach(function (tr) {
      let targetisbn = tr.children[0].innerText;
      if (isbn === targetisbn) {
        tr.children[1].textContent = title;
        tr.children[2].textContent = author;
        toastAlert('Book has been successfully edited', 'success');
      }
    });
    // Edit book in dataset
    let bookToEdit = returnObjWithId(isbn, 'book');
    bookToEdit = title;
    bookToEdit = author;
  }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Event Listeners
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Add Book
bookForm_EL.addEventListener('submit', function (e) {
  let title = bookTitle_EL.value,
    author = bookAuthor_EL.value,
    isbn = bookISBN_EL.value;

  // User Input Validation
  if (title !== '' || isbn !== '') {
    // ISBN validation
    if (isbn.slice(0, 3) === '978') {
      if (
        isbn.includes('-', 3) &&
        isbn.includes('-', 6) &&
        isbn.includes('-', 11)
      ) {
        if (isbn.length >= 12 && isbn.length <= 17) {
          UIBooks.addBook(title, author, isbn);

          bookTitle_EL.value = '';
          bookAuthor_EL.value = '';
          bookISBN_EL.value = '';
        } else {
          toastAlert(
            'ISBN must be between 10 to 13 characters and contain all dashes',
            'error'
          );
        }
      } else {
        toastAlert('ISBN format must include all hyphens', 'error');
      }
    } else {
      toastAlert('ISBN must start with 978', 'error');
    }
  } else {
    toastAlert('Inputs with an asterisk must be filled', 'error');
  }

  e.preventDefault();
});

// Listener for book table body
bookTableBody_EL.addEventListener('click', function (e) {
  // Triggers book edit modal
  if (e.target.classList.contains('fa-edit')) {
    editModal(e, 'book');
    // Edit Book
    modalEditFooter_EL.addEventListener('click', function edit(e2) {
      if (e2.target.classList.contains('save')) {
        const title = modalEditInput1_EL.value,
          author = modalEditInput2_EL.value,
          isbn = modalEditInput3_EL.value;

        UIBooks.editBook(isbn, title, author);

        modalEditFooter_EL.removeEventListener('click', edit);
      }
    });
  }
  // Triggers book delete modal
  if (e.target.classList.contains('fa-trash')) {
    removeModal(e, 'book');
  }
  // Copy book ID to clipboard
  if (e.target.classList.contains('fa-copy')) {
    copyToClipboard(e);
  }
});

// Search Book
bookSearch_EL.addEventListener('keyup', function (e) {
  search(e, '#book-tr');
});
