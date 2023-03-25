const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("statusText");
const restartBtn = document.getElementById("restartBtn");
const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let random = Math.random();
let options = ["","","","","","","","",""];
let currentPlayer = random > 0.5 ? "X" : "O";
let running = false;
initializeGame();
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click",cellClicked))
    restartBtn.addEventListener("click", restartGame)
    statusText.innerHTML = `${currentPlayer}'s turn`
    running = true
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    console.log(cellIndex)
    if(options[cellIndex] !== "" || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
}

function updateCell(cell,index){
    options[index] = currentPlayer
    cell.innerHTML = currentPlayer
}

function changePlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    console.log(options)
    statusText.innerHTML = `${currentPlayer}'s turn`;
}
function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){
        const conditions = winConditions[i];
        const cellA = options[conditions[0]];
        const cellB = options[conditions[1]];
        const cellC = options[conditions[2]];
        if(cellA == "" || cellB == "" || cellC == ""){
            continue
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }else if(times(options,"") === 0){
        statusText.innerHTML = "Draw!";
    }else{
        changePlayer();
    }
}
function times(xs,n){
    let count = 0;
    for(let i = 0; i < xs.length; i++){
        if(xs[i] === n){
            count++
        }
    }
    return count;
}
function restartGame(){
    currentPlayer = "X" ? "O" : "X";
    options = ["","","","","","","","",""];
    statusText.textContext = "${currentPlayer}'s turn";
    cells.forEach(cell => cell.textContext = "");
    running = true;
}
