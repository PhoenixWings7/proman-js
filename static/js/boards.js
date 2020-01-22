function changeBoardView(boardElem) {
    boardElem.getElementsByClassName('board-content')
}

function activateButtons() {
    //get buttons
    let newBoardBtn = document.getElementById('new_board')

    //add event listeners
    newBoardBtn.addEventListener('click', addNewBoard)
}

function addNewBoard() {
    //get board template and body from DOM
    let boardTemplate = document.getElementsByTagName('template')[0];
    let DOMbody = document.getElementsByTagName('body')[0];

    //create new board DOM element with classes 'container' and 'board' and template HTML code in it
    let newBoard = document.createElement('div');
    let newBoardHTML = boardTemplate.cloneNode(true).innerHTML;

    newBoard.classList.add('container');
    newBoard.classList.add('board');
    newBoard.innerHTML = newBoardHTML;

    //add new board element to the body
    DOMbody.appendChild(newBoard)
}

activateButtons();
