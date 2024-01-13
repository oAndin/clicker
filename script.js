
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

// reset code section

let gameDay = localStorage.getItem('day') ? localStorage.getItem('day') : localStorage.setItem('day', 1);
let gameMonth = localStorage.getItem('month') ? localStorage.getItem('month') : 1;
let gameYear = localStorage.getItem('year') ? localStorage.getItem('year') : 2024;

const resetBtn = document.getElementById('resetBtn');

resetBtn.addEventListener('click', reset);

function resetTimeMoney() {
  localStorage.clear();
  gameDay = 1;
  simulationDay.innerHTML = gameDay;
  gameMonth = 1;
  simulationMonth.innerHTML = gameMonth;
  gameYear = 2024;
  simulationYear.innerHTML = gameYear;
  startGame();
}

function reset() {
  confirm("Are you sure you want to reset everything? There is no way back!")
    ?
    resetTimeMoney()
    :
    alert("Nothing changed!");
};

// Time code section

simulationDay = document.getElementById("day");
simulationMonth = document.getElementById("month");
simulationYear = document.getElementById("year");

let timeOnClock = 0;

function timeFunction() {
  setTimeout(() => {
    setInterval(() => {
      timeOnClock = timeOnClock + 1;
      console.log(timeOnClock);
      gameDay = gameDay + 1;
      simulationDay.innerHTML = gameDay;
      // Month 
      if (gameDay == 30 && gameMonth < 12) {
        gameDay = 0;
        setTimeout(() => {
          gameMonth = gameMonth + 1;
          simulationMonth.innerHTML = gameMonth;
          localStorage.setItem("month", gameMonth);
        }, 1000);
      }
      // Year
      if (simulationDay.innerHTML == 30 && simulationMonth.innerHTML == 12) {
        gameDay = 0;
        setTimeout(() => {
          gameMonth = 1;
          simulationMonth.innerHTML = gameMonth
          gameYear = gameYear + 1;
          simulationYear.innerHTML = gameYear;
          localStorage.setItem("year", gameYear);
        }, 1000)
      }
    }, 1000)
    localStorage.setItem("day", gameDay);
  }, 1000)
}

// start simulation/reset code section

function startSimu() {
  console.log("Starting simulation");
  timeFunction();
  localStorage.getItem('day') ? gameDay = localStorage.getItem('day') : 1;
  simulationDay.innerHTML = gameDay;
  localStorage.getItem('month') ? gameMonth = localStorage.getItem('month') : 1;
  simulationMonth.innerHTML = gameMonth;
  localStorage.getItem('year') ? gameYear = localStorage.getItem('year') : 2024;
  simulationYear.innerHTML = gameYear;
};

function loadGame() {
  gameDay = localStorage.getItem('day');
  simulationDay.innerHTML = gameDay;
  gameMonth = localStorage.getItem('month');
  simulationMonth.innerHTML = gameMonth;
  gameYear = localStorage.getItem('year');
  simulationYear.innerHTML = gameYear;
}

window.onload = loadGame();

function startGame() {
  confirm("Start game?") ? startSimu() : '';
}

