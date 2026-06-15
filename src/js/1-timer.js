// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/themes/dark.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
iziToast.settings({
  theme: 'light', // dark
  position: 'topRight',
  timeout: 5000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});
// import Notify from 'simple-notify';
// import 'simple-notify/dist/simple-notify.css';

// const errorNotify = () => {
//   new Notify({
//     status: 'error',
//     text: `Please choose a date in the future!`,
//     effect: 'fade',
//     speed: 300,
//   });
// };
// const successNotify = time => {
//   new Notify({
//     status: 'success',
//     text: `Time ${time}`,
//     effect: 'fade',
//     speed: 300,
//   });
// };
const button = document.querySelector('[data-start]');
button.disabled = true;
const input = document.querySelector('#datetime-picker');

const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let currentIntervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const userDate = selectedDates[0].getTime();

    if (userDate <= Date.now()) {
      iziToast.info({
        title: 'Error',
        message: 'Please choose a date in the future',
      });

      button.disabled = true;
      userSelectedDate = null;
      return;
    }
    userSelectedDate = userDate;
    button.disabled = false;

    iziToast.success({
      title: 'OK',
      message: 'Date selected successfully',
    });
  },
};
const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const updateTime = () => {
  const dateNow = Date.now();
  const difference = userSelectedDate - dateNow;
  if (difference <= 0) {
    clearInterval(currentIntervalId);
    input.disabled = false;
    return;
  }
  const result = convertMs(difference);
  daysData.textContent = addLeadingZero(String(result.days));
  hoursData.textContent = addLeadingZero(String(result.hours));
  minutesData.textContent = addLeadingZero(String(result.minutes));
  secondsData.textContent = addLeadingZero(String(result.seconds));
};
const addLeadingZero = value => {
  return value.padStart(2, '0');
};
const handleClick = () => {
  input.disabled = true;
  button.disabled = true
  if (currentIntervalId) {
    clearInterval(currentIntervalId);
  }
  currentIntervalId = setInterval(updateTime, 1000);
};
flatpickr('input[type=text]', options);
button.addEventListener('click', handleClick);
