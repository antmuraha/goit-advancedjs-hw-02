import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import { addLeadingZero } from './utils';
import convertMs from './convertMs';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
};

const inputEl = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

iziToast.settings({ position: 'topRight' });

function showError() {
  iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
  });
}

function initializeTimer() {
  startBtnEl.disabled = true;
  let selectedDate = 0;

  flatpickr(inputEl, {
    ...options,
    onClose(selectedDates) {
      const data = selectedDates[0].getTime();
      const currentDate = Date.now();

      if (data < currentDate) {
        startBtnEl.disabled = true;
        showError();
        return;
      }

      if (selectedDate === data) {
        return;
      }

      startBtnEl.disabled = false;
      selectedDate = data;
      clearTimer();
    },
  });

  startBtnEl.addEventListener('click', () => {
    if (selectedDate < Date.now()) {
      startBtnEl.disabled = true;
      showError();
      return;
    }

    startTimer();
  });

  let timerId = null;

  function startTimer() {
    startBtnEl.disabled = true;
    inputEl.disabled = true;
    timerId = setInterval(() => {
      const currentDate = Date.now();
      const deltaTime = selectedDate - currentDate;

      if (deltaTime <= 0) {
        clearInterval(timerId);
        inputEl.disabled = false;
        return;
      }

      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      updateTimerDisplay({ days, hours, minutes, seconds });
    }, 1000);
  }

  function updateTimerDisplay({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }

  function clearTimer() {
    clearInterval(timerId);
    startBtnEl.disabled = false;
    updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  }
}

// For auto-check
// export default initializeTimer;
initializeTimer();
