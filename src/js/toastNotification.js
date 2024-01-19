export function toastNotification(element, text, type, time) {
  console.log("Apertei o botão");
  switch (type) {
    case 'sucess':
      element.innerHTML = `${text}`;
      element.style.backgroundColor = 'green';
      element.style.color = '#fff';
      element.style.animation = `popUp ${time}s ease-in-out`;
      break;
    case 'alert':
      element.innerHTML = `${text}`;
      element.style.color = '#000';
      element.style.animation = `popUp ${time} ease-in-out`;
      element.style.backgroundColor = 'yellow';
      setTimeout(() => {
        element.style.opacity = 0;
      }, time)
      break;
    case 'error':
      element.innerHTML = `${text}`;
      element.style.backgroundColor = 'red';
      setTimeout(() => {
        element.style.opacity = 0;
      }, time)
      break;
    default:
      break
  }
}