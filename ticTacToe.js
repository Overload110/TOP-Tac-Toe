const boardDiv = document.getElementById("board");
let turn;
const message = document.getElementById("message");
let pcPlayer, npcPlayer;

const gameBoard = (() =>{
    const board = new Array(9).fill(null);

    const newBoard = () => board.fill(null);

    const checkWin = () =>{
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
                winner(turn);
                turn = null;
                return true;
            }
            if(board.every(val => val !== null)){
                gameTie();
                return true;
            }
        }
        return false;
    }

    const getTile = (tile) =>{
        return board[tile];
    }

    const placeMark = (e) =>{
        if(turn === pcPlayer){
            if(board[e.target.id] === null){
                board[e.target.id] = pcPlayer.getMark();
                showBoard(true);
                if(!checkWin()){
                    turn = npcPlayer;
                }
                
            }
        }
        if(turn === npcPlayer){
            board[cpuTurn()] = npcPlayer.getMark();
            showBoard(true);
            if(!checkWin()){
                turn = pcPlayer;
            }
    }
    }

    const showBoard = (interactible) =>{
        boardDiv.innerHTML = '';
        for(i in board){
            let tile = document.createElement('button');
            tile.className = 'tile';
            tile.setAttribute('id', i);
            tile.innerHTML = board[i];
            if(interactible) tile.addEventListener('click', placeMark);
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
  message.innerHTML = `${player.getName()} wins!!`
  gameBoard.showBoard(false);
  if(pcPlayer.getMark() === 'X'){
    turn = pcPlayer;
  }else{
    turn = npcPlayer;
  }
}

function setUpGame() {
    message.innerHTML = '';
    gameBoard.newBoard();
    gameBoard.showBoard(true);
    if(npcPlayer.getMark() === 'X'){
      turn = npcPlayer;
      gameBoard.placeMark();
    }
    
}

function cpuTurn(){
  let emptyCells = [];
  for (let i = 0; i < 9; i++) {
      if (!gameBoard.getTile(i)) {
          emptyCells.push(i);
      }
  }
  const randomCell = Math.floor(Math.random() * emptyCells.length);
  console.log(randomCell);
  return emptyCells[randomCell];
}

function gameTie(){
    message.innerHTML = "Game Tied.";
    gameBoard.showBoard(false);
    if(pcPlayer.getMark() === 'X'){
        turn = pcPlayer;
      }else{
        turn = npcPlayer;
      }
}

function selectMark(mark){
    if(mark === 'X'){
        pcPlayer = createPlayer("Player 1", "X");
        npcPlayer = createPlayer("Player 2", "O");
        colorChange('X');
        turn = pcPlayer;
        setUpGame();
      } else if(mark === 'O'){
        pcPlayer = createPlayer("Player 2", "O");
        npcPlayer = createPlayer("Player 1", "X");
        turn = npcPlayer;
        colorChange('O');
        setUpGame();
      }
}

function colorChange(xo){
    const x = document.getElementById('X');
    const o = document.getElementById('O');
    if(xo === x.id){
        x.classList.add('selected');
        o.classList.remove('selected');
    }else if(xo === o.id){
        o.classList.add('selected');
        x.classList.remove('selected');
    }
}