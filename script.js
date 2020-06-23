const operations = {
    "+": (a, b) => a+b,
    "-": (a, b) => a-b,
    "*": (a, b) => a*b,
    "/": (a, b) => a/b
};

const operate = (operation, n1, n2) => operations[operation](n1, n2);

const numberButtons = document.querySelectorAll(".numberButton");
const operationButtons = document.querySelectorAll('.operationButton');
const equalsButton = document.querySelector('#equals');
const clearButton = document.querySelector('#clear');

const outputBox = document.querySelector('#outputBox');

const populateOutputBox = function (buttonType) {
    // Adds numbers user inputs to outputbox
    buttonType.forEach((button) => {
        button.addEventListener('click', () => {
            elementToDisplay = document.createTextNode(button.value);
            outputBox.appendChild(elementToDisplay);
        })
    })
}

const parseInputString = function (string) {
    // Output: [123, "+", 123]
    parsedArray = string.split(/([-+/*])/); // Separetes the string into numbers and symbols
    specialCharacters = RegExp('[-+/*]');

    typeFixedArray = parsedArray.map(e => {
        if (specialCharacters.test(e)) {
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
        result += operate(operation, first_number, second_number);
        input.splice(0, 3);
        input.unshift(result);
    }
    return result;
}

clearButton.addEventListener('click', () => {
    outputBox.innerHTML = '';
})

equalsButton.addEventListener('click', () => {
    operationToPerform = outputBox.innerHTML;
    parsedInput = parseInputString(operationToPerform);
    console.log(calculateInput(parsedInput));
    outputBox.innerHTML = parsedInput;
})

populateOutputBox(numberButtons);
populateOutputBox(operationButtons);