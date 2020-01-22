const header = document.querySelectorAll('.header');


header.forEach(element => {
    element.addEventListener('click', changeBoardName)
});


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