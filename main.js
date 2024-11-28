const result = document.querySelector(".result");
const buttons = document.querySelectorAll(".btn");
buttons.forEach(button => {
    const value = button.getAttribute("value");
    button.addEventListener("click", () => handleButton(value));
});

// let numbers = [];
// let operation = null;

// function handleClick(value) {
//     if (isNumber(value)) {
//         setNumber(value);

//         return;
//     }

//     if (value == "AC") {
//         number = [];
//         result.innerHTML = "0";

//         return;
//     }

//     handleOperation(value);
// }

// function setNumber(value) {
//     if (result.innerHTML.length === 11)
//         return;

//     if (result.innerHTML === "0")
//         result.innerHTML = "";

//     let number = result.innerHTML + value;
//     result.innerHTML = number;

//     if (numbers.length === 0)
//         numbers.push(number);

//     numbers[0] = number;
//     console.log(numbers);
// }

// function handleOperation(value) {
//     if (value === "=") {
//         // mostra resultado

//         return;
//     }

//     operation = value;
// }

// String.prototype.splice = function (idx, rem, str) {
//     return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
// };

// function isNumber(value) {
//     if (!value)
//         return false;

//     if (value === ",")
//         return true;

//     return /^[0-9]+$/.test(value);
// }













let currentNumber = '';
let previousNumber = '';
let operation = null;

const display = document.getElementById('display');

function handleButton(value) {
    if (!value)
        return;

    switch (value) {
        case "AC":
            clearResult();
            break;
        case "+/-":
            changeSignal();
            break;
        case "%":
            calcPercent();
            break;
        case "=":
            calculate();
            break;
        case ",":
            appendDecimal();
            break;
        default:
            var isNumber = /^[0-9]+$/.test(value);
            if (isNumber) {
                appendNumber(value);
                break;
            }
            
            setOperation(value);
            break;
    }
}

// Atualiza o visor da calculadora
function updateResult(value) {
    if(value.length >= 9)
        result.classList.add("full");

    result.value = value || '0';
}

// Adiciona número ao visor
function appendNumber(number) {
    if (currentNumber.length >= 10) 
        return;

    currentNumber += number;
    updateResult(currentNumber);
}

// Define a operação (adição, subtração, etc.)
function setOperation(op) {
    if (currentNumber === '') return;
    if (operation !== null) calculate();
    operation = op;
    previousNumber = currentNumber;
    currentNumber = '';
}

// Adiciona um ponto decimal
function appendDecimal() {
    if (!currentNumber.includes('.')) currentNumber += '.';
    updateResult(currentNumber);
}

// Calcula o resultado
function calculate() {
    if (operation === null || currentNumber === '') return;

    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    let result;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current === 0 ? 'Erro' : prev / current;
            break;
        default:
            return;
    }

    currentNumber = result.toString();
    operation = null;
    previousNumber = '';

    updateResult(currentNumber);
}

function calcPercent() {
    if(currentNumber === '')
        return; 

    let currentCalculated = parseFloat(currentNumber) / 100;
    result.value = currentCalculated;
    
    currentNumber = currentCalculated.toString();
}

function changeSignal() {
    if(currentNumber === '')
        return; 

    let currentChanged = parseFloat(currentNumber) * -1;
    result.value = currentChanged;
    
    currentNumber = currentChanged.toString();    
}

// Limpa o visor
function clearResult() {
    currentNumber = '';
    previousNumber = '';
    operation = null;

    result.classList.remove("full");
    updateResult('');
}