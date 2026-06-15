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

const form = document.querySelector('.form');
const logic = ({ delay, status }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status.includes('fulfilled')) {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
};
const handleForm = e => {
  e.preventDefault();
  const data = new FormData(e.target);
  const objectData = {
    delay: data.get('delay'),
    status: data.get('state'),
  };
  console.log(objectData);
  logic(objectData)
    .then(data =>
      iziToast.success({
        message: data,
      })
    )
    .catch(error =>
      iziToast.error({
        message: error,
      })
    );
    e.target.reset();
};
form.addEventListener('submit', handleForm);
