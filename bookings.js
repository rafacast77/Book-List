/** @format */

////////////////////////////////////////////////////////////////////////////////
// BOOKINGS TAB
////////////////////////////////////////////////////////////////////////////////
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Books-Tab UI element variable declaration, identification, initialization
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const bookingMID_EL = document.querySelector('#booking-member-id'),
  bookingisbn_EL = document.querySelector('#booking-isbn'),
  bookingForm_EL = document.querySelector('#booking-form'),
  bookingTBody_EL = document.querySelector('#booking-tbody'),
  bookingSearch_EL = document.querySelector('#booking-search'),
  returnBtn_EL = document.querySelector('#return-btn-td');

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
  static addBooking(booking) {
    // Creates return date text for UI
    const returnDate = new Date(setReturnTime())
        .toString()
        .split(' ')
        .splice(0, 4),
      // Adds Tr to Tbody
      bookingRow = document.createElement('tr');
    bookingRow.id = 'booking-tr';
    bookingRow.innerHTML = `
    <td id="id-td"><div class="tag tooltip tooltip--bottom-right tag-info hover-grow" data-tooltip="${booking.member.id}">ID</div>
    </td>
    <td id="name-td">${booking.member.name}</td>
    <td id="booking-isbn-th"><div class="tag tag-info hover-grow tooltip tooltip--bottom-right" data-tooltip="${booking.book.isbn}">ISBN</div>
    </td>
    <td id="booking-tittle-td">${booking.book.title}</td>
    <td id="return-state-td">
      <div class="tag tag--success hover-grow tooltip tooltip--bottom-left" data-tooltip="${returnDate}">On Time</div>
    </td>
    <td id="return-btn-td">
      <a href="#top">
      <button class="btn btn-return u-no-margin btn-small">Return</button>
      </a>
    </td>
    `;
    bookingTBody_EL.appendChild(bookingRow);
    toastAlert('Booking has been successful', 'success');
  }
  static removeBooking(memberID, bookISBN) {
    let book = returnObjWithId(bookISBN, 'book'),
      member = returnObjWithId(memberID, 'member');
    book.booked = false;
    member.bookingLimit--;
    toastAlert('Book successfully returned', 'success');
  }
  static bookingCheckout(book, member) {
    if (member !== false) {
      if (member.bookingLimit < 3) {
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
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Event Listeners
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
bookingForm_EL.addEventListener('submit', function (e) {
  if (bookingisbn_EL.value !== '' && bookingMID_EL.value !== '') {
    let book = returnObjWithId(bookingisbn_EL.value, 'book'),
      member = returnObjWithId(bookingMID_EL.value, 'member');

    if (UIBooking.bookingCheckout(book, member)) {
      let returnBookDate = setReturnTime(),
        booking = new Booking(member, book, returnBookDate);
      UIBooking.addBooking(booking);
      bookingMID_EL.value = '';
      bookingisbn_EL.value = '';
    }
  } else {
    toastAlert('All field inputs must be filled', 'error');
  }

  e.preventDefault();
});

bookingTBody_EL.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-return')) {
    console.log(e.target.parentElement.parentElement.parentElement.children[2]
      .firstChild.dataset.tooltip)
    const memberID =
        e.target.parentElement.parentElement.parentElement.children[0]
          .firstChild.dataset.tooltip,
      bookToReturn =
        e.target.parentElement.parentElement.parentElement.children[2]
          .firstChild.dataset.tooltip;
    UIBooking.removeBooking(memberID, bookToReturn);
    e.target.parentElement.parentElement.parentElement.remove();
  }
});
// Search Booking
bookingSearch_EL.addEventListener('keyup', function (e) {
  search(e, '#booking-tr');
});
