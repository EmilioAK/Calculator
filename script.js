const operations = {
    "+": (a, b) => a+b,
    "-": (a, b) => a-b,
    "*": (a, b) => a*b,
    "/": (a, b) => a/b
};

const calculate = (operation, n1, n2) => operations[operation](n1, n2);

const numberButtons = document.querySelectorAll(".numberButton");
const operationButtons = document.querySelectorAll('.operationButton');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');
const allButtons = Array.from(document.getElementsByTagName("input")); // Array.from() needed since it's not given in the same form as the others
const backspace = document.querySelector('#backspace');
const outputBox = document.querySelector('#outputBox');

const calcCharacters = '[-+/*]';

const calcCharsWithInclusion = (statement) => statement ? RegExp(`(${calcCharacters})`) : RegExp(calcCharacters);

const containsCalcCharacters = function (string) {
    const characters = calcCharsWithInclusion(false);
    return characters.test(string);
}

const parseInputString = function (string) {
    // Output: [123, "+", 123]
    const parsedArray = string.split(calcCharsWithInclusion(true)); // Separetes the string into numbers and symbols

    const typeFixedArray = parsedArray.map(e => {
        if (containsCalcCharacters(e)) {
            return e;
        } else if (e.includes(".")) {

            return parseFloat(e);
        } else {
            return parseInt(e);
        }
    })
    return typeFixedArray;

}

const operationsInInput = function (operations, input) {
    for (operation of operations) {
        if (input.includes(operation)) {
            return true
        }
    }
    return false
}

const calculateInput = function (input) {
    const mdas = [["*", "/"], ["+", "-"]]
    for (let operations of mdas) {
        let isOperators = function (element) {
            for (operation of operations) {
                if (element == operation) {
                    return true
                }
            }
            return false
        }

        while (operationsInInput(operations, input)) {
            nextOperator = input.findIndex(isOperators)
            let first_number = input[nextOperator - 1];
            let operator = input[nextOperator];
            let second_number = input[nextOperator + 1];
            
            let result = calculate(operator, first_number, second_number);
            input.splice(input.indexOf(first_number), 3, result)
        }
    }
    return input
}

const disableButtons = function (choice) {
    operationButtons.forEach((button) => button.disabled = choice);
    equalsButton.disabled = choice;
}

const disableButtonsIfNecessary = function () {
    const content = outputBox.innerHTML;
    const lastCharacter = content.slice(-1);
    if (containsCalcCharacters(lastCharacter) || !lastCharacter) { //Checks for calcCharacter and emptyness since a calc-character can't be first
        disableButtons(true);
    } else {
        disableButtons(false);
    }
}

const populateOutputbox = function (buttonType) {
    buttonType.forEach((button) => {
        button.addEventListener('click', () => {
            const elementToDisplay = document.createTextNode(button.value);
            outputBox.appendChild(elementToDisplay);
        })
    })
}

equalsButton.addEventListener('click', () => {
    const operationToPerform = outputBox.innerHTML;
    const parsedInput = parseInputString(operationToPerform);
    calculateInput(parsedInput);
    outputBox.innerHTML = parsedInput;
})

populateOutputbox(operationButtons);

populateOutputbox(numberButtons);

backspace.addEventListener('click', () => {
    const content = outputBox.innerHTML;
    const contentWithoutLastCharacter = content.substring(0, content.length - 1);
    outputBox.innerHTML = contentWithoutLastCharacter;
})

clearButton.addEventListener('click', () => {
    outputBox.innerHTML = '';
})

allButtons.forEach((button) => {
    button.addEventListener('click', () => {
        disableButtonsIfNecessary();
    })
})
