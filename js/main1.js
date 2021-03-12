let Model = {
    c: null,
    init: function (controller) {
        this.c = controller;
    }
}

let View = {
    m: null,
    init: function (model) {
        this.m = model;
    }
}

let Controller = {
    v: null,
    m: null,
    init: function (view, model) {
        this.v = view;
        this.m = model;
    }
}

let App = {
    m: Object.create(Model),
    v: Object.create(View),
    c: Object.create(Controller),

    init: function () {
        this.m.init(this.c);
        this.v.init(this.m);
        this.c.init(this.v, this.m);
    }
}

// ===================== Global Variables =====================

let player = '';
let turnCount = 0;
let winArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// ===================== Creates the Players =====================

function players() {
    let players = document.createElement('div');
    players.setAttribute('class', 'row');
    players.classList.add('boarder', 'boarder-2', 'text-center', 'mb-4');
    players.setAttribute('id', 'players')
    document.getElementById('mainContainer').appendChild(players);
        let name = document.createElement('div');
        name.setAttribute('class', 'col');
        name.classList.add('border', 'border-2');
        name.setAttribute('id', `player-1`);
        name.innerHTML = `<h1>Player 1<br>X`;
        document.getElementById('players').appendChild(name);
        let name2 = document.createElement('div');
        name2.setAttribute('class', 'col');
        name2.classList.add('border', 'border-2');
        name2.setAttribute('id', `player-2`);
        name2.innerHTML = `<h1>Player 2<br>O`;
        document.getElementById('players').appendChild(name2);
    
}

// ===================== Selects Who Goes First and Creates the HTML to Show It =====================

function randomPlayer() {
    let playerSelect = Math.round(Math.random());
    if (playerSelect === 0) {
        player = 'O';
    } else {
        player = 'X';
    }
}

function createPlayer() {
    let whoFirst = document.createElement('div');
    whoFirst.setAttribute('class', 'row');
    whoFirst.classList.add('boarder', 'boarder-2', 'text-center', 'mb-4');
    whoFirst.setAttribute('id', 'whoFirst')
    whoFirst.innerHTML = `<h1>It's ${player}'s turn</h1>`;
    document.getElementById('mainContainer').appendChild(whoFirst);
    let win = document.createElement('div');
    win.setAttribute('class', 'row');
    win.classList.add('boarder', 'boarder-2', 'text-center', 'mb-4', 'd-none');
    win.setAttribute('id', 'win')
    document.getElementById('mainContainer').appendChild(win);
}

// ===================== Changes Who's Turn it is and Displays it in the HTML =====================

function changePlayer() {
    if (player === 'O') {
        player = 'X';
    } else {
        player = 'O';
    }
    document.getElementById('whoFirst').innerHTML = `<h1>It's ${player}'s turn</h1>`;
}
// ===================== Create Board Container =====================

function board() {
    let board = document.createElement('div');
    board.setAttribute('class', 'container');
    board.setAttribute('id', 'board');
    board.classList.add('boarder', 'boarder-2', 'h-50')
    document.getElementById('mainContainer').appendChild(board);
}

// ===================== Create the Board Tiles with Rows and Columns =====================

function newRow(rows, columns) {
    let j = 0;
    let step = columns;

    for (let i = 0; i < rows; i++) {
        let newRow = document.createElement('div');
        newRow.setAttribute('class', 'row');
        newRow.setAttribute('id', `row${i}`);
        newRow.classList.add('h-25');
        document.getElementById('board').appendChild(newRow);
        // console.log(i);

            for (j; j < step; j++) { // change columns to reflect
                let newColumn = document.createElement('div');
                newColumn.setAttribute('class', 'col');
                newColumn.setAttribute('id', `${j}`);
                newColumn.classList.add('tile', 'border', 'border-3', 'border-dark', 'h-100', 'center-text');
                newColumn.addEventListener('click', click);
                document.getElementById(`row${i}`).appendChild(newColumn);
                // console.log(j);
            }
            step = j + columns;
            // console.log(step)
        }
    }

// ===================== Create Reset Button =====================

function rstBtn() {
    let rstBtn = document.createElement('button');
    rstBtn.setAttribute('type', 'button');
    rstBtn.setAttribute('id', 'rstBtn');
    rstBtn.classList.add('border');
    rstBtn.innerText = 'Reset';
    rstBtn.addEventListener('click', reset);
    document.getElementById('board').appendChild(rstBtn);
}

// ===================== Reset Button Click =====================

function reset() {
    for (let k = 0; k < winArr.length; k++) {
        document.getElementById(k).addEventListener('click', click);
        document.getElementById(k).textContent = '';
    }
    winArr = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    turnCount = 0;
    document.getElementById('win').classList.add('d-none');
    randomPlayer();
}

// ===================== What Happens on Tile Click =====================

function click(e) {
    if (player === 'O') {
        e.target.innerHTML = 'O';
    } else {
        e.target.innerHTML = 'X';
    }
    let index = e.target.getAttribute('id');
    if (player === 'O') {
        winArr[index] = 'O';
    } else {
        winArr[index] = 'X';
    }
    e.target.removeEventListener('click', click);
    turnCount++;
    // checkWin();
    gameOver();
    if (checkWin() == false) {
        changePlayer();
    }
}

// ===================== On Win =====================

function gameOver() {
    if (checkWin() == true) {
        document.getElementById('win').innerHTML = `<h1> ${player} IS THE WINNER!</h1>`;
        document.getElementById('win').classList.remove('d-none');
        for (let l = 0; l < winArr.length; l++) {
            document.getElementById(l).removeEventListener('click', click);
        }
    }
}

// ===================== Check for Win Condition =====================

function checkWin() {
    if (winArr[0] == player && winArr[1] == player && winArr[2] == player) {
        return true;
    } else if (winArr[3] == player && winArr[4] == player && winArr[5] == player) {
        return true;
    } else if (winArr[6] == player && winArr[7] == player && winArr[8] == player) {
        return true;
    } else if (winArr[0] == player && winArr[3] == player && winArr[6] == player) {
        return true;
    } else if (winArr[1] == player && winArr[4] == player && winArr[7] == player) {
        return true;
    } else if (winArr[2] == player && winArr[5] == player && winArr[8] == player) {
        return true;
    } else if (winArr[0] == player && winArr[4] == player && winArr[8] == player) {
        return true;
    } else if (winArr[2] == player && winArr[4] == player && winArr[6] == player) {
        return true;
    } else {
        return false;
    }
}

// ===================== Initialization Function =====================

function init() {
    players();
    randomPlayer();
    createPlayer();
    board();
    newRow(3, 3);
    rstBtn();
}