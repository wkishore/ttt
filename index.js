let container = document.getElementById('container');
let resetBtn = document.getElementById('reset');
let txt = document.getElementById('txt');

function createUser (name , userSign) {
    let sign = userSign;
    let reputation = 0;
    const getReputation = () => reputation;
    const giveReputation = () => reputation++;
  
    return { name, sign, getReputation, giveReputation };
}

function gameBoard() {
    let board = new Array(3).fill().map(() => new Array(3).fill('-'));
    renderBoard();

    function updateBoard(user, location){
        console.log(board);
        board[location.first][location.second] = user.sign;
        renderBoard();
        return checkWin();
    }

    function resetBoard(){
        board = new Array(3).fill().map(() => new Array(3).fill('-'));
        renderBoard();
        txt.textContent='';
    }

    function checkWin() {
        for (let i = 0; i < 3; i++) {
          if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '-') {
            console.log(board[i][0]);
            return board[i][0];
          }
        }

        for (let i = 0; i < 3; i++) {
          if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '-') {
            return board[0][i];
          }
        }

        if (board[0][0] === board[1][1]  && board[1][1] === board[2][2] && board[0][0] !== '-') {
          return board[0][0];
        }

        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '-') {
          return board[0][2];
        }

        return null;
    }

    function isFilled(location){
        if(board[location.first][location.second]=='-')
            return false;
        return true;
    }

    function renderBoard(){
        console.log("rendering");
        container.innerHTML = '';
        for(i=0;i<3;i++){
            for(j=0;j<3;j++){
                let mark = document.createElement('div');
                mark.textContent = board[i][j];
                mark.id = ""+i+j;
                container.appendChild(mark);
            }
        }
    }

    return {updateBoard, resetBoard, isFilled};
}

function createGame(firstName, secondName){
    let user1 = createUser(firstName, 'O');
    let user2 = createUser(secondName, 'X');
    let board = gameBoard();
    let count = 0;
    let hasWon = null;

    function move(location){
        if(hasWon !== null){

        }
        else if(board.isFilled(location)){

        }
        else if(count<=8){
            if(count%2==0){
                hasWon = board.updateBoard(user1, location);
                console.log(hasWon);
            }
            else{
                hasWon = board.updateBoard(user2, location);
            }
            if(hasWon==='O')
                txt.textContent = user1.name+" won";
            else if(hasWon==='X')
                txt.textContent = user2.name+" won";
            else if(hasWon==='tie')
                txt.textContent = "Its a tie";

            count++;
        }
        return hasWon;
    }

    function reset(){
        count = 0;
        board.resetBoard();
        hasWon = null;
    }

    function giveCount(){
        return count;
    }
    return {move, reset, giveCount};
}

let board

let firstName = prompt("Enter user1 name");
let secondName = prompt("Enter user2 name");
let game = createGame(firstName, secondName);

container.addEventListener('click',(event)=>{
    //event.preventDefault();
    let currId = event.target.id;
    console.log(event.target.id)
    let location = {first: parseInt(currId[0]), second:parseInt(currId[1])};
    console.log(location)
    game.move(location);
});

resetBtn.onclick = (e)=>{
    game.reset();
};



