// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/themes/dark.css';

import Notify from 'simple-notify';
import 'simple-notify/dist/simple-notify.css';

const errorNotify = () => {
  new Notify({
    status: 'error',
    text: `Please choose a date in the future!`,
    effect: 'fade',
    speed: 300,
  });
};
const successNotify = time => {
  new Notify({
    status: 'success',
    text: `Time ${time}`,
    effect: 'fade',
    speed: 300,
  });
};
const button = document.querySelector('[data-start]');
button.disabled = true;

const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = new Date(selectedDates[0]).getTime();
    const dateNow = Date.now();
    if (dateNow > userSelectedDate) {
      errorNotify(userSelectedDate);
      button.disabled = true;
    } else {
      button.disabled = false;
      successNotify(userSelectedDate);
    }
  },
};
function convertMs(ms) {
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
}
function addLeadingZero(value) {
  return value.padStart(2, '0');
}
const handleClick = () => {
  const intervalArr = [];
  const intervalId = setInterval(() => {
    const dateNow = Date.now();
    const result = convertMs(userSelectedDate - dateNow);
    console.log(result);
    daysData.textContent = `${result.days}`;
    hoursData.textContent = addLeadingZero(String(result.hours));
    minutesData.textContent = addLeadingZero(String(result.minutes));
    secondsData.textContent = addLeadingZero(String(result.seconds));
  }, 1000);
  intervalArr.push(intervalId);
  if (intervalArr.length > 1) {
    intervalArr.shift();
  }
};
flatpickr('input[type=text]', options);
button.addEventListener('click', handleClick);
