
// button reset ammount
const resetBtn = document.getElementById('reset');

function startSimu() {
  wallet.innerHTML = ("00.00");
  localStorage.setItem('wallet', wallet.innerHTML);
  stockPaper010.style.visibility = 'hidden';
  stockPaper100.style.visibility = 'hidden';
  stockAmount = 0;
  localStorage.clear();
  let amountStockPapers = 0;
  showStockAmount.innerHTML = amountStockPapers;
}

function resetAmount() {
  startSimu()
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

// function to check if i can buy the papers

function checkStockBtnVisi() {
  if (wallet.innerHTML == 0.10) {
    stockPaper010.style.visibility = 'visible';
  }
  if (wallet.innerHTML == 1.00) {
    stockPaper100.style.visibility = 'visible';
  }
}

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
  showStockAmount.innerHTML = parseInt(stockAmount);
  checkStockBtnVisi();
}

clickArea.addEventListener('click', clickAddMoney);

// get buy stock button

const buyStockBtn010 = document.getElementById("stockPaper010");

// function buy papers 

const quantityBtn = document.getElementById('quantityBtn');

function handleBuyButton() {
  console.log("Clickei handleBuy");
}

quantityBtn.addEventListener('click', handleBuyButton);

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

buyStockBtn010.addEventListener('click', buyAndHold010);

// function dividend 

setInterval(() => {
  if (stockAmount > 0) {
    let dividend = stockAmount * 0.01;
    wallet.innerHTML = (parseFloat(wallet.innerHTML) + parseFloat(dividend)).toFixed(2);
    localStorage.setItem('stockAmount', stockAmount)
    checkStockBtnVisi()
    console.log(dividend);
  }
}, 10000);

startSimu();