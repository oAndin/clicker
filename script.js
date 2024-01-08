console.log("Hello World!");
const screen = document.getElementById('screen');
let dividendsAmount;
let amount = document.getElementById('amount');
let paper = document.getElementById('paperBuyButton');
paper = 0;

var currentAmount = parseFloat(amount.innerHTML);
amount.innerHTML = "00.00";
const log = document.getElementById('log')
log.addEventListener('click', () => console.log(paper), console.log(dividendsAmount));

screen.addEventListener('click', function handleOnClick() {
  // let newValue = Number(amount.innerHTML) + 1;
  let newValue = parseFloat(amount.innerHTML) + 0.01;
  amount.innerHTML = newValue.toFixed(2);
  currentAmount = newValue;
  if (currentAmount === 0.09) {
    paperBuyButton.style.visibility = "visible";
  }
});

paperBuyButton.addEventListener('click', buyAndHold)

function buyAndHold() {
  console.log('Bought');
  newValue = parseFloat(amount.innerHTML) - 0.10;
  amount.innerHTML = newValue.toFixed(2);
  paper++;
  console.log(paper);
}

console.log(paper);
// if (Number(amount.innerHTML) > Number(".09")) {
//   paper.style.visibility = "visible";
// }
// setInterval(() => {
//   let newValue = Number(amount.innerHTML) + 0.01;
//   amount.innerHTML = Number(newValue).toFixed(2);
//   currentAmount = newValue;
// }, 1000);
setInterval(() => {
  if (paper != 0) {

    dividendsAmount = parseFloat(paper * 0.01);
    newValue = newValue + dividendsAmount;
    amount.innerHTML = newValue.toFixed(2);
  }
  // amount.innerHTML = newValue.toFixed(2);
  console.log(dividendsAmount);
}, 1000)
