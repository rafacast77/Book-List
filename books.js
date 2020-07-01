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
  constructor(title, author, isbm) {
    this.title = title;
    this.author = author;
    this.isbm = isbm;
  }
}
class UIBooks {
  static addBook(book) {
    const newBook_EL = document.createElement('tr');
    newBook_EL.id = 'book-tr';
    newBook_EL.innerHTML = `
    <td>${book.isbm}</td>
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
    bookTableBody_EL.appendChild(newBook_EL);
    //toastAlert('A new Book has been added', 'success');
  }
  static requiredMissing(book) {
    if (book.title === '' || book.isbm === '') {
      return true;
    }
  }
  static invalidISBM(book) {
    if (book.isbm.length < 10 || book.isbm.length > 13) {
      return true;
    }
  }
  static removeBook(book) {
    // Iterates through all rows if ISBM match it edits that row
    document.querySelectorAll('#book-tr').forEach(function (tr) {
      let targetISBM = tr.children[0].innerText;
      console.log(targetISBM);
      if (book.isbm === targetISBM) {
        tr.remove();
        toastAlert('Book has been removed', 'success');
      }
    });
  }
  static editBook(book) {
    // Iterates through all rows if ISBM match it edits that row
    document.querySelectorAll('#book-tr').forEach(function (tr) {
      let targetISBM = tr.children[0].innerText;
      if (book.isbm === targetISBM) {
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
    isbm = document.querySelector('#book-isbm').value,
    book = new Book(title, author, isbm);
  if (UIBooks.requiredMissing(book)) {
    toastAlert('Missing title information or ISBM', 'error');
  } else if (UIBooks.invalidISBM(book)) {
    toastAlert('ISBM must be between 10 to 13 characters', 'error');
  } else {
    UIBooks.addBook(book);

    document.querySelector('#book-title').value = '';
    document.querySelector('#book-author').value = '';
    document.querySelector('#book-isbm').value = '';
  }
  e.preventDefault();
});
// Open Edit-Modal
bookTableBody_EL.addEventListener('click', function (e) {
  editRow(e, 'book-tr');
});
// Edit Book
modalEditFooter_EL.addEventListener('click', function (e) {
  if (e.target.classList.contains('save')) {
    const title = modalEditInput1_EL.value,
      author = modalEditInput2_EL.value,
      isbm = modalEditInput3_EL.value,
      book = new Book(title, author, isbm);

    UIBooks.editBook(book);
  }
});
// Delete Book
bookTableBody_EL.addEventListener('click', function (e) {
  removeRow(e, 'book-tr');
});
// Search Book
search_EL.addEventListener('keyup', function (e) {
  search(e, '#book-tr');
});

////////////////////////////////////////////////////////////////////////////////
// MEMBERS TAB
////////////////////////////////////////////////////////////////////////////////
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Books-Tab UI element variable declaration, identification, initialization
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Objects and Functions
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Event Listeners
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

////////////////////////////////////////////////////////////////////////////////
// BOOKINGS TAB
////////////////////////////////////////////////////////////////////////////////
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Books-Tab UI element variable declaration, identification, initialization
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Objects and Functions
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Event Listeners
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
