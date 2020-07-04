/** @format */
// Adds Dummy Information for testing
////////////////////////////////////////////////////////////////////////////////
// Other UI element declaration, identification, initialization
////////////////////////////////////////////////////////////////////////////////
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const card = document.querySelector('.card'),
  tabContent_EL = document.querySelector('.tab-content'),
  tab_EL = document.querySelector('.tab-container'),
  tabs_ELs = document.querySelectorAll('[data-tabs-target]'),
  tabContent_ELs = document.querySelectorAll('[data-tab-content'),
  modalLabel1_EL = document.querySelector('#modal-edit-label1'),
  modalLabel2_EL = document.querySelector('#modal-edit-label2'),
  modalLabel3_EL = document.querySelector('#modal-edit-label3'),
  modalEditInput1_EL = document.querySelector('#modal-edit-input1'),
  modalEditInput2_EL = document.querySelector('#modal-edit-input2'),
  modalEditInput3_EL = document.querySelector('#modal-edit-input3'),
  deleteWarning_EL = document.querySelector('#modal-warning'),
  delItemName_EL = document.querySelector('#delete-message'),
  body_EL = document.body,
  modalEditForm_EL = document.querySelector('#modal-edit-form');
let bookDataset = [],
  membersDataset = [],
  bookingDataset = [];

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Loads the app with dummy examples from database
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
document.addEventListener('DOMContentLoaded', addDummyInfo());

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Other functions Multi-functions and reusable components
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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
  card.insertBefore(alertDiv, tabContent_EL);

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
  uuid = uuid.toUpperCase();
  return uuid;
}
// Returns a member or book or booking based on ID and type
function returnObjWithId(objectID, objType) {
  if (objType === 'book') {
    for (let book of bookDataset) {
      if (objectID === book.isbn) {
        return book;
      }
    }
  }
  if (objType === 'member') {
    for (let member of membersDataset) {
      if (objectID === member.id) {
        return member;
      }
    }
  }
  if (objType === 'booking') {
    for (let booking of bookingDataset) {
      if (
        objectID.member.id === booking.member.id &&
        objectID.book.isbn === booking.book.isbn
      ) {
        return booking;
      }
    }
  }
  return false;
}
// Custom Modal-Remove for either or book and members
function removeModal(e, itemType) {
  let itemName =
    e.target.parentElement.parentElement.parentElement.children[1].textContent;
  delItemName_EL.textContent = `${itemName} ?`;
  deleteWarning_EL.addEventListener('click', function deleteTrue(e2) {
    if (e2.target.classList.contains('delete')) {
      let id =
        e.target.parentElement.parentElement.parentElement.children[0]
          .textContent;
      // We only want IDs # to find the row to be eliminated
      if (itemType === 'book') {
        UIBooks.removeBook(id, e);
      }
      if (itemType === 'member') {
        UIMembers.removeMember(id, e);
      }
      deleteWarning_EL.removeEventListener('click', deleteTrue);
    }
  });
}
// Custom Modal-Edit for either or book and members
function editModal(e, itemType) {
  modalEditInput3_EL.value =
    e.target.parentElement.parentElement.parentElement.children[0].innerText;
  modalEditInput1_EL.value =
    e.target.parentElement.parentElement.parentElement.children[1].innerText;
  modalEditInput2_EL.value =
    e.target.parentElement.parentElement.parentElement.children[2].innerText;
  if (itemType === 'member') {
    modalLabel1_EL.textContent = 'Name:';
    modalLabel2_EL.textContent = 'Phone:';
    modalLabel3_EL.textContent = 'Member ID:';
    modalEditForm_EL.insertAdjacentHTML(
      'beforeend',
      `
      <div class="form-section">
        <label class="font-normal" >Address:</label>
        <input class="input-small" type="name" id="modal-edit-input4" value="${e.target.parentElement.parentElement.parentElement.children[3].firstChild.dataset.tooltip}"/>
      </div>
      `
    );
  } else if (itemType === 'book') {
    modalLabel1_EL.textContent = 'Book tittle:';
    modalLabel2_EL.textContent = 'Book Author:';
    modalLabel3_EL.textContent = 'Book ISBN:';
  }
}
// copy to clipboard
function copyToClipboard(e) {
  const copyText_EL = document.createElement('textarea');
  copyText_EL.value = e.target.parentElement.textContent;
  document.body.appendChild(copyText_EL);
  /* Select the text field */
  copyText_EL.select();
  copyText_EL.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand('copy');
  document.body.removeChild(copyText_EL);
}
// Loads Info from database
function addDummyInfo() {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Adds dummy members to table on init
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
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

  bookDataset = [
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
  // Same add method without but without alert
  function addBookStart(book) {
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
    bookTableBody_EL.appendChild(newBook_EL);
  }
  bookDataset.forEach((book) => {
    addBookStart(book);
  });
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Adds dummy members to table on init
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const member1 = new Member(
      'LIB20-829-955',
      'Jamie Muir',
      '070-3162-8890',
      'SALFORD  62 Wade Lane M5 7BH'
    ),
    member2 = new Member(
      'LIB20-F97-47E',
      'Rafael Castillo',
      '075-7201-8284',
      'Aberdeen  19 Morningside Grove AB10 7DJ'
    ),
    member3 = new Member(
      'LIB20-F32-9C2',
      'Niccolò Costanzo',
      '+39 340 718 4153',
      'LONDON  90 Guild Street EC4V 1XP'
    ),
    member4 = new Member(
      'LIB20-992-7CC',
      'Lily Z Bryant',
      '078-4486-4763',
      'GLASGOW  72 Nith Street G2 5UY'
    ),
    member5 = new Member(
      'LIB20-0AC-54C',
      '	Taylor Dennis',
      '070-7356-6001',
      'EDINBURGH  92 Park Row EH8 7JR'
    ),
    member6 = new Member(
      'LIB20-48A-CB3',
      'Francesco Gruosso',
      '077-7198-1330',
      'MANCHESTER  22 Cunnery Rd M60 3WG'
    ),
    member7 = new Member(
      'LIB20-5CB-f7D',
      'Elizabeth Hale',
      '079-8401-3433',
      'LIVERPOOL 47 Overton Circle L3 3ZB'
    );
    member1.bookingLimit = '2';
    member6.bookingLimit = '1';
    book1.booked = true;
    book7.booked = true;
    book8.booked = true;
  membersDataset = [
    member1,
    member2,
    member3,
    member4,
    member5,
    member6,
    member7,
  ];
  // Same add method without but without alert
  function addMemberStart(member) {
    const memberRow = document.createElement('tr');
    memberRow.id = 'member-tr';
    memberRow.innerHTML = `
    <td><span class="far fa-copy hover-grow tooltip tooltip--bottom-right" data-tooltip="Copy ID"></span>${member.id.toUpperCase()}</td>
    <td>${member.name}</td>
    <td>${member.phone}</td>
    <td class="member-address"><i
      class="required fas fa-info-circle fa-lg hover-grow tooltip tooltip--bottom-left"
      data-tooltip="${member.address}"
    ></i>
    </td>
    <td class="member-options-td">
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
    memberTbody_EL.appendChild(memberRow);
  }
  membersDataset.forEach((member) => {
    addMemberStart(member);
  });
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Adds dummy members to table on init
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  const booking1 = new Booking(member1, book1, new Date(1593893066813)),
    booking2 = new Booking(member1, book8, new Date(new Date().getTime() + 30)),
    booking3 = new Booking(member6, book7, new Date(1593893066813));

  bookingDataset = [booking1, booking2, booking3];
  function loadingBookingsFromDB(booking) {
    // Checks if booking is late
    let returnTagColor = 'tag--success',
      returnLabel = 'On Time';
    if (booking.bookingTimeLeft < new Date().getTime()) {
      returnTagColor = 'tag--danger';
      returnLabel = 'Delayed';
    }
    // Return date text for UI
    returnDate = new Date(booking.bookingTimeLeft)
      .toString()
      .split(' ')
      .splice(0, 4);

    // Creates new booking UI-row and object
    const bookingRow = document.createElement('tr');

    bookingRow.id = 'booking-tr';
    bookingRow.innerHTML = `
    <td id="id-td"><div class="tag tooltip tooltip--bottom-right tag-info hover-grow" data-tooltip="${booking.member.id}">ID</div>
    </td>
    <td id="name-td">${booking.member.name}</td>
    <td id="booking-isbn-th"><div class="tag tag-info hover-grow tooltip tooltip--bottom-right" data-tooltip="${booking.book.isbn}">ISBN</div>
    </td>
    <td id="booking-tittle-td">${booking.book.title}</td>
    <td id="return-state-td">
      <div class="tag ${returnTagColor} hover-grow tooltip tooltip--bottom-left" data-tooltip="${returnDate}">${returnLabel}</div>
    </td>
    <td id="return-btn-td">
      <a href="#top">
      <button class="btn btn-return u-no-margin btn-small">Return</button>
      </a>
    </td>
    `;
    // Adds new member to UI-row
    bookingTBody_EL.appendChild(bookingRow);
  }
  bookingDataset.forEach((booking) => {
    loadingBookingsFromDB(booking);
  });

 
}
