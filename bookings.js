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
    // Creates return date text for tooltip
    let returnDate = booking.bookingTimeLeft;
    returnDate = new Date(returnDate);
    returnDate = returnDate.toString();
    returnDate = returnDate.split(' ');
    returnDate = returnDate.splice(0, 4);
    // Adds Tr to Tbody
    const bookingRow = document.createElement('tr');
    bookingRow.id = 'booking-tr';
    bookingRow.innerHTML = `
    <td id="id-td"><div class="tag tooltip tooltip--bottom-right tag-info hover-grow" data-tooltip="${booking.member.id}">ID</div>
    </td>
    <td id="name-td">${booking.member.name}</td>
    <td id="booking-isbm-th"><div class="tag tag-info hover-grow tooltip tooltip--bottom-right" data-tooltip="${booking.book.isbm}">ISBM</div>
    </td>
    <td id="booking-tittle-td">${booking.book.title}</td>
    <td id="return-state-td">
      <div class="tag tag--success hover-grow tooltip tooltip--bottom-left" data-tooltip="${returnDate}">On Time</div>
    </td>
    <td id="return-btn-td">
      <button class="btn btn-return u-no-margin btn-small">Return</button>
    </td>
    `;
    bookingTBody_EL.appendChild(bookingRow);
  }
  static removeBooking(memberID, bookISBN) {
    // Iterates through all rows if Member ID match it deletes that row
    document.querySelectorAll('#booking-tr').forEach(function (tr) {
      let targetID = tr.children[0].firstChild.dataset.tooltip,
        targetisbm = tr.children[2].firstChild.dataset.tooltip;
      if (memberID === targetID && bookISBN === targetisbm) {
        tr.remove();
        if (!UIBooking.checkBookDatabase(bookISBN, library, 'return')) {
          toastAlert('Book does not exist', 'error');
        }
      }
    });
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
          toastAlert('This member has reached booking limit', 'error');
          member.bookingLimit--;
          break;
        }
      }
    }
    return false;
  }
  //Checks if book exists in storage and if it has reach it's booking limits
  static checkBookDatabase(bookISBM, booksList, forBooking) {
    for (let book of booksList) {
      if (bookISBM === book.isbm) {
        if (forBooking === 'booking') {
          if (!book.booked) {
            book.booked = true;
            console.log(book);
            return book;
          } else {
            toastAlert('Book is already rented', 'error');
          }
        } else {
          book.booked = false;
           
          console.log(book);
          return book;
        }
      }
    }
    return false;
  }
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Event Listeners
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
bookingForm_EL.addEventListener('submit', function (e) {
  let bookingMID = bookingMID_EL.value,
    bookingISBM = bookingISBM_EL.value;

  const bookingMember = UIBooking.checkMemberForBooking(bookingMID, members);
  if (bookingMember !== false) {
    const bookingBook = UIBooking.checkBookDatabase(bookingISBM, library, 'booking');
    if (bookingBook !== false) {
      let returnBookDate = setReturnTime();
      const booking = new Booking(bookingMember, bookingBook, returnBookDate);

      UIBooking.addBooking(booking);
    } else {
      toastAlert('Book not found', 'error');
    }
  } else {
    toastAlert('Member not found', 'error');
  }

  bookingMID_EL.value = '';
  bookingISBM_EL.value = '';
  e.preventDefault();
});

bookingTBody_EL.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-return')) {
    const memberID =
        e.target.parentElement.parentElement.children[0].firstChild.dataset
          .tooltip,
      bookToReturn =
        e.target.parentElement.parentElement.children[2].firstChild.dataset
          .tooltip;
    UIBooking.removeBooking(memberID, bookToReturn);
  }
});
