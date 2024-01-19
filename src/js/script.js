// salary variable to change game mode

import { toastNotification } from "./toastNotification";

let salary = 1;

// total stats 

const totalSalary = document.getElementById('totalSalary');
const totalDividends = document.getElementById('totalDividends');
const showAmountInTotal = document.getElementById('amountInTotal');

let totalClickPayment = parseFloat(localStorage.getItem('totalClickPayment')) || 0;
let totalDividendsStats = parseFloat(localStorage.getItem('totalDividendsStorage')) || 0;
let amountTotal = parseFloat(localStorage.getItem('totalAmountStorage')) || 0;

function updateLocalStorage(key, value) {
  value = parseFloat(value).toFixed(2);
  localStorage.setItem(key, value);
}

function updateUI(element, value) {
  element.innerHTML = `$ ${value.toFixed(2)}`;
}

function totalClickPaymentFunction() {
  if (gameStatus) {
    totalClickPayment += parseFloat(salary);
  }
  updateLocalStorage('totalClickPayment', totalClickPayment);
  updateUI(totalSalary, totalClickPayment);
}

function totalDividendsPaymentFunction() {
  updateLocalStorage('totalDividendsStorage', totalDividendsStats);
  updateUI(totalDividends, totalDividendsStats);
}

function totalAmountFunction() {
  amountTotal = totalDividendsStats + totalClickPayment;
  updateLocalStorage('totalAmountStorage', amountTotal);
  updateUI(showAmountInTotal, amountTotal);
}

// Wallet control

const gameWallet = document.getElementById("walletInGame");
let simulationMoney = localStorage.getItem('money') ? localStorage.getItem('money') : 0.00;
let workedCount = localStorage.getItem('workedCount') ? localStorage.getItem('workedCount') : 0;
gameWallet.innerHTML = parseFloat(simulationMoney).toFixed(2);
const workArea = document.getElementById('clickArea');

const showMonthSalary = document.getElementById('showMonthSalary');
let monthSalary = 0.00;
showMonthSalary.innerHTML = monthSalary.toFixed(2);

// work control

function workFunction() {
  if (gameStatus === false) {
    confirm("You can't work when the game isn't running, start game?")
      ?
      handleGameStatus()
      :
      ''
  } else {
    workedCount = parseFloat(workedCount + salary);
    monthSalary = workedCount;
    showMonthSalary.innerHTML = monthSalary;
    amountTotal = parseFloat(parseFloat(totalClickPayment) + parseFloat(totalDividendsStats));
    if (gameStatus == true) {
      totalClickPaymentFunction();
      totalAmountFunction();
    }
  };
}

function paymentFunction() {
  let payment = 0;
  console.log("antes:", simulationMoney);
  simulationMoney = parseFloat(simulationMoney + workedCount).toFixed(2);
  console.log("depois:", simulationMoney);
  payment = (parseFloat(simulationMoney)).toFixed(2);
  gameWallet.innerHTML = parseFloat(parseFloat(gameWallet.innerHTML) + (parseFloat(payment))).toFixed(2);
  simulationMoney = 0;
  workedCount = 0;
  payment = 0;
  showMonthSalary.innerHTML = 0;
}

workArea.addEventListener('click', workFunction);

// Stock control

const showStockQuantity = document.getElementById("showStockAmount");
let simulationStockQuantity = localStorage.getItem('simuStocks') ? localStorage.getItem('simuStocks') : 0;
showStockQuantity.innerHTML = "Stocks:" + parseInt(simulationStockQuantity);

// stock button swtich 

const stockQuantity = document.getElementById('quantityBtn');

let quantity = [1, 10, 100, 1000];
let currentIndexOf = 0;
let price = "$ 1.00";

function handleQuantity() {
  currentIndexOf = currentIndexOf + 1;
  if (currentIndexOf == quantity.length) {
    currentIndexOf = 0;
  }
  stockQuantity.innerHTML = `Stock quantity: ${quantity[currentIndexOf]}`;
  switch (currentIndexOf) {
    case 0:
      price = "$ 1.00";
      break;
    case 1:
      price = "$ 10.00";
      break;
    case 2:
      price = "$ 100.00";
      break;
    case 3:
      price = "$ 1000.00";
      break;
    default:
      console.log("?");
      break;
  }
  buyStockBtn.innerHTML = `Buy ${quantity[currentIndexOf]} for ${price}`;
}
stockQuantity.innerHTML = `Stock quantity: ${quantity[currentIndexOf]}`
stockQuantity.addEventListener('click', handleQuantity);

const buyStockBtn = document.getElementById("buyStockBtn");
buyStockBtn.innerHTML = `Buy ${quantity[currentIndexOf]} for ${price}`;
buyStockBtn.addEventListener('click', buyStocks)
const stockPrice = 1;

function buyStocks() {
  // check if user has enough money
  switch (currentIndexOf) {
    case 0:
      if (parseFloat(gameWallet.innerHTML) > 0.99) {
        simulationStockQuantity = (parseInt(simulationStockQuantity) + 1);
        showStockQuantity.innerHTML = "Stocks:" + parseInt(simulationStockQuantity);
        gameWallet.innerHTML = (parseFloat(gameWallet.innerHTML - 1)).toFixed(2);
        console.log("comprou", 1);
      }
      else {
        alert("You don't have enough money!")
      }
      break;
    case 1:
      if (parseFloat(gameWallet.innerHTML) > 9.99) {
        simulationStockQuantity = (parseInt(simulationStockQuantity) + 10);
        showStockQuantity.innerHTML = "Stocks:" + parseInt(simulationStockQuantity);
        gameWallet.innerHTML = (parseFloat(gameWallet.innerHTML - 10)).toFixed(2);
        console.log("comprou", 10);
      }
      else {
        alert("You don't have enough money!")
      }
      break;
    case 2:
      if (parseFloat(gameWallet.innerHTML) > 99.99) {
        simulationStockQuantity = (parseInt(simulationStockQuantity) + 100);
        showStockQuantity.innerHTML = "Stocks:" + parseInt(simulationStockQuantity);
        gameWallet.innerHTML = (parseFloat(gameWallet.innerHTML - 100)).toFixed(2);
        console.log("comprou", 100);
      }
      else {
        alert("You don't have enough money!")
      }
      break;
    case 3:
      if (parseFloat(gameWallet.innerHTML) > 999.99) {
        simulationStockQuantity = (parseInt(simulationStockQuantity) + 1000);
        showStockQuantity.innerHTML = "Stocks:" + parseInt(simulationStockQuantity);
        gameWallet.innerHTML = (parseFloat(gameWallet.innerHTML - 1000)).toFixed(2);
        console.log("comprou", 1000);
      }
      else {
        alert("You don't have enough money!")
      }
      break;
  }
}

// Dividend logic
let dataComCheck = false;
let dataComStockCount = 0;
function dataComFunction() {
  dataComCheck = true;
  dataComStockCount = simulationStockQuantity;
  console.log("data-com:", simulationStockQuantity);
}

function dividendsPaymentFunction() {
  let dividendsPayment = parseInt(dataComStockCount) * 0.01;
  console.log(dividendsPayment);
  // stock count HTML value
  showStockQuantity.innerHTML = "Stocks:" + parseInt(simulationStockQuantity);
  // totalDividendsStats it should be the sum calc of himself (value from before) with the incoming one
  totalDividendsStats = parseFloat(parseFloat(totalDividendsStats) + parseFloat(dividendsPayment));
  // write in HTML the value total dividends stats
  // wallet value might be the problem here
  // ! RIGHT HERE -------------------------------------------------------------------------------------------------------
  gameWallet.innerHTML = parseFloat(parseFloat(gameWallet.innerHTML) + parseFloat(dividendsPayment)).toFixed(2);
  // ! ABOVE
  localStorage.setItem('totalDividendsStorage', totalDividendsStats)
  totalDividendsPaymentFunction();
}

// Game conditional control   

let gameStatus = false;
const gameStatusBtn = document.getElementById('statusBtn');
gameStatusBtn.addEventListener('click', handleGameStatus);
gameStatusBtn.innerHTML = "Start Game";

function handleGameStatus() {
  gameStatus = !gameStatus;
  if (gameStatus === true) {
    gameStatusBtn.innerHTML = "Pause Game";
    console.log(gameStatus);
    timeFunction();
  }
  if (gameStatus === false) {
    gameStatusBtn.innerHTML = "Start Game";
    console.log(gameStatus);
    stopTimeFunction();
  }
};

// Date declaration 

const gameDay = document.getElementById("day");
const gameMonth = document.getElementById("month");
const gameYear = document.getElementById("year");

let simulationDay = localStorage.getItem('day') ? localStorage.getItem('day') : 1;
gameDay.innerHTML = simulationDay;

let simulationMonth = localStorage.getItem('month') ? localStorage.getItem('month') : 1;
gameMonth.innerHTML = simulationMonth;

let simulationYear = localStorage.getItem('year') ? localStorage.getItem('year') : 2024;
gameYear.innerHTML = simulationYear;

// Chckpoint game function

function checkpoint() {
  localStorage.setItem('money', simulationMoney);
  localStorage.setItem('workedCount', workedCount);
  localStorage.setItem('simuStocks', (simulationStockQuantity));
  localStorage.setItem('day', simulationDay);
  localStorage.setItem('month', simulationMonth);
  localStorage.setItem('year', simulationYear);
}

// Clock game running

let timeOnClock = 0;
function timeFunction() {
  intervalGameTimeId = setInterval(() => {
    timeOnClock = timeOnClock + 1;
    simulationDay = parseInt(simulationDay) + 1;
    gameDay.innerHTML = simulationDay;
    checkpoint();
    localStorage.setItem("day", simulationDay)
    localStorage.setItem('money', (parseFloat(gameWallet.innerText)).toFixed(2));
    if (simulationDay == 5) {
      paymentFunction();
    }
    if (simulationDay == 15) {
      if (dataComCheck == true) {
        dividendsPaymentFunction();
        totalDividendsPaymentFunction();
      }
    }
    if (simulationDay == 30) {
      dataComFunction();
    }
    // Month 
    if (simulationDay == 31 && simulationMonth != 12) {
      simulationDay = 1;
      gameDay.innerHTML = simulationDay;
      simulationMonth = parseInt(simulationMonth) + 1;
      gameMonth.innerHTML = simulationMonth;
      localStorage.setItem("month", simulationDay);
    }
    // Year
    if (simulationMonth == 12 && simulationDay == 31) {
      console.log("Happy New Years!");
      simulationDay = 1;
      gameDay.innerHTML = simulationDay;
      simulationMonth = 1;
      gameMonth.innerHTML = simulationMonth;
      simulationYear = parseInt(simulationYear) + 1;
      console.log(simulationMonth);
      gameYear.innerHTML = simulationYear;
      localStorage.setItem("year", simulationYear);
    }
    if (simulationDay > 31) {
      simulationDay = 1;
      gameDay.innerHTML = simulationDay;
    }
  }, 1000)
  localStorage.setItem("day", simulationDay);
}

function stopTimeFunction() {
  clearInterval(intervalGameTimeId);
};
// reset code section
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', reset);


function resetTimeMoney() {
  localStorage.clear();
  simulationDay = 1;
  gameDay.innerHTML = simulationDay;
  simulationMonth = 1;
  gameMonth.innerHTML = simulationMonth;
  simulationYear = 2024;
  gameYear.innerHTML = simulationYear;
  gameStatus = false;
  gameStatusBtn.innerHTML = "Start Game";
  simulationMoney = 0;
  gameWallet.innerHTML = "00.00";
  simulationStockQuantity = 0;
  showStockQuantity.innerHTML = "Stocks:" + simulationStockQuantity;
  workedCount = 0;
  totalClickPayment = 0;
  totalSalary.innerHTML = "$ 0.00";
  totalDividendsStats = 0;
  totalDividends.innerHTML = "$ 0.00";
  showMonthSalary.innerHTML = 0.00;
  monthSalary = 0;
  amountTotal = 0;
  showAmountInTotal.innerHTML = "$ 0.00";

  stopTimeFunction();
}

function reset() {
  confirm("Are you sure you want to reset everything? There is no way back!")
    ?
    resetTimeMoney()
    :
    alert("Nothing changed!");
}

// Show Stats

const showStatsBtn = document.getElementById('showStats');
const showStatsDiv = document.getElementById('gameStatusDiv');

function showStatsFunction() {
  if (showStatsDiv.style.visibility == 'visible') {
    showStatsDiv.style.visibility = 'hidden';
  }
  else {
    showStatsDiv.style.visibility = 'visible'
  }
};

showStatsBtn.addEventListener('click', showStatsFunction);

// Difficulty mode control

const difficultyBtn = document.getElementById("difficulty");

function handleDifficulty() {
  alert('Future feature!');
};

difficultyBtn.addEventListener('click', handleDifficulty);


function loadFunction() {
  totalClickPaymentFunction();
  totalDividendsPaymentFunction();
  totalAmountFunction()
};

window.addEventListener('load', loadFunction);

// ---------------
toastNotification();
// const testButton = document.getElementById('testButton');
// testButton.addEventListener('click', toastNotification)
// // text, type, time
// toastNotification(teste, sucess, 2000);
// text = testButton.innerHTML;
// type = 'sucess';
// time = 2000;
// total amount bug
// local storage year bug