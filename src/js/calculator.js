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
	if (currentOperand.toString().length >= 10) {
		return;
	}

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
		default:
			return;
	}

	clearAll();

	currentOperand = result;

	renderDisplay();
}

function percentage() {
	if (!previousOperand || !currentOperand) {
		return;
	}

	const percentageOfOperand = currentOperand / 100;
	currentOperand = percentageOfOperand * previousOperand;

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

function clearAll() {
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
window.clearAll = clearAll;
window.invertCurrentOperand = invertCurrentOperand;
window.appendDigit = appendDigit;
window.percentage = percentage;
window.calculate = calculate;

document.addEventListener("DOMContentLoaded", () => {
	currentEl = document.getElementById("current-operand-display");
	expressionEl = document.getElementById("expression-display");
	clearAll();
});

document.addEventListener("keydown", (event) => {
	if (digits.has(event.key)) {
		appendDigit(+event.key);
	} else if (operators.has(event.key)) {
		setOperator(event.key);
	} else if (event.key === "=" || event.key === "Enter") {
		calculate();
	} else if (event.key === "Delete") {
		clearAll();
	}
});
