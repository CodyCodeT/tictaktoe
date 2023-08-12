const game = (() => {
  let selection = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const items = document.querySelectorAll(".item");
  
  const result = document.querySelector('#result')
  let round = 0;
  let turn = true;

  const getTurn = () => turn;

  const resetTurn = () => {
    round = 0;
    turn = true;
  };
 
  const endTurn = () => {
    if (round < 8){
    round++;
    turn = !turn;
    return turn;
    } else {
      result.textContent = `It's a tie`;
    }};

  const reset = () => {
    game.selection = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    result.textContent = ''
    const restart = document.querySelector("#restart");
    restart.addEventListener("click", reset);
    items.forEach((itemElement) => {
      itemElement.textContent = "";
      itemElement.addEventListener("click", gameBoard.playerSelect);
      resetTurn();
    });
  };

  
  return { selection, reset, getTurn, endTurn, resetTurn, result };
})();

const gameBoard = (() => {
  const playerSelect = (e) => {
    var gridSelection = e.target.id.replace("item-", "");
    gridSelection = Number(gridSelection) - 1;
    gridSelection = game.selection[`${gridSelection}`];

    console.log(game.getTurn());
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

    //make boardstate return X or O and evaluate p1 = X p2 = O
    const boardState = (() => {
      let winner = ''
      //row 1
      if (
        game.selection[0] === game.selection[1] &&
        game.selection[1] === game.selection[2]
      ) {
        winner = game.selection[0];
        //row 2
      } else if (
        game.selection[3] === game.selection[4] &&
        game.selection[4] === game.selection[5]
      ) {
        winner = game.selection[3];
        //row 3
      } else if (
        game.selection[6] === game.selection[7] &&
        game.selection[7] === game.selection[8]
      ) {
        winner = game.selection[6];
        //col 1
      } else if (
        game.selection[0] === game.selection[3] &&
        game.selection[3] === game.selection[6]
      ) {
        winner = game.selection[0];
        //col 2
      } else if (
        game.selection[1] === game.selection[4] &&
        game.selection[4] === game.selection[7]
      ) {
        winner = game.selection[1];
        //col 3
      } else if (
        game.selection[2] === game.selection[5] &&
        game.selection[5] === game.selection[8]
      ) {
        winner = game.selection[2];
        //diag \
      } else if (
        game.selection[0] === game.selection[4] &&
        game.selection[4] === game.selection[8]
      ) {
        winner = game.selection[0];
        //diag /
      } else if (
        game.selection[2] === game.selection[4] &&
        game.selection[4] === game.selection[6]
      ) {
        winner = game.selection[2];
      } else {
        return;
      }
      if ( winner === 'X') {
        game.result.textContent = `${player.nameOne.value} is the winner`;
      } else if ( winner === 'O') {
        game.result.textContent = `${player.nameTwo.value} is the winner`;
      } else {
        return
      }

      
    })();
  };
  return { playerSelect };
})();



const player = (() => {
  const p1 = document.querySelector('#p1')
  const p2 = document.querySelector('#p2')
  const nameOne = document.querySelector('#nameOne')
  const nameTwo = document.querySelector('#nameTwo')
  const form = document.querySelector('#form')
  const start = document.querySelector('#start')
  
  

  const intitialize = (e) => {
    e.preventDefault();
    p1.textContent = nameOne.value + ' Xs'
    p2.textContent = nameTwo.value + ' Os'
    form.style.display = 'none'
    console.log(e.target.id);
    game.reset();
  };
  start.addEventListener('click', intitialize)
  return { p1, p2, nameOne, nameTwo }
})();
