document.getElementById("submit").addEventListener("click", function () {
  var player1 = document.getElementById("player-1").value;
  var player2 = document.getElementById("player-2").value;

  if (player1 !== "" && player2 !== "") {
    document.getElementById("player-input").style.display = "none";
    document.getElementById("game").style.display = "block";

    var currentPlayer = player1;
    var cells = document.getElementsByClassName("cell");

    for (var i = 0; i < cells.length; i++) {
      cells[i].addEventListener("click", cellClick);
    }

    setMessage(currentPlayer + ", you're up!");

    function cellClick() {
      if (this.innerHTML === "") {
        this.innerHTML = currentPlayer === player1 ? "X" : "O";
        this.removeEventListener("click", cellClick);

        if (checkWin()) {
          setMessage(currentPlayer + ", congratulations, you won!");
          removeCellClickListeners();
        } else if (checkDraw()) {
          setMessage("It's a draw!");
          removeCellClickListeners();
        } else {
          currentPlayer = currentPlayer === player1 ? player2 : player1;
          setMessage(currentPlayer + ", you're up!");
        }
      }
    }

    function setMessage(message) {
      document.querySelector(".message").innerHTML = message;
    }

    function checkWin() {
      var winConditions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
      ];

      for (var i = 0; i < winConditions.length; i++) {
        var [a, b, c] = winConditions[i];
        if (
          cells[a - 1].innerHTML !== "" &&
          cells[a - 1].innerHTML === cells[b - 1].innerHTML &&
          cells[a - 1].innerHTML === cells[c - 1].innerHTML
        ) {
          return true;
        }
      }

      return false;
    }

    function checkDraw() {
      for (var i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML === "") {
          return false;
        }
      }

      return true;
    }

    function removeCellClickListeners() {
      for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", cellClick);
      }
    }
  }
});

       
            