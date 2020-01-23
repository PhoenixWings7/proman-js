function setEventListenerOnEachBoard() {
    const allBoardsDiv = document.getElementById('allboards');
    allBoardsDiv.addEventListener('click', chooseEvent);
}

function chooseEvent(e) {
    if (e.target.tagName === 'H2' ) {
        // change the title of the board
        let element = 'board';
        let classToBeSearched = 'board-input';
        changeBoardName(e, element, classToBeSearched);
    } else if(e.target.tagName === 'H4') {
        // change the title of the column

    }
}

function setInputEventListeners(inputField, contentToBeChanged, previousName) {
    inputField.addEventListener('keypress', function (e) {
        if (e.code === 'Enter') {
             this.value.trim() !== '' ? contentToBeChanged.textContent = this.value : contentToBeChanged.textContent = previousName;
            contentToBeChanged.style.display = 'block';
            inputField.style.display= 'none';
        }
    });
    inputField.addEventListener('blur', function() {
        this.value.trim() !== '' ? contentToBeChanged.textContent = this.value : contentToBeChanged.textContent = previousName;
        contentToBeChanged.style.display = 'block';
        inputField.style.display= 'none';
    });
}

function getInputAndFocus(e, element, classToBeSearched){
        const selectedElement = e.target;
        let previousContent = selectedElement.textContent;

        // get the input field using selected element
        const inputField = e.target.parentElement.firstElementChild;
        const nextID = getNextBoardID(element, classToBeSearched);

        inputField.setAttribute('id', `${nextID}`);
        inputField.value = previousContent;
        // console.log(inputField);
        selectedElement.style.display = 'none';
        inputField.style.display = 'block';
        document.getElementById(`${nextID}`).focus();
        return {inputField: inputField, selectedElement: selectedElement, previousContent: previousContent}
}

function changeBoardName(e, element, classToBeSearched){
    // take action only if the element is a h2 tag in the title
        const elementHolder = getInputAndFocus(e, element, classToBeSearched);
        // get each of the element from the element holder object
        const inputField = elementHolder.inputField;
        const boardTitle = elementHolder.previousContent;
        const boardHeader = elementHolder.selectedElement;

        setInputEventListeners(inputField, boardHeader, boardTitle);
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

    newBoard.id = 'newBoard-' + getNewBoardID();
    newBoard.classList.add('container');
    newBoard.classList.add('board');
    newBoard.innerHTML = newBoardHTML;
    //set id for new column and card
    newBoardCol = newBoard.querySelector('.column');
    newBoardCol.id = 'column-' + getNewColumnID();
    newBoardCard = newBoard.querySelector('.card');
    newBoardCard.id = 'card-' + getNewCardID();

    //add new board element to the body
    allBoards.appendChild(newBoard);

    //update session storage for this board
    let newBoardArray =[newBoard];
    setBoardSessionStorage(newBoardArray)
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

function getNextBoardID (element, classToBeSearched){
     // create the id for the input field, needed to put focus on input field
    const inputFields = document.querySelectorAll(`.${classToBeSearched}`);
    if (inputFields.length) {
        const number = (Array.from(inputFields) //make an array
            .map(element => element.id.split('-')) // get the id class and split using the dash
            .map(element => parseInt(element[element.length - 1])) //get the number part and convert to a number
            .sort((a, b) => b - a)[0]) + 1; //sort the array descending, highest number first and return it
        return `${element}-${number}`
    } else {
        return `${element}-1`;
    }
}

//set private id number for getNewBoard function by using closures and invoking the function immediately
let getNewBoardID = (function () {
    let newBoardID = 0;
    return function (){
        newBoardID++;
        return `${newBoardID}`;
    }
})();

let getNewColumnID = (function () {
    let newColID = 0;
    return function () {
        newColID++;
        return `${newColID}`
    }
})();

let getNewCardID = (function () {
    let newColID = 0;
    return function () {
        newColID++;
        return `${newColID}`
    }
})();

//sets session storage for array of boards
function setBoardSessionStorage(boards) {
    for (board of boards) {
        //set board session storage
        let boardID = board.id;
        let boardTitle = board.querySelector('.board-title').textContent;
        sessionStorage.setItem(`${boardID}`, boardTitle);

        let boardColumns = board.querySelectorAll('.column');
        for (column of boardColumns) {
            //set columns session storage
            let columnID = column.id;
            let columnTitle = column.querySelector('.column-title').textContent;
            sessionStorage.setItem(`${boardID}-${columnID}`, columnTitle);
            //set session storage for cards in this column
            let cards = column.querySelectorAll('.card');
            for (card of cards) {
                let cardID = card.id;
                let cardContent = card.textContent;
                sessionStorage.setItem(`${boardID}-${columnID}-${cardID}`, cardContent)
            }
        }


    }

}

function updateElemSessionStorage(elementKey, elementValue) {
    sessionStorage.setItem(elementKey, elementValue)
}

function setTemplateBoardsStorageOnLoad () {
    let boards = document.querySelectorAll('.board');
    //clear session storage
    window.addEventListener('load', setBoardSessionStorage.bind(null, boards));
}

activateButtons();
setEventListenerOnEachBoard();
setTemplateBoardsStorageOnLoad();

