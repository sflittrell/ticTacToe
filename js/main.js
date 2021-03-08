let player = '';

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

function firstPlayer() {
    let playerSelect = Math.round(Math.random());
    if (playerSelect === 0) {
        player = 'O';
    } else {
        player = 'X';
    }
    let whoFirst = document.createElement('div');
    whoFirst.setAttribute('class', 'row');
    whoFirst.classList.add('boarder', 'boarder-2', 'text-center', 'mb-4');
    whoFirst.setAttribute('id', 'whoFirst')
    whoFirst.innerHTML = `<h1>${player}'s go first!</h1>`;
    document.getElementById('mainContainer').appendChild(whoFirst);
}

function board() {
    let board = document.createElement('div');
    board.setAttribute('class', 'container');
    board.setAttribute('id', 'board');
    board.classList.add('boarder', 'boarder-2', 'h-50')
    document.getElementById('mainContainer').appendChild(board);
}

function newRow(rows, columns) {


    for (let i = 1; i <= rows; i++) {
        let newRow = document.createElement('div');
        newRow.setAttribute('class', 'row');
        newRow.setAttribute('id', `row${i}`);
        newRow.classList.add('h-25');
        document.getElementById('board').appendChild(newRow);
        console.log(i);
        let j = 1;
            for (j; j <= columns; j++) {
                let newColumn = document.createElement('div');
                newColumn.setAttribute('class', 'col');
                newColumn.setAttribute('id', `col${j}`);
                newColumn.classList.add('border', 'border-3', 'border-dark', 'h-100');
                newColumn.innerHTML = '';
                document.getElementById(`row${i}`).appendChild(newColumn);

                console.log(j);
            }
        }
    }



function init() {
    players();
    firstPlayer();
    board();
    newRow(3, 3);
}