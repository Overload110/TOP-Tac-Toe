const boardDiv = document.getElementById("board");
let turn;
let pcPlayer;
let npcPlayer;

const gameBoard = (() =>{
    const board = new Array(9).fill(null);
    let isNull = value => value = null;

    const newBoard = () => board.fill(null);

    const checkWin = (player) =>{
        const lines = [
        [0, 1, 2],
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6], 
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8], 
        [2, 4, 6] 
        ];

        for (let line of lines) {
            if (board[line[0]] &&
                board[line[0]] === board[line[1]] &&
                board[line[0]] === board[line[2]]) {
                winner(player);
                return 'Win';
            }
            if(!board.filter(isNull)){
                gameTie();
                return 'Tie';
            }
        }
        return false;
    }

    const getTile = (tile) =>{
        return board[tile];
    }

    const placeMark = (e) =>{
        if(turn === pcPlayer){
            if(e.target.id === null){
                e.target = pcPlayer.getMark();
                showBoard();
                checkWin(pcPlayer);
                swapTurn();
            }
        }
        if(turn === npcPlayer){
            board[choice] = npcPlayer.getMark();
            showBoard();
            checkWin(npcPlayer);
            swapTurn();
    }
    }

    const showBoard = () =>{
        boardDiv.innerHTML = '';
        for(i in board){
            let tile = document.createElement('button');
            tile.className = 'tile';
            tile.setAttribute('id', i);
            tile.innerHTML = board[i];
            tile.addEventListener('click', placeMark)
            boardDiv.appendChild(tile);
        }
    };

    return {newBoard, placeMark, showBoard, getTile, checkWin};
})();

function createPlayer(name, xo){
    const player = name;
    const mark = xo;

    const getName = () => player;

    const getMark = () => mark;

    return {getName, getMark};
}

function winner(player){
  alert(`${player.getName()} wins!!`)
}

function setUpGame() {
  if (document.getElementById('X').checked) {
    pcPlayer = createPlayer("Player 1", "X");
    npcPlayer = createPlayer("Player 2", "O");
    turn = pcPlayer;
  } else if (document.getElementById('O').checked) {
      pcPlayer = createPlayer("Player 2", "O");
      npcPlayer = createPlayer("Player 1", "X");
      turn = npcPlayer;
  }
  gameBoard.newBoard();
  gameBoard.showBoard();
}

function playGame() {
  while (gameBoard.checkWin() !== 'Win' || gameBoard.checkWin() !== 'Tie') {
      if (turn === pcPlayer) {
          gameBoard.placeMark(e.target.id);
          turn = npcPlayer;
      } else if (turn === npcPlayer) {
          cpuTurn();
      }
      gameBoard.showBoard();
  }
}

function cpuTurn(){
    let choices = [4, 0, 2, 6, 8, 1, 3, 5, 7];
    for(i in choices){
        if(gameBoard.getTile(choices[i]) === null){
            gameBoard.placeMark(choices[i]);
            swapTurn();
            break;
        }
    }
}

function gameTie(){
    alert("Game Tied.");
    setUpGame();
}

setUpGame();