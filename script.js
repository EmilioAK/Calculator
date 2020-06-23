const operations = {
    add: (a, b) => a+b,
    subtract: (a, b) => a-b,
    multiply: (a, b) => a*b,
    divide: (a, b) => a/b
};

const operate = (operation, n1, n2) => operations[operation](n1, n2);

const numberButtons = document.querySelectorAll(".numberButton");
const operationButtons = document.querySelectorAll('.operationButton');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');

const outputBox = document.querySelector('#outputBox');


const populateOutputBox = function (buttonType) {
    buttonType.forEach((button) => {
        button.addEventListener('click', () => {
            elementToDisplay = document.createTextNode(button.value);
            outputBox.appendChild(elementToDisplay);
        })
    })
}

clearButton.addEventListener('click', () => {
    outputBox.innerHTML = '';
})

equalsButton.addEventListener('click', () => {
})

populateOutputBox(numberButtons);
populateOutputBox(operationButtons);