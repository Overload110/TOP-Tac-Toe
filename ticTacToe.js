const gameBoard = (function(){
    const board = newBoard();

    const newBoard = () => {
        let board = [];
        for(let i = 0; i < 3; i++){
            board[i] = [];
            for(let j = 0; j < 3; j++){
                board[i].push(createTile());
            }
        };
        return board;
    }

    const checkWin = () =>{
        let product = 1;
        if(board[0][0].getMark() + board[1][1].getMark() + board[2][2].getMark() === 3 ||
            board[0][0].getMark() + board[1][1].getMark() + board[2][2].getMark() === 6){
                win();
        }
        if(board[0][2].getMark() + board[1][1].getMark() + board[2][0].getMark() === 3 ||
        board[0][2].getMark() + board[1][1].getMark() + board[2][0].getMark() === 6){
            win();
        }
        for(let i = 0; i < 3; i++){
            if(board[i][0].getMark() + board[i][1].getMark() + board[i][2].getMark() === 3 ||
            board[i][0].getMark() + board[i][1].getMark() + board[i][2].getMark() === 6){
                win();
            }
            for(let j = 0; j < 3; j++){
                product *= board[i][j];
                if(board[0][j].getMark() + board[1][j].getMark() + board[2][j].getMark() === 3 ||
                board[0][j].getMark() + board[1][j].getMark() + board[2][j].getMark() === 6){
                    win();
                } 
            }
        }
        if(product !== 0){
            gameTie();
        }
    }

    return {checkWin, newBoard};
})();

function createPlayer(name, xo){
    const player = name;
    const mark = xo;

    const getName = () => player;

    const getMark = () => mark;

    return {getName, getMark};
}


function createTile(){
    content = 0;

    const placeMark = (player) =>{
        if(content === 0){
            content = player.mark;
            game.turnChange();
        }
    }

    const getMark = () => content;
    
    return {placeMark, getMark}
}

const game = (function(){
    let turn = 1;

    const win = () =>{
        if(turn = 1){
            //x wins
        }else{
            //o wins
        }
    }

    const turnChange = () =>{
        if(turn === 1){
            turn = 2;
        }else{
            turn = 1;
        }
    }

    const whoTurn = () =>{

    }
});