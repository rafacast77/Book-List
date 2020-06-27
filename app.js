/** @format */
////////////////////////////////////////////////////////////////////////////////
//  UI element variable declaration, identification, initialization
////////////////////////////////////////////////////////////////////////////////
const tab_EL = document.querySelector('.tab-container'),
  tab_li_ELS = document.querySelector('.tab-container').firstElementChild
    .children,
  form_EL = document.querySelector('.form'),
  bookTableBody_EL = document.querySelector('#table-body'),
  edit_body = document.querySelector('#edit-body'),
  bookEditTitle_EL = document.querySelector('#book-edit-title'),
  bookEditAuthor_EL = document.querySelector('#book-edit-author'),
  bookEditIsbm_EL = document.querySelector('#book-edit-isbm'),
  bookEditFormEL = document.querySelector('.modal-footer'),
  search_EL = document.querySelector('#search-book');

////////////////////////////////////////////////////////////////////////////////
// Objects and Functions of Books tab
////////////////////////////////////////////////////////////////////////////////
class Book {
  constructor(title, author, isbm) {
    this.title = title;
    this.author = author;
    this.isbm = isbm;
  }
}
class UIBooks {
  addBookToList(book) {
    const newBook_EL = document.createElement('tr');
    newBook_EL.id = 'body-tr';
    newBook_EL.innerHTML = `
    <td class="td-book-info">${book.isbm}</td>
    <td class="td-book-info">${book.title}</td>
    <td class="td-book-info">${book.author}</td>
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
  static removeBook(e) {
    if (e.target.classList.contains('fa-trash')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  static editBook(e) {
    // loads the edit form with current values
    if (e.target.classList.contains('fa-edit')) {
      bookEditAuthor_EL.value =
        e.target.parentElement.parentElement.children[2].innerText;
      bookEditIsbm_EL.value =
        e.target.parentElement.parentElement.children[0].innerText;
      bookEditTitle_EL.value =
        e.target.parentElement.parentElement.children[1].innerText;
      // If save, it replaces old values for the new
      bookEditFormEL.addEventListener('click', function saveEdit(e2) {
        if (e2.target.classList.contains('save')) {
          e.target.parentElement.parentElement.children[0].innerText =
            bookEditIsbm_EL.value;
          e.target.parentElement.parentElement.children[1].innerText =
            bookEditTitle_EL.value;
          e.target.parentElement.parentElement.children[2].innerText =
            bookEditAuthor_EL.value;
          bookEditFormEL.removeEventListener('click', saveEdit);
        }
      });
    }
  }
  static searchBook(e) {
    const text = e.target.value.toLowerCase();
    // Iterates through each tr element in the table body
    document.querySelectorAll('#body-tr').forEach(function (tr) {
      let tdList = tr.children;
      // Iterates through each td from the tr element and test for string match
      for (let td of tdList) {
        item = td.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
          tr.style.visibility = 'visible';
          tr.lastElementChild.style.visibility = 'visible';
          break;
        } else {
          /* TODO The icon element has a delay when collapsing the row, it has been temporary fixed by collapsing it individually/first.*/
          tr.lastElementChild.style.visibility = 'collapse';
          tr.style.visibility = 'collapse';
        }
      }
    });
  }
}
////////////////////////////////////////////////////////////////////////////////
// Event Listener
////////////////////////////////////////////////////////////////////////////////
tab_EL.addEventListener('click', function (e) {
  for (var x of tab_li_ELS) {
    x.className = '';
  }
  e.target.parentElement.className = 'selected';
});

form_EL.addEventListener('submit', function (e) {
  const title = document.querySelector('#book-title').value,
    author = document.querySelector('#book-author').value,
    isbm = document.querySelector('#book-isbm').value,
    book = new Book(title, author, isbm),
    uiBooks = new UIBooks();

  uiBooks.addBookToList(book);

  document.querySelector('#book-title').value = '';
  document.querySelector('#book-author').value = '';
  document.querySelector('#book-isbm').value = '';

  e.preventDefault();
});

bookTableBody_EL.addEventListener('click', UIBooks.removeBook);
bookTableBody_EL.addEventListener('click', UIBooks.editBook);
search_EL.addEventListener('keyup', search);
////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////
