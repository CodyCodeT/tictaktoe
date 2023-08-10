const game = (() => {
  let selection = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const items = document.querySelectorAll(".item");
  const restart = document.querySelector("#restart");
  let turn = true;

  const getTurn = () => turn;
  const resetTurn = () => (turn = true);
  const endTurn = () => {
    turn = !turn;
    return turn;
  };
  const reset = () => {
    game.selection = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    items.forEach((itemElement) => {
      itemElement.textContent = "";
      itemElement.addEventListener("click", play.playerSelect);
      resetTurn();
    });
  };
  restart.addEventListener("click", reset);
  return { selection, reset, getTurn, endTurn, resetTurn };
})();

const play = (() => {
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
    const boardState = (() => {
      //row 1
      if (
        game.selection[0] === game.selection[1] &&
        game.selection[1] === game.selection[2]
      ) {
        console.log(`${game.selection[0]} is the winner`);
        return game.selection[0];
        //row 2
      } else if (
        game.selection[3] === game.selection[4] &&
        game.selection[4] === game.selection[5]
      ) {
        console.log(`${game.selection[3]} is the winner`);
        return game.selection[3];
        //row 3
      } else if (
        game.selection[6] === game.selection[7] &&
        game.selection[7] === game.selection[8]
      ) {
        console.log(`${game.selection[6]} is the winner`);
        return game.selection[6];
        //col 1
      } else if (
        game.selection[0] === game.selection[3] &&
        game.selection[3] === game.selection[6]
      ) {
        console.log(`${game.selection[0]} is the winner`);
        return game.selection[0];
        //col 2
      } else if (
        game.selection[1] === game.selection[4] &&
        game.selection[4] === game.selection[7]
      ) {
        console.log(`${game.selection[1]} is the winner`);
        return game.selection[1];
        //col 3
      } else if (
        game.selection[2] === game.selection[5] &&
        game.selection[5] === game.selection[8]
      ) {
        console.log(`${game.selection[2]} is the winner`);
        return game.selection[2];
        //diag \
      } else if (
        game.selection[0] === game.selection[4] &&
        game.selection[4] === game.selection[8]
      ) {
        console.log(`${game.selection[0]} is the winner`);
        return game.selection[0];
        //diag /
      } else if (
        game.selection[2] === game.selection[4] &&
        game.selection[4] === game.selection[6]
      ) {
        console.log(`${game.selection[2]} is the winner`);
        return game.selection[2];
      } else {
        return;
      }
    })();
  };
  return { playerSelect };
})();

game.reset();

const player = (name) => {};
