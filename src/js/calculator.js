let operator = "";
let currentOperand = 0;
let previousOperand = 0;
let currentEl = null;
let expressionEl = null;
const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const operators = new Set(["-", "+", "*", "/", "%"]);
const operatorMappings = {
	"*": "×",
	"/": "÷",
};

function appendDigit(digit) {
	currentOperand = currentOperand * 10 + digit;
	renderDisplay();
}

function calculate() {
	let result;

	switch (operator) {
		case "+":
			result = currentOperand + previousOperand;
			break;
		case "-":
			result = previousOperand - currentOperand;
			break;
		case "*":
			result = currentOperand * previousOperand;
			break;
		case "/":
			result = previousOperand / currentOperand;
			break;
	}

	clear();

	currentOperand = result;

	renderDisplay();
}

function setOperator(newOperator) {
	if (previousOperand && currentOperand) {
		calculate();
	}

	operator = newOperator;
	previousOperand = currentOperand;
	currentOperand = 0;

	renderDisplay();
}

function clear() {
	currentOperand = 0;
	previousOperand = 0;
	operator = "";
	renderDisplay();
}

function invertCurrentOperand() {
	currentOperand = -currentOperand;
	renderDisplay();
}

function renderDisplay() {
	const formattedOperator = operatorMappings[operator] || operator;
	const formattedPreviousOperand = operator ? previousOperand : "";

	currentEl.textContent = currentOperand;
	expressionEl.textContent = `${formattedPreviousOperand} ${formattedOperator}`;
}

window.setOperator = setOperator;
window.clear = clear;
window.invertCurrentOperand = invertCurrentOperand;
window.appendDigit = appendDigit;
window.calculate = calculate;

document.addEventListener("DOMContentLoaded", () => {
	currentEl = document.getElementById("current-operand-display");
	expressionEl = document.getElementById("expression-display");
	clear();
});

document.addEventListener("keydown", (event) => {
	if (digits.has(event.key)) {
		appendDigit(+event.key);
	} else if (operators.has(event.key)) {
		setOperator(event.key);
	} else if (event.key === "=" || event.key === "Enter") {
		calculate();
	} else if (event.key === "Delete") {
		clear();
	}
});
