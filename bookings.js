/** @format */
////////////////////////////////////////////////////////////////////////////////
// Booking-Tab UI element declaration, identification, initialization
////////////////////////////////////////////////////////////////////////////////
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const bookingForm_EL = document.querySelector('#booking-form'),
  bookingMID_EL = document.querySelector('#booking-member-id'),
  bookingisbn_EL = document.querySelector('#booking-isbn'),
  bookingSearch_EL = document.querySelector('#booking-search'),
  bookingTBody_EL = document.querySelector('#booking-tbody');
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Objects and Functions
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class Booking {
  constructor(member, book, bookingTimeLeft) {
    this.member = member;
    this.book = book;
    this.bookingTimeLeft = bookingTimeLeft;
  }
}
class UIBooking {
  static addBooking(member, book, returnDate) {
    // Creates new booking UI-row and object
    const bookingRow = document.createElement('tr');
    // Return date text for UI
    returnDate = new Date(returnDate).toString().split(' ').splice(0, 4);

    bookingRow.id = 'booking-tr';
    bookingRow.innerHTML = `
    <td id="id-td"><div class="tag tooltip tooltip--bottom-right tag-info hover-grow" data-tooltip="${member.id}">ID</div>
    </td>
    <td id="name-td">${member.name}</td>
    <td id="booking-isbn-th"><div class="tag tag-info hover-grow tooltip tooltip--bottom-right" data-tooltip="${book.isbn}">ISBN</div>
    </td>
    <td id="booking-tittle-td">${book.title}</td>
    <td id="return-state-td">
      <div class="tag ${returnTagColor} hover-grow tooltip tooltip--bottom-left" data-tooltip="${returnDate}">${returnLabel}/div>
    </td>
    <td id="return-btn-td">
      <a href="#top">
      <button class="btn btn-return u-no-margin btn-small">Return</button>
      </a>
    </td>
    `;
    // Adds new member to UI-row
    bookingTBody_EL.appendChild(bookingRow);
    // Adds new member to dataset
    const booking = new Booking(member, book, returnDate);
    bookingDataset.push(booking);
    toastAlert('Booking has been successful', 'success');
  }
  static removeBooking(e, memberID, bookISBN) {
    // Removes member's UI-row
    e.target.parentElement.parentElement.parentElement.remove();

    let book = returnObjWithId(bookISBN, 'book'),
      member = returnObjWithId(memberID, 'member'),
      booking = new Booking(member, book, null),
      bookingToRemove = returnObjWithId(booking, 'booking');

    member.bookingLimit--;
    book.booked = false;
    bookingDataset.splice(bookingDataset.indexOf(bookingToRemove), 1);
    toastAlert('Book successfully returned', 'success');
  }
  static bookingCheckout(book, member) {
    if (member !== false) {
      if (member.bookingLimit < 2) {
        if (book !== false) {
          if (book.booked !== true) {
            book.booked = true;
            member.bookingLimit++;
            return true;
          } else {
            toastAlert('Book is already rented', 'error');
          }
        } else {
          toastAlert('Book not found', 'error');
        }
      } else {
        toastAlert('This member has reached booking limit', 'error');
      }
    } else {
      toastAlert('Member not found', 'error');
    }
    return false;
  }
  static setReturnTime() {
    const dateReturned = new Date(),
      bookingDays = 7;
    return dateReturned.setDate(dateReturned.getDate() + bookingDays);
  }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Event Listeners
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Add a booking
bookingForm_EL.addEventListener('submit', function (e) {
  // User Input Validation
  if (bookingisbn_EL.value !== '' && bookingMID_EL.value !== '') {
    let book = returnObjWithId(bookingisbn_EL.value, 'book'),
      member = returnObjWithId(bookingMID_EL.value, 'member');

    // Checks if member and book exist and are able to book
    if (UIBooking.bookingCheckout(book, member)) {
      let returnBookDate = UIBooking.setReturnTime();

      UIBooking.addBooking(member, book, returnBookDate);

      bookingMID_EL.value = '';
      bookingisbn_EL.value = '';
    }
  } else {
    toastAlert('All field inputs must be filled', 'error');
  }

  e.preventDefault();
});
// Return booking
bookingTBody_EL.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-return')) {
    const memberID =
        e.target.parentElement.parentElement.parentElement.children[0]
          .firstChild.dataset.tooltip,
      bookISBN =
        e.target.parentElement.parentElement.parentElement.children[2]
          .firstChild.dataset.tooltip;
    UIBooking.removeBooking(e, memberID, bookISBN);
  }
});
// Search Booking
bookingSearch_EL.addEventListener('keyup', function (e) {
  search(e, '#booking-tr');
});
