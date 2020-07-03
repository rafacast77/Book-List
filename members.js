/** @format */

////////////////////////////////////////////////////////////////////////////////
// MEMBERS TAB
////////////////////////////////////////////////////////////////////////////////
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Books-Tab UI element variable declaration, identification, initialization
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const memberForm_EL = document.querySelector('#members-form'),
  memberName_EL = document.querySelector('#member-name'),
  memberPhone_EL = document.querySelector('#members-phone'),
  memberAddress_EL = document.querySelector('#members-address'),
  memberSearch_EL = document.querySelector('#member-search'),
  memberTbody_EL = document.querySelector('#members-tbody');
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Objects and Functions
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
  static addMember(member) {
    const memberRow = document.createElement('tr');
    memberRow.id = 'member-tr';
    member.id = create_UUID();
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
    members.push(member);
    console.log(members)

    toastAlert('New member has been added', 'success')
  }
  static editMember(member) {
    // Iterates through all rows if isbn match it edits that row
    document.querySelectorAll('#member-tr').forEach(function (tr) {
      let targetID = tr.children[0].innerText;
      if (member.id === targetID) {
        tr.children[1].textContent = member.name;
        tr.children[2].textContent = member.phone;
        tr.children[3].firstChild.dataset.tooltip = member.address;
        toastAlert('Member successfully edited', 'success');
      }
    });
  }
  static removeMember(memberIDToRemove) {
    for(let member of members) {
      if (member.id === memberIDToRemove) {
        members.splice(members.indexOf(member));
        toastAlert('Member has been removed', 'success');
      }
    }
  }
  static requiredMissing(member) {
    if (member.name === '' || member.phone === '' || member.address === '') {
      return true;
    }
  }
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Book-Tab Event Listeners
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Add Member
memberForm_EL.addEventListener('submit', function (e) {
  const name = memberName_EL.value,
    phone = memberPhone_EL.value,
    address = memberAddress_EL.value,
    member = new Member(null, name, phone, address);
    if(UIMembers.requiredMissing(member)){
      toastAlert('All member fields must be completed', 'error')
    } else{
      UIMembers.addMember(member);
    
      memberName_EL.value = '';
      memberPhone_EL.value = '';
      memberAddress_EL.value = '';
    }

  e.preventDefault();
});
// 
memberTbody_EL.addEventListener('click', function (e) {
  if (e.target.classList.contains('fa-edit')) {
    editModal(e, 'member');
  }
  if (e.target.classList.contains('fa-trash')) {
    removeModal(e, 'member');
  }
  if(e.target.classList.contains('fa-copy')){
    copyToClipboard(e);
  }
});
// Edit Member
modalEditFooter_EL.addEventListener('click', function(e){
  const modalEditInput4_EL = document.querySelector('#modal-edit-input4');
  if (e.target.classList.contains('save')) {
    const name = modalEditInput1_EL.value,
      phone = modalEditInput2_EL.value,
      id = modalEditInput3_EL.value,
      address = modalEditInput4_EL.value,
      member = new Member(id, name, phone, address);
    UIMembers.editMember(member);
  } 
  modalEditInput4_EL.parentElement.remove();
})
// Search Member
memberSearch_EL.addEventListener('keyup', function(e){
  search(e, '#member-tr');
});
