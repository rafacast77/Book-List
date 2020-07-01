/** @format */

////////////////////////////////////////////////////////////////////////////////
// BOOKINGS TAB
////////////////////////////////////////////////////////////////////////////////
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Books-Tab UI element variable declaration, identification, initialization
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const bookingMID_EL = document.querySelector('#booking-member-id'),
  bookingISBM_EL = document.querySelector('#booking-isbm'),
  bookingForm_EL = document.querySelector('#booking-form'),
  bookingTBody_EL = document.querySelector('#booking-tbody'),
  bookingSearch_EL = document.querySelector('#booking-search');

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
    const bookingRow = document.createElement('tr');
    bookingRow.id = 'booking-tr';
    bookingRow.innerHTML = `
    <td 
      id="id-td">
      <div class="tag tooltip tooltip--bottom-right tag-info hover-grow" data-tooltip="${booking.member.id}">ID</div>
    </td>
    <td id="name-td">${booking.member.name}</td>
    <td id="booking-isbm-th">
      <div class="tag tag-info hover-grow tooltip tooltip--bottom-right" data-tooltip="${booking.book.isbm}">ISBM</div>
    </td>
    <td id="booking-tittle-td">${booking.book.title}</td>
    <td id="return-state-td">
      <div class="tag tag--success hover-grow">On Time</div>
    </td>
    <td id="return-btn-td">
      <button class="btn btn-return u-no-margin btn-small">Return</button>
    </td>
    `;
    bookingTBody_EL.appendChild(bookingRow);
  }
  removeBooking(member, book) {
    //TODO
  }
  // Checks if member exists in storage and if it has reach it's booking limits
  static checkMemberForBooking(memberID, membersList) {
    for (let member of membersList) {
      member.id = member.id.toUpperCase();
      if (member.id === memberID) {
        member.bookingLimit++;
        if (member.bookingLimit <= 3) {
          return member;
        } else {
          console.log('This member has reach booking limit');
          member.bookingLimit--;
        }
        break;
      } else {
        console.log('member does not exist');
      }
    }
    return false;
  }
  //Checks if book exists in storage and if it has reach it's booking limits
  static checkBookForBooking(bookISBM, booksList) {
    for (let book of booksList) {
      if (book.isbm === bookISBM) {
        book.booked = true;
        return book;
      } else {
        console.log('book does not exist');
        return false;
      }
    }
  }

}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Event Listeners
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
bookingForm_EL.addEventListener('submit', function (e) {
  let bookingMID = 'LIB20-829-955', //bookingMID_EL.value,
    bookingISBM = '978-0-141-18957-4'; //bookingISBM_EL.value;
  const bookingMember = UIBooking.checkMemberForBooking(bookingMID, members),
    bookingBook = UIBooking.checkBookForBooking(bookingISBM, library);
    if (bookingMember !== false || bookingBook !== false) {
      let returnBookDate = setReturnTime();
      const booking = new Booking(bookingMember, bookingBook, returnBookDate)
      UIBooking.addBooking(booking);
    }

  e.preventDefault();
});
