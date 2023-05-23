//your JS code here. If required.
let boardgame = document.querySelector('.gamebord');
let cells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "circle";

function cellappend() {
  cells.forEach((cell, index) => {
    let squarediv = document.createElement('div');
    squarediv.className = 'square';
    squarediv.id = index;
    squarediv.addEventListener('click', tapForSymbol);
    boardgame.appendChild(squarediv);
  });
}

function tapForSymbol(event) {
  let squarediv = event.target;
  let cellIndex = squarediv.id;

  if (cells[cellIndex] === "") {
    if (currentPlayer === "circle") {
      addCircle(squarediv);
      currentPlayer = "cross";
    } else {
      addCross(squarediv);
      currentPlayer = "circle";
    }

    cells[cellIndex] = currentPlayer;
	  message();
    checkWin();
	  
  }
}

function addCircle(squarediv) {
  let circleDiv = document.createElement('div');
  circleDiv.className = 'circle';
  squarediv.appendChild(circleDiv);
}

function addCross(squarediv) {
  let crossDiv = document.createElement('div');
  crossDiv.className = 'cross';
  squarediv.appendChild(crossDiv);
}

function checkWin() {   //winner declear
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let combination of winningCombinations) {
    let [a, b, c] = combination;
    if (cells[a] !== "" && cells[a] === cells[b] && cells[b] === cells[c]) {
      let messageDiv = document.querySelector('.message');
      messageDiv.innerHTML = `${cells[a]} ,congratulations you won!`;
      messageDiv.style.display = "block";
      messageDiv.className="winner";
      disableClicks();
		
      break;
    }
  }
	
}
function message(){
	currentPlayer=(currentPlayer=="cross")?circle:cross;
	statusText.textContent=`${currentPlayer},you're up` ;
	
}
function disableClicks() {
  let squares = document.querySelectorAll('.square');
  squares.forEach(square => {
    square.removeEventListener('click', tapForSymbol);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  let startButton = document.getElementById('submit');
  startButton.addEventListener('click', function handleClick() {
    cellappend();
    startButton.removeEventListener('click', handleClick);
  });
});
