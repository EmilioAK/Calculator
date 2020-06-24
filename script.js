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

const containsCalcCharacters = function (string) {
    characters = RegExp(calcCharacters);
    return characters.test(string);
}


const parseInputString = function (string) {
    // Output: [123, "+", 123]
    parsedArray = string.split(/(calcCharacters)/); // Separetes the string into numbers and symbols

    typeFixedArray = parsedArray.map(e => {
        if (containsCalcCharacters(e)) {
            return e;
        } else {
            return parseInt(e);
        }
    })
    return typeFixedArray;

}

const calculateInput = function (input) {
    /*
    ALGORITHM DESCRIPTION: The simplest form of an operation consists of 3 elements:
    1: The first number
    2: The operation
    3: The second number

    This function performs this calculation with these 3 factors, then replaces them with one element as the result
    While loop checks for 1 because the last step will be a single element: The result.
    */
    
    first_number = input[0];
    operation = input[1];
    second_number = input[2]

    result = 0;
    while (input.length > 1) {
        result += calculate(operation, first_number, second_number);
        input.splice(0, 3);
        input.unshift(result);
    }
    return result;
}

const disableButtons = function (choice) {
    operationButtons.forEach((button) => button.disabled = choice);
    equalsButton.disabled = choice;
}

const disableButtonsIfNecessary = function () {
    content = outputBox.innerHTML;
    lastCharacter = content.slice(-1);
    if (containsCalcCharacters(lastCharacter) || !lastCharacter) { //Checks for calcCharacter and emptyness since a calc-character can't be first
        disableButtons(true);
    } else {
        disableButtons(false);
    }
}

equalsButton.addEventListener('click', () => {
    operationToPerform = outputBox.innerHTML;
    parsedInput = parseInputString(operationToPerform);
    calculateInput(parsedInput);
    outputBox.innerHTML = parsedInput;
})

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        elementToDisplay = document.createTextNode(button.value);
        outputBox.appendChild(elementToDisplay);
    })
})

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        elementToDisplay = document.createTextNode(button.value);
        outputBox.appendChild(elementToDisplay);
    })
})

backspace.addEventListener('click', () => {
    content = outputBox.innerHTML;
    contentWithoutLastCharacter = content.substring(0, content.length - 1);
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
