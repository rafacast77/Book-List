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
  }
}
class UIMembers {
  static addMember(member) {
    const memberRow = document.createElement('tr');
    memberRow.id = 'member-tr';
    member.id = create_UUID();
    memberRow.innerHTML = `
    <td>${member.id.toUpperCase()}</td>
    <td>${member.name}</td>
    <td>${member.phone}</td>
    <td class="member-address"><i
      class="required fas fa-info-circle fa-lg hover-grow tooltip tooltip--bottom-left"
      data-tooltip="${member.address}"
    ></i>
  </td>
    <td class="td-icon">
      <a
        href="#modal-edit"
        class="fas fa-edit fa-lg hover-grow"
      ></a>
      <a
        href="#modal-warning"
        class="fas fa-trash fa-lg hover-grow"
      ></a>
    </td>
    `;
    memberTbody_EL.appendChild(memberRow);
    toastAlert('New member successfully added', 'success')
  }
  static editMember(member) {
    // Iterates through all rows if ISBM match it edits that row
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
  static removeMember(member) {
    // Iterates through all rows if Member ID match it deletes that row
    document.querySelectorAll('#member-tr').forEach(function (tr) {
      let targetID = tr.children[0].innerText;
      if (member.id === targetID) {
        tr.remove();
        toastAlert('Member successfully removed', 'success');
      }
    });
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

  e.preventDefault;
});
// Delete Member
memberTbody_EL.addEventListener('click', function (e) {
  removeRow(e, 'member-tr');
});
// Open Edit-Modal
memberTbody_EL.addEventListener('click', function (e) {
  editRow(e, 'member-tr');
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
