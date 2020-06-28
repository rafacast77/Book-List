/** @format */

const card = document.querySelector('.card'),
  tab_EL = document.querySelector('.tab-container'),
  tab_li_ELS = document.querySelector('#tab-ul').children;

tab_EL.addEventListener('click', function (e) {
  for (var x of tab_li_ELS) {
    x.className = '';
  }
  e.target.parentElement.className = 'selected';
});

function toastAlert(message, state) {
  const alertDiv = document.createElement('div'),
    alertMessage = document.createElement('p');
  alertDiv.className = `toast u-center toast--${state}`;
  alertMessage.textContent = message;
  alertDiv.appendChild(alertMessage);
  card.insertBefore(alertDiv, bookContainer_EL);

  console.log(alertDiv);
  setTimeout(function () {
    alertDiv.remove();
  }, 2500);
}
