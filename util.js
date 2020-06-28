/** @format */

const card = document.querySelector('.card'),
  tab_EL = document.querySelector('.tab-container'),
  tabs_ELs = document.querySelectorAll('[data-tabs-target]'),
  tabContent_ELs = document.querySelectorAll('[data-tab-content');

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
    target.className ='active';
  });
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
