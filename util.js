/** @format */

const card = document.querySelector('.card'),
  tab_EL = document.querySelector('.tab-container'),
  tabs_ELs = document.querySelectorAll('[data-tabs-target]'),
  tabContent_ELs = document.querySelectorAll('[data-tab-content');

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
  var uuid = 'LIB-xxx-xxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

function removeRow(e, bodyTr) {
  let itemName = e.target.parentElement.parentElement.children[1].textContent;
  delItemName_EL.textContent = `${itemName} ?`;
  if (e.target.classList.contains('fa-trash')) {
    deleteWarning_EL.addEventListener('click', function deleteTrue(e2) {
      if (e2.target.classList.contains('delete')) {
        let itemId = e.target.parentElement.parentElement.children[0].innerText;
        if (bodyTr === 'book-tr') {
          // We only want isbm # to find the row to be eliminated
          book = new Book(null, null, itemId);
          UIBooks.removeBook(book);
        } else if (bodyTr === 'member-tr') {
          const member = new Member(itemId, null, null, null);
          UIMembers.removeMember(member);
        } else {
          //TODO
        }
        deleteWarning_EL.removeEventListener('click', deleteTrue);
      }
    });
  }
}
