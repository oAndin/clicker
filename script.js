
// button reset ammount
const resetBtn = document.getElementById('reset');

function resetAmount() {
  wallet.innerHTML = ("00.00");
  localStorage.setItem('wallet', wallet.innerHTML);
  stockPaper010.style.visibility = 'hidden';
  stockPaper100.style.visibility = 'hidden';
  stockAmount = 0;
  let amountStockPapers = 0;
  showStockAmount.innerHTML = amountStockPapers;
}

resetBtn.addEventListener('click', resetAmount);

// create the variable wallet
let wallet = document.getElementById('wallet');
// give the variable the start amount
wallet.innerHTML = (localStorage.getItem('wallet'));

// variable stock paper
const stockPaper010 = document.getElementById('stockPaper010');

// variable stock amount

let stockAmount = localStorage.getItem('stockAmount');
stockAmount = localStorage.getItem('stockAmount');

// variable showing how much stocks you own


// get html element
let showStockAmount = document.getElementById('showStockAmount');

showStockAmount.innerHTML = parseInt(localStorage.getItem('stockAmount'));
console.log(stockAmount);
// save amount that im supposed to show


// new variable to changes on the wallet 
let updatedWallet;

// get the clicking area
let clickArea = document.getElementById('clickArea')

// create the function and make it work!
function clickAddMoney() {
  let newValue = parseFloat(wallet.innerHTML) + 0.01;
  updatedWallet = newValue;
  wallet.innerHTML = updatedWallet.toFixed(2);
  localStorage.setItem('wallet', wallet.innerHTML);
  if (wallet.innerHTML == 0.10) {
    stockPaper010.style.visibility = 'visible';
  }
  if (wallet.innerHTML == 1.00) {
    stockPaper100.style.visibility = 'visible';
  }
  showStockAmount.innerHTML = parseInt(stockAmount);
}

clickArea.addEventListener('click', clickAddMoney);

// get buy stock button

const buyStockBtn010 = document.getElementById("stockPaper010");
const buyStockBtn100 = document.getElementById("stockPaper100");

// function buy papers 

function buyAndHold010() {
  if (wallet.innerHTML > .09) {
    wallet.innerHTML = (parseFloat(wallet.innerHTML) - 0.10).toFixed(2);
    stockAmount = stockAmount + 1;
    showStockAmount.innerHTML = stockAmount;
    localStorage.setItem('stockAmount', stockAmount);
  }
  else {
    alert("You dont have enough money!")
  }
  console.log(stockAmount);
}
function buyAndHold100() {
  if (wallet.innerHTML > 0.99) {
    wallet.innerHTML = (parseFloat(wallet.innerHTML) - 1.00).toFixed(2);
    stockAmount = stockAmount + 10;
    showStockAmount.innerHTML = stockAmount;
    localStorage.setItem('stockAmount', stockAmount);
  }
  else {
    alert("You dont have enough money!")
  }
  console.log(stockAmount);
}

buyStockBtn010.addEventListener('click', buyAndHold010);
buyStockBtn100.addEventListener('click', buyAndHold100);

// function dividend 

setInterval(() => {
  if (stockAmount > 0) {
    let dividend = stockAmount * 0.01;
    wallet.innerHTML = (parseFloat(wallet.innerHTML) + parseFloat(dividend)).toFixed(2);
    localStorage.setItem('stockAmount', stockAmount)
    console.log(dividend);
  }
}, 10000);  

// const screen = document.getElementById('screen');
// let dividendsAmount;
// let amount = document.getElementById('amount');
// let paper = document.getElementById('paperBuyButton');
// paper = 0;

// var currentAmount = parseFloat(amount.innerHTML);
// amount.innerHTML = "00.00";
// const log = document.getElementById('log')
// log.addEventListener('click', () => console.log(paper), console.log(dividendsAmount));

// screen.addEventListener('click', function handleOnClick() {
//   // let newValue = Number(amount.innerHTML) + 1;
//   let newValue = parseFloat(amount.innerHTML) + 0.01;
//   amount.innerHTML = newValue.toFixed(2);
//   currentAmount = newValue;
//   if (currentAmount === 0.09) {
//     paperBuyButton.style.visibility = "visible";
//   }
// });

// paperBuyButton.addEventListener('click', buyAndHold)

// function buyAndHold() {
//   console.log('Bought');
//   newValue = parseFloat(amount.innerHTML) - 0.10;
//   amount.innerHTML = newValue.toFixed(2);
//   paper++;
//   console.log(paper);
// }

// console.log(paper);
// // if (Number(amount.innerHTML) > Number(".09")) {
// //   paper.style.visibility = "visible";
// // }
// // setInterval(() => {
// //   let newValue = Number(amount.innerHTML) + 0.01;
// //   amount.innerHTML = Number(newValue).toFixed(2);
// //   currentAmount = newValue;
// // }, 1000);
// setInterval(() => {
//   if (paper != 0) {

//     dividendsAmount = parseFloat(paper * 0.01);
//     newValue = newValue + dividendsAmount;
//     amount.innerHTML = newValue.toFixed(2);
//   }
//   // amount.innerHTML = newValue.toFixed(2);
//   console.log(dividendsAmount);
// }, 1000)
