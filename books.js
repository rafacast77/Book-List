/** @format */
////////////////////////////////////////////////////////////////////////////////
// BOOKS TAB UI element variable declaration, identification, initialization
////////////////////////////////////////////////////////////////////////////////
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const bookContainer_EL = document.querySelector('.tab-content'),
  modalEditFooter_EL = document.querySelector('.modal-footer'),
  form_EL = document.querySelector('#book-form'),
  bookTableBody_EL = document.querySelector('#book-tbody'),
  edit_body = document.querySelector('#edit-body'),
  deleteWarning_EL = document.querySelector('#modal-warning'),
  delItemName_EL = document.querySelector('#delete-message'),
  search_EL = document.querySelector('#search');

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
  static addBook(book) {
    const newBook_EL = document.createElement('tr');
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
    library.push(book);
    bookTableBody_EL.appendChild(newBook_EL);
    toastAlert('A new Book has been added', 'success');
  }
  static removeBook(bookIsbn) {
    for (let book of library) {
      if (book.isbn === bookIsbn) {
        library.splice(library.indexOf(book));
        toastAlert('Book has been removed', 'success');
      }
    }
  }
  static editBook(book) {
    // Iterates through all rows if isbn match it edits that row
    document.querySelectorAll('#book-tr').forEach(function (tr) {
      let targetisbn = tr.children[0].innerText;
      if (book.isbn === targetisbn) {
        tr.children[1].textContent = book.title;
        tr.children[2].textContent = book.author;
        toastAlert('Book has been successfully edited', 'success');
      }
    });
  }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Event Listeners
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Add Book
form_EL.addEventListener('submit', function (e) {
  const title = document.querySelector('#book-title').value,
    author = document.querySelector('#book-author').value,
    isbn = document.querySelector('#book-isbn').value,
    book = new Book(title, author, isbn);
  if (book.title === '' || book.isbn === '') {
    toastAlert('Inputs with an asterisk must be filled', 'error');
  } else if (book.isbn.length < 10 || book.isbn.length > 13) {
    toastAlert('ISBN must be between 10 to 13 characters', 'error');
  } else {
    UIBooks.addBook(book);

    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
    document.querySelector('#book-isbn').value = '';
  }
  e.preventDefault();
});
// Open Edit-Modal
bookTableBody_EL.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-edit')) {
    editModal(e, 'book');
  }
  if (e.target.classList.contains('fa-trash')) {
    removeModal(e, 'book');
  }
  if (e.target.classList.contains('fa-copy')) {
    copyToClipboard(e);
  }
});
// Edit Book
modalEditFooter_EL.addEventListener('click', function (e) {
  if (e.target.classList.contains('save')) {
    const title = modalEditInput1_EL.value,
      author = modalEditInput2_EL.value,
      isbn = modalEditInput3_EL.value,
      book = new Book(title, author, isbn);

    UIBooks.editBook(book);
  }
});
// Search Book
search_EL.addEventListener('keyup', function (e) {
  search(e, '#book-tr');
});