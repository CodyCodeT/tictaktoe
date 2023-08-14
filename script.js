const game = (() => {
  let selection = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const items = document.querySelectorAll(".item");

  const result = document.querySelector("#result");
  let round = 0;
  let turn = true;

  const getTurn = () => turn;

  const resetTurn = () => {
    round = 0;
    turn = true;
  };

  const endTurn = () => {
      game.round++;
      turn = !turn;
      return turn;
  };

  const reset = () => {
    game.selection = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    result.textContent = "";
    const restart = document.querySelector("#restart");
    restart.addEventListener("click", reset);
    items.forEach((itemElement) => {
      itemElement.textContent = "";
      itemElement.addEventListener("click", gameBoard.playerSelect);
      resetTurn();
    });
  };

  const gameOver = () => {
    items.forEach((itemElement) => {
      itemElement.removeEventListener("click", gameBoard.playerSelect);
    });
  };

  return { selection, reset, getTurn, endTurn, resetTurn, gameOver, result, round };
})();

const gameBoard = (() => {
  const playerSelect = (e) => {
    var gridSelection = e.target.id.replace("item-", "");
    gridSelection = Number(gridSelection) - 1;
    gridSelection = game.selection[`${gridSelection}`];

    if (game.getTurn() === true) {
      e.target.textContent = "X";
      e.target.removeEventListener("click", playerSelect);
      game.selection[`${gridSelection}`] = "X";
      game.endTurn();
    } else if (game.getTurn() === false) {
      e.target.textContent = "O";
      e.target.removeEventListener("click", playerSelect);
      game.selection[`${gridSelection}`] = "O";
      game.endTurn();
    } else {
      return;
    }
    if (game.round < 9){
    player.turnIndicator();
    } else {
      game.result.textContent = `It's a tie!`
    }
    checkWinner();
  };
  const checkWinner = () => {
    let winner = "";

    const winningCombonation = [
      [0, 1, 2], //rows
      [3, 4, 5],
      [6, 7, 8], 
      [0, 3, 6], //cols 
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombonation) {
      if (
        game.selection[combo[0]] === game.selection[combo[1]] &&
        game.selection[combo[1]] === game.selection[combo[2]]
      ) {
        winner = game.selection[combo[0]];
      }
      if (winner === "X") {
        console.log('works');
        game.result.textContent = `${player.nameOne.value} is the winner`;
        game.gameOver();
      } else if (winner === "O") {
        game.result.textContent = `${player.nameTwo.value} is the winner`;
        game.gameOver();
      } else {

      }
    }
  };
  return { playerSelect };
})();

const player = (() => {
  const p1 = document.querySelector("#p1");
  const p2 = document.querySelector("#p2");
  const nameOne = document.querySelector("#nameOne");
  const nameTwo = document.querySelector("#nameTwo");
  const form = document.querySelector("#form");
  const start = document.querySelector("#start");

  const intitialize = (e) => {
    e.preventDefault();
    p1.textContent = nameOne.value + " Xs";
    p2.textContent = nameTwo.value + " Os";
    form.style.display = "none";
    game.reset();
    game.result.textContent = `${p1.textContent}'s turn`;
  };

  const turnIndicator = () => {
    if (game.getTurn() === true) {
      game.result.textContent = `${p1.textContent}'s turn`;
    } else if (game.getTurn() === false) {
      game.result.textContent = `${p2.textContent}'s turn`;
    } else {
      return;
      
    }
  };

  start.addEventListener("click", intitialize);
  return { p1, p2, nameOne, nameTwo, turnIndicator };
})();
