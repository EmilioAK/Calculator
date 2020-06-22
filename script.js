const operations = {
    add: (a, b) => a+b,
    subtract: (a, b) => a-b,
    multiply: (a, b) => a*b,
    divide: (a, b) => a/b
};

const operate = (operation, n1, n2) => operations[operation](n1, n2);