const boxes = Array.from(document.querySelectorAll(".tile"));
const playerTurn = document.querySelector(".display-player");
const buttonReset = document.querySelector("#Restart-Game");
const announce = document.getElementById("announcer");








let state = ["", "", "", "", "", "", "", "", "",];
let currentPlayer = "X";
let activeGame = true;


/*
(0) (1) (2)
(3) (4) (5)
(6) (7) (8)
*/
//The tile board's index, used for helping think up all the winstates.

const winStates = [
    [0, 3, 6],
    [0, 1, 2],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
];

const updateState = (index) => {
    state[index] = currentPlayer;
}

const victoryMessage = (type) => {
    switch(type){
        case playerOWin:
            announce.innerText = "Player O Wins!!";
            break;
        case playerXWin:
            announce.innerText = "Player X Wins!!";
            break;
        case TIE:
            announce.innerText = "It's a Tie!";
    }
};


const playerOWin = "PLAYERO_WON";
const playerXWin = "PLAYERX_WON";
const TIE = "TIE";


function moveResult() {
    let roundWin = false;
    for (let i = 0; i < 7; i++) {
        const winCondition = winStates[i];
        let a = state[winCondition[0]];
        let b = state[winCondition[1]];
        let c = state[winCondition[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        };
        if (a === b && b === c) {
            roundWin = true;
            break;
        };

        if (roundWin == true) {
            victoryMessage(currentPlayer === "X" ? playerXWin : playerOWin);
            activeGame = false;
            return;
        };

        if (!state.includes("")) {
            victoryMessage(TIE);
        };
    };
};
//Unfortunately, unable to get moveResult to recognize WHEN a player has won.






const validMove = (tile) => {
    if(tile.innerHTML === "X" || tile.innerHTML === "O"){
        return false;
    }
    return true;
};




const playerMove = (tile, index) => {
    if(validMove(tile) && activeGame) {
        tile.innerHTML = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateState(index);
        moveResult();
        nextTurn();
    }
}



boxes.forEach( (tile, index) => {
    tile.addEventListener('click', () => playerMove(tile, index));
});





    

const nextTurn = () => {
    playerTurn.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerTurn.innerHTML = currentPlayer;
    playerTurn.classList.add(`player${currentPlayer}`);
}


const resetGame = () => {
    state = ["", "", "", "", "", "", "", "", "",];
    activeGame = true;
    announce.innerText = "";

    if(currentPlayer === "O") {
        nextTurn();
    }

    boxes.forEach(tile => {
        tile.innerHTML = "";
        tile.classList.remove("PlayerX");
        tile.classList.remove("PlayerO");
    })
}

document.getElementById("Restart-Game").addEventListener("click", resetGame);

