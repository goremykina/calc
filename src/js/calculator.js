let operator = "";
let currentOperand = "0";
let previousOperand = "";
let currentEl = null;
let expressionEl = null;
const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
const operators = new Set(["-", "+", "*", "/", "%"]);
const operatorMappings = {
	"*": "×",
	"/": "÷",
};
const actions = {
	"+": (first, second) => first + second,
	"-": (first, second) => first - second,
	"*": (first, second) => first * second,
	"/": (first, second) => first / second,
};

function append(char) {
	if (currentOperand.length >= 10) {
		alert("The number is too big");
		return;
	}

	if (char === "." && currentOperand.includes(".")) {
		return;
	}

	currentOperand = currentOperand + char;

	if (!currentOperand.includes(".")) {
		currentOperand = sanitize(currentOperand);
	}

	renderDisplay();
}

function calculate() {
	const action = actions[operator];

	if (!action) {
		return;
	}

	const result = action(+previousOperand, +currentOperand);
	clearAll();
	currentOperand = result.toString();
	renderDisplay();
}

function percentage() {
	const percentageOfOperand = +currentOperand / 100;
	currentOperand = (percentageOfOperand * +previousOperand).toString();

	renderDisplay();
}

function setOperator(newOperator) {
	if (previousOperand) {
		calculate();
	}

	operator = newOperator;
	previousOperand = sanitize(currentOperand);
	currentOperand = "0";

	renderDisplay();
}

function clearAll() {
	currentOperand = "0";
	previousOperand = "";
	operator = "";
	renderDisplay();
}

function invertCurrentOperand() {
	currentOperand = currentOperand.startsWith("-")
		? currentOperand.substring(1)
		: `-${currentOperand}`;
	renderDisplay();
}

function renderDisplay() {
	if (currentOperand.toString().length >= 10) {
		currentEl.classList.add("compact");
	} else {
		currentEl.classList.remove("compact");
	}

	const formattedOperator = operatorMappings[operator] || operator;
	const formattedPreviousOperand = operator ? previousOperand : "";

	currentEl.textContent = currentOperand;
	expressionEl.textContent = `${formattedPreviousOperand} ${formattedOperator}`;
}

function sanitize(number) {
	return (+number).toString();
}

window.setOperator = setOperator;
window.clearAll = clearAll;
window.invertCurrentOperand = invertCurrentOperand;
window.append = append;
window.percentage = percentage;
window.calculate = calculate;

document.addEventListener("DOMContentLoaded", () => {
	currentEl = document.getElementById("current-operand-display");
	expressionEl = document.getElementById("expression-display");
	clearAll();
});

document.addEventListener("keydown", (event) => {
	if (digits.has(event.key)) {
		append(event.key);
	} else if (event.key === "." || event.key === ",") {
		append(".");
	} else if (operators.has(event.key)) {
		setOperator(event.key);
	} else if (event.key === "=" || event.key === "Enter") {
		calculate();
	} else if (event.key === "Delete") {
		clearAll();
	}
});
