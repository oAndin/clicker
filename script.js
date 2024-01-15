
// // button reset ammount
// const resetBtn = document.getElementById('reset');

// function startSimu() {
//   wallet.innerHTML = ("00.00");
//   localStorage.setItem('wallet', wallet.innerHTML);
//   stockPaper010.style.visibility = 'hidden';
//   stockPaper100.style.visibility = 'hidden';
//   stockAmount = 0;
//   localStorage.clear();
//   let amountStockPapers = 0;
//   showStockAmount.innerHTML = amountStockPapers;
// }

// function resetAmount() {
//   startSimu()
// }

// resetBtn.addEventListener('click', resetAmount);

// // create the variable wallet
// let wallet = document.getElementById('wallet');
// // give the variable the start amount
// wallet.innerHTML = (localStorage.getItem('wallet'));

// // variable stock paper
// const stockPaper010 = document.getElementById('stockPaper010');

// // variable stock amount

// let stockAmount = localStorage.getItem('stockAmount');
// stockAmount = localStorage.getItem('stockAmount');

// // variable showing how much stocks you own


// // get html element
// let showStockAmount = document.getElementById('showStockAmount');

// // function to check if i can buy the papers

// function checkStockBtnVisi() {
//   if (wallet.innerHTML == 0.10) {
//     stockPaper010.style.visibility = 'visible';
//   }
//   if (wallet.innerHTML == 1.00) {
//     stockPaper100.style.visibility = 'visible';
//   }
// }

// showStockAmount.innerHTML = parseInt(localStorage.getItem('stockAmount'));
// console.log(stockAmount);
// // save amount that im supposed to show


// // new variable to changes on the wallet
// let updatedWallet;

// // get the clicking area
// let clickArea = document.getElementById('clickArea')

// // create the function and make it work!
// function clickAddMoney() {
//   let newValue = parseFloat(wallet.innerHTML) + 0.01;
//   updatedWallet = newValue;
//   wallet.innerHTML = updatedWallet.toFixed(2);
//   localStorage.setItem('wallet', wallet.innerHTML);
//   showStockAmount.innerHTML = parseInt(stockAmount);
//   checkStockBtnVisi();
// }

// clickArea.addEventListener('click', clickAddMoney);

// // get buy stock button

// const buyStockBtn010 = document.getElementById("stockPaper010");

// // function buy papers

// const quantityBtn = document.getElementById('quantityBtn');

// function handleBuyButton() {
//   console.log("Clickei handleBuy");
// }

// quantityBtn.addEventListener('click', handleBuyButton);

// function buyAndHold010() {
//   if (wallet.innerHTML > .09) {
//     wallet.innerHTML = (parseFloat(wallet.innerHTML) - 0.10).toFixed(2);
//     stockAmount = stockAmount + 1;
//     showStockAmount.innerHTML = stockAmount;
//     localStorage.setItem('stockAmount', stockAmount);
//   }
//   else {
//     alert("You dont have enough money!")
//   }
//   console.log(stockAmount);
// }

// buyStockBtn010.addEventListener('click', buyAndHold010);

// // function dividend

// setInterval(() => {
//   if (stockAmount > 0) {
//     let dividend = stockAmount * 0.01;
//     wallet.innerHTML = (parseFloat(wallet.innerHTML) + parseFloat(dividend)).toFixed(2);
//     localStorage.setItem('stockAmount', stockAmount)
//     checkStockBtnVisi()
//     console.log(dividend);
//   }
// }, 10000);

// startSimu();

// Time code section

// start simulation/reset code section



// function startSimu() {
//   console.log("Starting simulation");
//   timeFunction();
//   localStorage.getItem('day') ? simulationDay = localStorage.getItem('day') : 1;
//   simulationDay.innerHTML = simulationDay;
//   localStorage.getItem('month') ? simulationDay = localStorage.getItem('month') : 1;
//   simulationMonth.innerHTML = simulationDay;
//   localStorage.getItem('year') ? simulationDay = localStorage.getItem('year') : 2024;
//   simulationYear.innerHTML = simulationDay;
// };

// function loadGame() {
//   simulationDay = localStorage.getItem('day');
//   simulationDay.innerHTML = simulationDay;
//   simulationDay = localStorage.getItem('month');
//   simulationMonth.innerHTML = simulationDay;
//   simulationDay = localStorage.getItem('year');
//   simulationYear.innerHTML = simulationDay;
// }

// window.onload = loadGame();

// -----------------------------------------------------------------------------------------------------------------------------

// Wallet control

const gameWallet = document.getElementById("walletInGame");
let simulationMoney = localStorage.getItem('money') ? localStorage.getItem('money') : 0;
let workedCount = 0;
gameWallet.innerHTML = "00.00";

const workArea = document.getElementById('clickArea');

function workFunction() {
  if (gameStatus === false) {
    confirm("You can't work when the game isn't running, start game?")
      ?
      handleGameStatus()
      :
      ''
  } else {
    workedCount = workedCount + parseFloat(0.01);
  };
}

function paymentFunction() {
  console.log("O pix caiu");
  simulationMoney = simulationMoney + workedCount;
  console.log("salario:", simulationMoney);
  gameWallet.innerHTML = (parseFloat(simulationMoney)).toFixed(2);
}

workArea.addEventListener('click', workFunction);


// Stock control 

// stock button swtich 

const stockQuantity = document.getElementById('quantityBtn');

let quantity = [1, 10, 100, 1000];
let arrayQuantity = quantity.length;
let currentIndexOf = 0;

function handleQuantity() {
  currentIndexOf = currentIndexOf + 1;
  if (currentIndexOf == quantity.length) {
    currentIndexOf = 0;
  }
  stockQuantity.innerHTML = `Buy stocks: ${quantity[currentIndexOf]}`;
}

stockQuantity.addEventListener('click', handleQuantity);

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
    console.log("day:", simulationDay);
    if (simulationDay == 5) {
      paymentFunction();
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
  stopTimeFunction();
}

function reset() {
  confirm("Are you sure you want to reset everything? There is no way back!")
    ?
    resetTimeMoney()
    :
    alert("Nothing changed!");
};