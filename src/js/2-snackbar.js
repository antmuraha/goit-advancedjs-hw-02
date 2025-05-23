import iziToast from 'izitoast';

iziToast.settings({
  position: 'topRight',
  timeout: 2000,
  close: false,
  progressBar: false,
  transitionIn: 'bounceInUp',
  transitionOut: 'fadeOutDown',
});

const colorMap = {
  success: '#4caf50',
  error: '#f44336',
};
const iconMap = {
  success: 'fas fa-check',
  error: 'fas fa-times',
};

function showSnackbar(message, type = 'success') {
  iziToast[type]({
    message: message,
    icon: iconMap[type] || 'fas fa-info',
    iconColor: colorMap[type] || '#ddd',
    progressBarColor: colorMap[type] || '#ddd',
  });
}

const toastMap = {
  fulfilled: delay =>
    new Promise(resolve =>
      setTimeout(() => {
        showSnackbar(`Fulfilled promise in ${delay}ms`);
        resolve(delay);
      }, delay)
    ),
  rejected: delay =>
    new Promise((_, reject) =>
      setTimeout(() => {
        showSnackbar(`Rejected promise in ${delay}ms`, 'error');
        reject(delay);
      }, delay)
    ),
};

function initializeSnackbar() {
  const formElement = document.querySelector('.form');

  formElement?.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(formElement);
    const data = Object.fromEntries(formData.entries());
    console.log('Form data:', data);

    toastMap[data.state](data.delay);
  });
}

initializeSnackbar();
