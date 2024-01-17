// import swal from 'sweetalert';

// swal('Hello!');

// salary variable to change game mode

let salary = 0.25;

// total stats 

const totalSalary = document.getElementById('totalSalary');
const totalDividends = document.getElementById('totalDividends');

let totalClickPayment = localStorage.getItem('totalClickPayment') ? localStorage.getItem('totalClickPayment') : 0;
let totalDividendsStats = localStorage.getItem('totalDividendsStorage') ? localStorage.getItem('totalDividendsStorage') : 0;

function totalClickPaymentFunction() {
  totalClickPayment = parseFloat(parseFloat(totalClickPayment) + parseFloat(salary)).toFixed(2);
  console.log(totalClickPayment);
  localStorage.setItem('totalClickPayment', totalClickPayment);
  totalSalary.innerHTML =
    localStorage.getItem('totalClickPayment') ? localStorage.getItem('totalClickPayment') : "$ " + totalClickPayment;
}

function totalDividendsPaymentFunction() {
  totalDividendsStats = parseFloat(localStorage.getItem('totalDividendsStorage')).toFixed(2);
  totalDividends.innerHTML = totalDividendsStats;
  console.log(typeof (totalDividendsStats));
}
// Wallet control

const gameWallet = document.getElementById("walletInGame");
let simulationMoney = localStorage.getItem('money') ? localStorage.getItem('money') : 0.00;
let workedCount = localStorage.getItem('workedCount') ? localStorage.getItem('workedCount') : 0;
gameWallet.innerHTML = simulationMoney;
const workArea = document.getElementById('clickArea');

function workFunction() {
  if (gameStatus === false) {
    confirm("You can't work when the game isn't running, start game?")
      ?
      handleGameStatus()
      :
      ''
  } else {
    workedCount = parseFloat(workedCount + salary);
    console.log(workedCount);
    totalClickPaymentFunction();
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
      simulationYear = simulationYear + 1;
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
  // showStockQuantity.innerHTML = "Stocks:" + parseInt(simulationStockQuantity);
  totalClickPaymentFunction();
  totalDividendsPaymentFunction();
};

window.addEventListener('load', loadFunction);