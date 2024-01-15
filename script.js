// Wallet control

const gameWallet = document.getElementById("walletInGame");
let simulationMoney = localStorage.getItem('money') ? localStorage.getItem('money') : 0.00;
let workedCount = 0;
gameWallet.innerHTML = '0.00';
const workArea = document.getElementById('clickArea');

function workFunction() {
  if (gameStatus === false) {
    confirm("You can't work when the game isn't running, start game?")
      ?
      handleGameStatus()
      :
      ''
  } else {
    workedCount = workedCount + 0.01;
    console.log(workedCount);
  };
}

// !

function paymentFunction() {
  // 1 payment : SimulationMoney = 0; WorkedCount = 0.30;
  // 2 payment : SimulationMoney = 0.30; WorkedCount = 0.70;
  // 3 payment : SimulationMoney = 1.00; WorkedCount = 0.70;

  // 1º Get the wallet.innerHTML
  let payment = 0;
  simulationMoney = (parseFloat(gameWallet.innerHTML)).toFixed(2);
  console.log("antes:", simulationMoney);
  simulationMoney = (parseFloat(simulationMoney) + workedCount).toFixed(2);
  console.log("depois:", simulationMoney);
  payment = (parseFloat(simulationMoney)).toFixed(2);
  gameWallet.innerHTML = (parseFloat(payment)).toFixed(2);
  simulationMoney = 0;
  workedCount = 0;
  payment = 0;
}

workArea.addEventListener('click', workFunction);

// Stock control

const showStockQuantity = document.getElementById("showStockAmount");
let simulationStockQuantity = 0;
showStockQuantity.innerHTML = `Stocks: ${simulationStockQuantity}`;

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
        simulationStockQuantity = simulationStockQuantity + 1;
        showStockQuantity.innerHTML = `Stocks: ${simulationStockQuantity}`;
        gameWallet.innerHTML = (parseFloat(gameWallet.innerHTML - 1)).toFixed(2);
        console.log("comprou", 1);
      }
      else {
        alert("You don't have enough money!")
      }
      break;
    case 1:
      if (parseFloat(gameWallet.innerHTML) > 9.99) {
        simulationStockQuantity = simulationStockQuantity + 10;
        showStockQuantity.innerHTML = `Stocks: ${simulationStockQuantity}`;
        gameWallet.innerHTML = (parseFloat(gameWallet.innerHTML - 10)).toFixed(2);
        console.log("comprou", 10);
      }
      else {
        alert("You don't have enough money!")
      }
      break;
    case 2:
      if (parseFloat(gameWallet.innerHTML) > 99.99) {
        simulationStockQuantity = simulationStockQuantity + 100;
        showStockQuantity.innerHTML = `Stocks: ${simulationStockQuantity}`;
        gameWallet.innerHTML = (parseFloat(gameWallet.innerHTML - 100)).toFixed(2);
        console.log("comprou", 100);
      }
      else {
        alert("You don't have enough money!")
      }
      break;
    case 3:
      if (parseFloat(gameWallet.innerHTML) > 999.99) {
        simulationStockQuantity = simulationStockQuantity + 1000;
        showStockQuantity.innerHTML = `Stocks: ${simulationStockQuantity}`;
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

// how many stock you have will be save on this variable to be used day 30
let stockCount = 0;

function dataComFunction() {
  stockCount = simulationStockQuantity;
  console.log(stockCount);
  // console.log("stock count:", stockCount);
}

function dividendsPaymentFunction() {
  let dividendsPayment = stockCount * 0.01;
  console.log(dividendsPayment);
  gameWallet.innerHTML = parseFloat(parseFloat(gameWallet.innerHTML) + parseFloat(dividendsPayment)).toFixed(2);
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

// Clock game running

let timeOnClock = 0;
function timeFunction() {
  intervalGameTimeId = setInterval(() => {
    // console.log(timeOnClock);
    timeOnClock = timeOnClock + 1;
    simulationDay = parseInt(simulationDay) + 1;
    gameDay.innerHTML = simulationDay;
    localStorage.setItem("day", simulationDay)
    if (simulationDay == 4) {
      paymentFunction();
    }
    if (simulationDay == 15) {
      if (simulationStockQuantity != 0) {
        console.log("O pix dos dividendos!");
        dividendsPaymentFunction();
      }
    }
    if (simulationDay == 30) {
      console.log("Data-com");
      dataComFunction();
    }
    // Month 
    if (simulationDay == 31) {
      simulationDay = 1;
      gameDay.innerHTML = simulationDay;
      simulationMonth = parseInt(simulationMonth) + 1;
      gameMonth.innerHTML = simulationMonth;
      localStorage.setItem("month", simulationDay);
    }
    // Year
    if (simulationMonth > 12) {
      setTimeout(() => {
        simulationDay = 1;
        simulationMonth = 1;
        simulationYear = simulationYear + 1;
        gameYear.innerHTML = simulationYear;
        localStorage.setItem("year", simulationYear);
      }, 1000)
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
  showStockQuantity.innerHTML = `Stocks: ${simulationStockQuantity}`;
  workedCount = 0;
  stopTimeFunction();
}

function reset() {
  confirm("Are you sure you want to reset everything? There is no way back!")
    ?
    resetTimeMoney()
    :
    alert("Nothing changed!");
}

/* 
-> To Do List

FIX WALLET innerHTML on payment day 

FIX DIVIDENDS NaN on dividendsPaymentFunction

*/ 