// Classes:  

class App { // - an initializer for the javascript

    constructor() {
    this.currentPlayer = '' //who's turn it is, null by default, randomly set on init
    this.turnCount = 0 // what turn are you on at any given time
    this.winArr = [];
    this.gameOver = false
    }

    // ------------------- Methods ---------------------
    
    createHeader() {

        }

    randomPlayer() {
        let playerSelect = Math.round(Math.random());
        if (playerSelect === 0) {
            this.currentPlayer = 'O';
        } else {
            this.currentPlayer = 'X';
        }
    }
    
    createPlayer() {
        let whoFirst = document.createElement('div');
        whoFirst.setAttribute('class', 'row');
        whoFirst.classList.add('boarder', 'boarder-2', 'text-center', 'mb-4');
        whoFirst.setAttribute('id', 'whoFirst')
        whoFirst.innerHTML = `<h1>It's ${this.currentPlayer}'s turn</h1>`;
        document.getElementById('mainContainer').appendChild(whoFirst);
        let win = document.createElement('div');
        win.setAttribute('class', 'row');
        win.classList.add('boarder', 'boarder-2', 'text-center', 'mb-4', 'd-none');
        win.setAttribute('id', 'win')
        document.getElementById('mainContainer').appendChild(win);
    }

    players() {
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

    changePlayer() {
        if (currentPlayer === 'O') {
            currentPlayer = 'X';
        } else {
            currentPlayer = 'O';
        }
        document.getElementById('whoFirst').innerHTML = `<h1>It's ${currentPlayer}'s turn</h1>`;
    }

    checkWin() {
        if (winArr[0] == currentPlayer && winArr[1] == currentPlayer && winArr[2] == currentPlayer) {
            winner = true;
        } else if (winArr[3] == currentPlayer && winArr[4] == currentPlayer && winArr[5] == currentPlayer) {
            winner = true;
        } else if (winArr[6] == currentPlayer && winArr[7] == currentPlayer && winArr[8] == currentPlayer) {
            winner = true;
        } else if (winArr[0] == currentPlayer && winArr[3] == currentPlayer && winArr[6] == currentPlayer) {
            winner = true;
        } else if (winArr[1] == currentPlayer && winArr[4] == currentPlayer && winArr[7] == currentPlayer) {
            winner = true;
        } else if (winArr[2] == currentPlayer && winArr[5] == currentPlayer && winArr[8] == currentPlayer) {
            winner = true;
        } else if (winArr[0] == currentPlayer && winArr[4] == currentPlayer && winArr[8] == currentPlayer) {
            winner = true;
        } else if (winArr[2] == currentPlayer && winArr[4] == currentPlayer && winArr[6] == currentPlayer) {
            winner = true;
        }
    }

    reset() {
        for (let k = 0; k < winArr.length; k++) {
            document.getElementById(k).addEventListener('click', click);
            document.getElementById(k).textContent = '';
        }
        winArr = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        turnCount = 0;
    }

    rstBtn() {
        let rstBtn = document.createElement('button');
        rstBtn.setAttribute('type', 'button');
        rstBtn.setAttribute('id', 'rstBtn');
        rstBtn.classList.add('border');
        rstBtn.innerText = 'Reset';
        rstBtn.addEventListener('click', this.reset);
        document.getElementById('board').appendChild(rstBtn);
    }

    gameOver() {
        if (winner = true) {
            document.getElementById('win').classList.remove('d-none');
        }
    }
}

class Board { // - a container that holds all the individual tiles

    constructor() {
        this.element = 'div'
        this.classes = 'container', 'boarder', 'boarder-2', 'h-50' // bootstrap styling
        this.id = 'board' //a unique id
        this.tiles = [] //an array of all the tiles
        this.parent = 'mainContainer'
    }

    // ------------ Methods ---------------- 

    renderBoard() { // creates the board in HTML
        let board = document.createElement('div');
        board.setAttribute('class', 'container');
        board.setAttribute('id', 'board');
        board.classList.add('boarder', 'boarder-2', 'h-50')
        document.getElementById('mainContainer').appendChild(board);
    }
}


class Tile { //- each individual tile in the tic tac toe grid

    constructor(id, HTML) {
    this.element = 'div'
    this.id = id //unique id for each tile populated dynamically with a function (for loop)
    this.listener = '' //the event listener that looks for the tile being clicked
    this.clicked = false // set to false by default
    this.tileHtml = '' //inner html for each tile, set to empty string by default
    this.parent = ''
    this.currentState = ''
    this.HTML = HTML
    }

    // --------------- Methods --------------

    grid(rows, columns) {
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
                    newColumn.addEventListener('click', this.onClick.bind(this, i));
                    let tileObj = new Tile(i, newColumn);
                    app.winArr.push(tileObj);
                    document.getElementById(`row${i}`).appendChild(newColumn);
                    // console.log(j);
                }
                step = j + columns;
                // console.log(step)
            }
        }

        onClick(e) {

            if (app.currentPlayer === 'O') {
                e.target.innerHTML = 'O';
            } else {
                e.target.innerHTML = 'X';
            }
            let index = e.target.getAttribute('id');
            if (app.currentPlayer === 'O') {
                winArr[index] = 'O';
            } else {
                app.winArr[index] = 'X';
            }
            e.target.removeEventListener('click', click);
            turnCount++;
            checkWin();
            gameOver();
            changePlayer();
            }
}

function init() {
    app = new App();
    board1 = new Board();
    tile = new Tile();
    app.players();
    app.randomPlayer();
    app.createPlayer();
    board1.renderBoard();
    tile.grid(3, 3);
    app.rstBtn();
}  

// Global Functions:

    // Initialization Functions - 
