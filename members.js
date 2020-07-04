/** @format */
////////////////////////////////////////////////////////////////////////////////
// Member-tab UI element declaration, identification, initialization
////////////////////////////////////////////////////////////////////////////////
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const memberForm_EL = document.querySelector('#members-form'),
  memberName_EL = document.querySelector('#member-name'),
  memberPhone_EL = document.querySelector('#members-phone'),
  memberAddress_EL = document.querySelector('#members-address'),
  memberSearch_EL = document.querySelector('#member-search'),
  memberTbody_EL = document.querySelector('#members-tbody');
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Member-Tab Objects and Functions
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class Member {
  constructor(id, name, phone, address) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.bookingLimit = 0;
  }
}
class UIMembers {
  static addMember(name, phone, address) {
    // Creates new member UI-row and object
    const memberRow = document.createElement('tr'),
      member = new Member(create_UUID(), name, phone, address);
    memberRow.id = 'member-tr';
    memberRow.innerHTML = `
    <td><span class="far fa-copy hover-grow tooltip tooltip--bottom-right" data-tooltip="Copy ID"></span>${member.id}</td>
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
    // Adds new member to UI-row
    memberTbody_EL.appendChild(memberRow);
    // Adds new member to dataset
    membersDataset.push(member);
    toastAlert('New member has been added', 'success');
  }

  static removeMember(memberIDToRemove, e) {
    // Removes member's UI-row
    e.target.parentElement.parentElement.parentElement.remove();
    // Removes member from dataset
    let member = returnObjWithId(memberIDToRemove, 'member');
    membersDataset.splice(membersDataset.indexOf(member), 1);
    toastAlert('Member has been removed', 'success');
  }

  static editMember(id, name, phone, address) {
    // Edits member UI-row
    document.querySelectorAll('#member-tr').forEach(function (tr) {
      let targetID = tr.children[0].innerText;
      if (id === targetID) {
        tr.children[1].textContent = name;
        tr.children[2].textContent = phone;
        tr.children[3].firstChild.dataset.tooltip = address;
        toastAlert('Member successfully edited', 'success');
      }
    });
    // Edit member in dataset
    let memberToEdit = returnObjWithId(id, 'member');
    memberToEdit.name = name;
    memberToEdit.phone = phone;
    memberToEdit.address = address;
  }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Member-Tab Event Listeners
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Add Member
memberForm_EL.addEventListener('submit', function (e) {
  let name = memberName_EL.value,
    phone = memberPhone_EL.value,
    address = memberAddress_EL.value;

  // User Input Validation
  if (name !== '' || phone !== '' || address !== '') {
    UIMembers.addMember(name, phone, address);

    memberName_EL.value = '';
    memberPhone_EL.value = '';
    memberAddress_EL.value = '';
  } else {
    toastAlert('All member fields must be completed', 'error');
  }
  e.preventDefault();
});

// Listener for member table body
memberTbody_EL.addEventListener('click', function (e) {
  //Edit Member
  if (e.target.classList.contains('fa-edit')) {
    // Triggers member edit modal
    editModal(e, 'member');
    // Edit
    modalEditFooter_EL.addEventListener('click', function edit(e2) {
      if (e2.target.classList.contains('save')) {
        const name = modalEditInput1_EL.value,
          phone = modalEditInput2_EL.value,
          id = modalEditInput3_EL.value,
          modalEditInput4_EL = document.querySelector('#modal-edit-input4'),
          address = modalEditInput4_EL.value;

        UIMembers.editMember(id, name, phone, address);
        modalEditFooter_EL.removeEventListener('click', edit);
        modalEditInput4_EL.parentElement.remove();
      }
    });
  }
  // Triggers member delete modal
  if (e.target.classList.contains('fa-trash')) {
    removeModal(e, 'member');
  }
  // Copy member ID to clipboard
  if (e.target.classList.contains('fa-copy')) {
    copyToClipboard(e);
  }
});

// Search Member
memberSearch_EL.addEventListener('keyup', function (e) {
  search(e, '#member-tr');
});
