/** @format */

const card = document.querySelector('.card'),
  tab_EL = document.querySelector('.tab-container'),
  tabs_ELs = document.querySelectorAll('[data-tabs-target]'),
  tabContent_ELs = document.querySelectorAll('[data-tab-content'),
  modalLabel1_EL = document.querySelector('#modal-edit-label1'),
  modalLabel2_EL = document.querySelector('#modal-edit-label2'),
  modalLabel3_EL = document.querySelector('#modal-edit-label3'),
  modalEditInput1_EL = document.querySelector('#modal-edit-input1'),
  modalEditInput2_EL = document.querySelector('#modal-edit-input2'),
  modalEditInput3_EL = document.querySelector('#modal-edit-input3'),
  modalEditForm_EL = document.querySelector('#modal-edit-form');

  document.addEventListener('DOMContentLoaded', addDummyInfo());
// Tab navigation
tabs_ELs.forEach((tab) => {
  tab.addEventListener('click', function (e) {
    // Re-selects new tab
    tabs_ELs.forEach((tabEl) => {
      tabEl.className = '';
    });
    e.target.parentElement.className = 'selected';
    //Re-selects new content
    tabContent_ELs.forEach((tabTarget) => {
      tabTarget.classList.remove('active');
    });
    const target = document.querySelector(tab.dataset.tabsTarget);
    target.className = 'active';
  });
});
// Alerts
function toastAlert(message, state) {
  const alertDiv = document.createElement('div'),
    alertMessage = document.createElement('p');
  alertDiv.className = `toast u-center toast--${state}`;
  alertMessage.textContent = message;
  alertDiv.appendChild(alertMessage);
  card.insertBefore(alertDiv, bookContainer_EL);

  setTimeout(function () {
    alertDiv.remove();
  }, 2500);
}
// Search function
function search(e, bodyTr) {
  const searchText = e.target.value.toLowerCase();
  // Iterates through each tr element in the table body
  document.querySelectorAll(bodyTr).forEach(function (tr) {
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
// Creates a random ID
function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'LIB20-xxx-xxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });

  return uuid;
}

// Modal-Remove
function removeRow(e, bodyTr) {
  if (e.target.classList.contains('fa-trash')) {
    let itemName = e.target.parentElement.parentElement.children[1].textContent;
    delItemName_EL.textContent = `${itemName} ?`;
    deleteWarning_EL.addEventListener('click', function deleteTrue(e2) {
      if (e2.target.classList.contains('delete')) {
        let id = e.target.parentElement.parentElement.children[0].textContent;
        // We only want IDs # to find the row to be eliminated
        if (bodyTr === 'book-tr') {
          book = new Book(null, null, id);
          UIBooks.removeBook(book);
        } else if (bodyTr === 'member-tr') {
          const member = new Member(id, null, null, null);
          UIMembers.removeMember(member);
        } else {
          //TODO
        }
        deleteWarning_EL.removeEventListener('click', deleteTrue);
      }
    });
  }
}
// Modal-Edit
function editRow(e, bodyTr) {
  if (e.target.classList.contains('fa-edit')) {
    modalEditInput3_EL.value =
      e.target.parentElement.parentElement.children[0].innerText;
    modalEditInput1_EL.value =
      e.target.parentElement.parentElement.children[1].innerText;
    modalEditInput2_EL.value =
      e.target.parentElement.parentElement.children[2].innerText;
    if (bodyTr === 'member-tr') {
      modalLabel1_EL.textContent = 'Name:';
      modalLabel2_EL.textContent = 'Phone:';
      modalLabel3_EL.textContent = 'Member ID:';
      modalEditForm_EL.insertAdjacentHTML(
        'beforeend',
        `
      <div class="form-section">
        <label class="font-normal" >Address:</label>
        <input class="input-small" type="name" id="modal-edit-input4" value="${e.target.parentElement.parentElement.children[3].firstChild.dataset.tooltip}"/>
      </div>
      `
      );
    } else if (bodyTr === 'book-tr') {
      modalLabel1_EL.textContent = 'Book tittle:';
      modalLabel2_EL.textContent = 'Book Author:';
      modalLabel3_EL.textContent = 'Book ISBM:';
    }
  }
}

// Adds Dummy Information for testing
function addDummyInfo() {
    member1 = new Member(
      'LIB20-829-955',
      'Jamie Muir',
      '070-3162-8890',
      'SALFORD  62 Wade Lane M5 7BH'
    ),
    member2 = new Member(
      'LIB20-f97-47e',
      'Rafael Castillo',
      '075-7201-8284',
      'Aberdeen  19 Morningside Grove AB10 7DJ'
    ),
    member3 = new Member(
      'LIB20-f32-9c2',
      '	Natasha Alexander',
      '078-7360-4056',
      'LONDON  90 Guild Street EC4V 1XP'
    ),
    member4 = new Member(
      'LIB20-992-7cc',
      'Lily Z Bryant',
      '078-4486-4763',
      'GLASGOW  72 Nith Street G2 5UY'
    ),
    member5 = new Member(
      'LIB20-0ac-54c',
      '	Taylor Dennis',
      '070-7356-6001',
      'EDINBURGH  92 Park Row EH8 7JR'
    ),
    member6 = new Member(
      'LIB20-48a-cb3',
      'Francesco Gruosso',
      '077-7198-1330',
      'MANCHESTER  22 Cunnery Rd M60 3WG'
    ),
    member7 = new Member(
      'LIB20-5cb-f7d',
      'Elizabeth Hale',
      '079-8401-3433',
      'LIVERPOOL 47 Overton Circle L3 3ZB'
    );
  const book1 = new Book('Siddhartha', 'Hermann Hesse', '978-0-141-18957-4'),
    book2 = new Book('Inner Engineering', 'Sadhguru', '978-0-143-42884-8'),
    book3 = new Book("Can't Hurt Me", 'David Goggins', '978-1-544-50785-9'),
    book4 = new Book(
      'The Celestine Prophecy',
      'James Redfield',
      '978-0-553-40902-4'
    ),
    book5 = new Book(
      '12 Rules for Life',
      'Jordan B. Peterson',
      '978-0-141-98851-1'
    ),
    book6 = new Book(
      'Manual Of The Warrior Of Light',
      'Paulo Coelho',
      '978-0-00-715632-0'
    ),
    book7 = new Book(
      'How to Think Like a Programmer for Problem Solving',
      'Paul Vickers',
      '978-1-844-80900-4'
    ),
    book8 = new Book(
      'The Four Agreements: Practical Guide to Personal Freedom',
      'Don Miguel Ruiz',
      '978-1-878424-31-0'
    ),
    book9 = new Book(
      'Nineteen Eighty-Four 1984',
      'George Orwell',
      '978-0-141-18776-1'
    ),
    book10 = new Book('The Alchemist', 'Paulo Coelho', '978-0-7225-3293-5'),
    book11 = new Book('Brave New World', 'Aldous Huxley', '978-0-099-51847-1');

  const library = [
      book1,
      book2,
      book3,
      book4,
      book5,
      book6,
      book7,
      book8,
      book9,
      book10,
      book11,
    ];
    members = [
      member1,
      member2,
      member3,
      member4,
      member5,
      member6,
      member7
    ];
    library.forEach(book =>{
      UIBooks.addBook(book);
    })
    members.forEach(member =>{
      UIMembers.addMember(member);
    })

}
