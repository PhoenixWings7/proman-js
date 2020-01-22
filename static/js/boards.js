function setEventListenerOnEachBoard() {
    const allBoardsDiv = document.getElementById('allboards');
    allBoardsDiv.addEventListener('click', changeBoardName);
}

function changeBoardName(e) {
    if (e.target.tagName === 'H2') {
        const header = e.target;
        let boardName = header.textContent;
        const inputField = e.target.parentElement.firstElementChild;
        header.style.display = 'none';
        inputField.value = boardName;
        inputField.style.display = 'block';
        inputField.addEventListener('keypress', function (e) {
            if (e.code === 'Enter') {
                header.textContent = this.value;
                header.style.display = 'block';
                inputField.style.display= 'none';
                console.log(header.textContent);

            }
       });
    }
}
function changeBoardView(boardElem) {
    boardElem.getElementsByClassName('columns')
}

function activateButtons() {
    //get buttons
    let newBoardBtn = document.getElementById('new_board');
    let allBoardsDiv = document.getElementById('allboards');

    //add event listeners
    newBoardBtn.addEventListener('click', addNewBoard);
    allBoardsDiv.addEventListener('click', addNewColumn);
}

function addNewBoard() {
    //get board template and body from DOM
    let boardTemplate = document.getElementsByTagName('template')[0];
    let allBoards = document.getElementById('allboards');

    //create new board DOM element with classes 'container' and 'board' and template HTML code in it
    let newBoard = document.createElement('div');
    let newBoardHTML = boardTemplate.cloneNode(true).innerHTML;

    newBoard.classList.add('container');
    newBoard.classList.add('board');
    newBoard.innerHTML = newBoardHTML;

    //add new board element to the body
    allBoards.appendChild(newBoard)
}

function addNewColumn(event) {
    if (event.target.tagName === 'BUTTON') {
        //get columns div which is before 'Add column' button
        let columns = event.target.parentElement.parentElement.firstElementChild;
        //create new div for this column
        let newColumn = document.createElement('div');
        newColumn.classList.add('column');
        // get template HTML and set it to newColumn HTML
        let columnTemplate = document.getElementById('column_template');
        newColumn.innerHTML = columnTemplate.innerHTML;
        //add new column to the columns div
        columns.appendChild(newColumn);

    }
}

activateButtons();
setEventListenerOnEachBoard();
