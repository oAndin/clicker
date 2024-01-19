// const toastNotification = document.getElementById('toastNotification');

// export default function toastNotification(text, type, time) {
//   console.log("Apertei o botão");
//   switch (type) {
//     case 'sucess':
//       toastNotification.innerHTML = `${text}`;
//       toastNotification.style.backgroundcolor = 'green';
//       setTimeout(() => {
//         toastNotification.style.visibility = 0;
//       }, time)
//       break;
//     case 'alert':
//       toastNotification.innerHTML = `${text}`;
//       toastNotification.style.backgroundcolor = 'yellow';
//       break;
//     case 'error':
//       toastNotification.innerHTML = `${text}`;
//       toastNotification.style.backgroundcolor = 'red';
//       break;
//     default:
//       break
//   }
// }

export function toastNotification() {
  console.log('Toast!');
}