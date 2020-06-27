/** @format */
////////////////////////////////////////////////////////////////////////////////
// BOOKS TAB UI element variable declaration, identification, initialization
////////////////////////////////////////////////////////////////////////////////
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const tab_EL = document.querySelector('.tab-container'),
  tab_li_ELS = document.querySelector('.tab-container').firstElementChild
    .children,
  form_EL = document.querySelector('#book-form'),
  bookTableBody_EL = document.querySelector('#book-tbody'),
  edit_body = document.querySelector('#edit-body'),
  bookEditTitle_EL = document.querySelector('#book-edit-title'),
  bookEditAuthor_EL = document.querySelector('#book-edit-author'),
  bookEditIsbm_EL = document.querySelector('#book-edit-isbm'),
  bookEditFormEL = document.querySelector('.modal-footer'),
  search_EL = document.querySelector('#search-book');
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
  static addBookToList(book) {
    const newBook_EL = document.createElement('tr');
    newBook_EL.id = 'body-tr';
    newBook_EL.innerHTML = `
    <td>${book.isbm}</td>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td class="td-icons"><a  
          href="#modal-id"
          class="fas fa-edit fa-lg hover-grow"
          style="cursor: pointer;"
          ></a>
        <i 
          class="fas fa-trash fa-lg hover-grow"
          style="color: red; cursor: pointer;"
        ></i>
    </td>
    `;
    bookTableBody_EL.appendChild(newBook_EL);
  }
  static removeBook(book) {
    // Iterates through all rows if ISBM match it edits that row
    document.querySelectorAll('#body-tr').forEach(function (tr) {
      let targetISBM = tr.children[0].innerText;
      if (book.isbm === targetISBM) {
        tr.remove();
      }
    });
  }
  static editBook(book) {
    // Iterates through all rows if ISBM match it edits that row
    document.querySelectorAll('#body-tr').forEach(function (tr) {
      let targetISBM = tr.children[0].innerText;
      if (book.isbm === targetISBM) {
        tr.children[1].textContent = book.title;
        tr.children[2].textContent = book.author;
      }
    });
  }
  static searchBook(e) {
    const searchText = e.target.value.toLowerCase();
    // Iterates through each tr element in the table body
    document.querySelectorAll('#body-tr').forEach(function (tr) {
      let tdList = tr.children;
      // Iterates through each td element in the tr element and test for match
      for (let td of tdList) {
        let tdText = td.textContent;
        if (tdText.toLowerCase().indexOf(searchText) != -1) {
          tr.style.visibility = 'visible';
          tr.lastElementChild.style.visibility = 'visible';
          break;
        } else {
          /* TODO find why there is a delay on disappearing the icons cell when collapsing the entire row, it has been temporary fixed by collapsing the element individually/first.*/
          tr.lastElementChild.style.visibility = 'collapse';
          tr.style.visibility = 'collapse';
        }
      }
    });
  }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Event Listeners
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
tab_EL.addEventListener('click', function (e) {
  for (var x of tab_li_ELS) {
    x.className = '';
  }
  e.target.parentElement.className = 'selected';
});
// Add Book
form_EL.addEventListener('submit', function (e) {
  const title = document.querySelector('#book-title').value,
    author = document.querySelector('#book-author').value,
    isbm = document.querySelector('#book-isbm').value,
    book = new Book(title, author, isbm);

  UIBooks.addBookToList(book);

  document.querySelector('#book-title').value = '';
  document.querySelector('#book-author').value = '';
  document.querySelector('#book-isbm').value = '';

  e.preventDefault();
});
// Open Edit-Form
bookTableBody_EL.addEventListener('click', function (e) {
  // loads the edit-form with current values
  if (e.target.classList.contains('fa-edit')) {
    bookEditIsbm_EL.value =
      e.target.parentElement.parentElement.children[0].innerText;
    bookEditTitle_EL.value =
      e.target.parentElement.parentElement.children[1].innerText;
    bookEditAuthor_EL.value =
      e.target.parentElement.parentElement.children[2].innerText;
  }
});
// Edit Book
bookEditFormEL.addEventListener('click', function (e) {
  if (e.target.classList.contains('save')) {
    const title = document.querySelector('#book-edit-title').value,
      author = document.querySelector('#book-edit-author').value,
      isbm = document.querySelector('#book-edit-isbm').value,
      book = new Book(title, author, isbm);

    UIBooks.editBook(book);
  }
});
// Delete Book
bookTableBody_EL.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-trash')) {
    let isbm = e.target.parentElement.parentElement.children[0].innerText;
    // We only want isbm # to find the row to be eliminated
    book = new Book(null, null, isbm);
    UIBooks.removeBook(book);
  }
});
search_EL.addEventListener('keyup', UIBooks.searchBook);

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
