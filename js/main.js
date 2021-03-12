// Classes:  

class App { // - an initializer for the javascript

    constructor() {
    this.currentPlayer = '' //who's turn it is, null by default, randomly set on init
    this.turnCount = 0 // what turn are you on at any given time
    this.winArr = [];
    this.gameOver = false
    this.draw = false
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
        if (this.currentPlayer === 'O') {
            this.currentPlayer = 'X';
        } else {
            this.currentPlayer = 'O';
        }
        document.getElementById('whoFirst').innerHTML = `<h1>It's ${this.currentPlayer}'s turn</h1>`;
    }

    checkWin() {
        if (app.winArr[0].currentState == app.currentPlayer && app.winArr[1].currentState == app.currentPlayer && app.winArr[2].currentState == app.currentPlayer) {
            return true;
        } else if (app.winArr[3].currentState == app.currentPlayer && app.winArr[4].currentState == app.currentPlayer && app.winArr[5].currentState == app.currentPlayer) {
            return true;
        } else if (app.winArr[6].currentState == app.currentPlayer && app.winArr[7].currentState == app.currentPlayer && app.winArr[8].currentState == app.currentPlayer) {
            return true;
        } else if (app.winArr[0].currentState == app.currentPlayer && app.winArr[3].currentState == app.currentPlayer && app.winArr[6].currentState == app.currentPlayer) {
            return true;
        } else if (app.winArr[1].currentState == app.currentPlayer && app.winArr[4].currentState == app.currentPlayer && app.winArr[7].currentState == app.currentPlayer) {
            return true;
        } else if (app.winArr[2].currentState == app.currentPlayer && app.winArr[5].currentState == app.currentPlayer && app.winArr[8].currentState == app.currentPlayer) {
            return true;
        } else if (app.winArr[0].currentState == app.currentPlayer && app.winArr[4].currentState == app.currentPlayer && app.winArr[8].currentState == app.currentPlayer) {
            return true;
        } else if (app.winArr[2].currentState == app.currentPlayer && app.winArr[4].currentState == app.currentPlayer && app.winArr[6].currentState == app.currentPlayer) {
            return true;
        } else if (app.turnCount == 9) {
            app.draw = true;
        } else {
            return false;
        }
    }

    reset() {
        for (let k = 0; k < app.winArr.length; k++) {
            app.winArr[k].clicked = false;
            app.winArr[k].tileHTML.textContent = '';
            app.winArr[k].currentState = '';
        }
        this.currentPlayer = '';
        this.winArr = []
        app.turnCount = 0;
        document.getElementById('win').classList.add('d-none');
        app.randomPlayer();
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

    gameOverF() {
        if (app.checkWin() == true) {
            document.getElementById('win').innerHTML = `<h1> ${app.currentPlayer} IS THE WINNER!</h1>`;
            document.getElementById('win').classList.remove('d-none');
            for (let l = 0; l < app.winArr.length; l++) {
                app.winArr[l].clicked = true;
            }
        } else if (app.draw == true) {
            document.getElementById('win').innerHTML = `<h1> IT'S A DRAW!`;
            document.getElementById('win').classList.remove('d-none');
            for (let l = 0; l < app.winArr.length; l++) {
                app.winArr[l].clicked = true;   
            }
        }

    }
}

class Board { // - a container that holds all the individual tiles

    constructor() {
        this.element = 'div'
        this.classes = 'container', 'boarder', 'boarder-2', 'h-50' // bootstrap styling
        this.id = 'board' //a unique id
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
    this.parent = ''
    this.currentState = ''
    this.tileHTML = HTML
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
                    let tileObj = new Tile(j, newColumn);
                    app.winArr.push(tileObj);
                    newColumn.addEventListener('click', this.onClick.bind(this, tileObj));
                    document.getElementById(`row${i}`).appendChild(newColumn);
                    // console.log(j);
                }
                step = j + columns;
                // console.log(step)
            }
        }

        onClick(tileObj, id) {
            // console.log(tileObj, id);
            if (tileObj.clicked == false) {
                tileObj.clicked = true

                if (app.currentPlayer === 'O') {
                    tileObj.tileHTML.innerText = 'O';
                    tileObj.currentState = 'O';
                } else {
                    tileObj.tileHTML.innerText = 'X';
                    tileObj.currentState = 'X';
                }
            
            // console.log(tileObj);
            // e.target.removeEventListener('click', click);
                console.log(app.turnCount)
                app.turnCount++;
                console.log(app.turnCount)
                app.checkWin();
                // console.log(app, this);
                app.gameOverF();
                app.changePlayer();
                // console.log(app.currentPlayer);
            }
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
