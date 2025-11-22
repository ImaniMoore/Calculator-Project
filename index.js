//* creating variables that HTML elements
let userInput = document.getElementById("userInput");
let buttons = document.querySelectorAll("button");
// created arithmatic functions
function add(num1, num2) {
  return num1 + num2;
}
function subtract(num1, num2) {
  return num1 - num2;
}
function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "cannot divide by 0";
  } else {
    return num1 / num2;
  }
}

function squared(num1) {
  return num1 ** 2;
}

function exponent(num1, num2) {
  return num1 ** num2;
}
function squareroot(num1) {
  return Math.sqrt(num1);
}
// These variables keep track of the calculator's current progress:
// number1 = first number typed
// operator = the math symbol chosen (+, -, *, /, etc)
// operatorClicked = true after choosing an operator
// number2 = second number typed
// isLastNumber1 / isLastNumber2 / isLastOperator = used for the DELETE button
// The calculator() function turns number1 and number2 into real numbers so they can be calculated.
var number1 = "";
var operator = "";
var operatorClicked = false;
var number2 = "";
var isLastOperator = false;
var isLastNumber1 = false;
var isLastNumber2 = false;
function calculator(number1, operator, number2) {
  number1 = parseFloat(number1);
  number2 = parseFloat(number2);
  {
    var result;
    if (!number2 && operator != "squared") {
      result === "invalid operations";
    }
    if (operator == "+") {
      result = add(number1, number2);
    } else if (operator == "-") {
      result = subtract(number1, number2);
    } else if (operator == "^") {
      result = exponent(number1, number2);
    } else if (operator == "√") {
      result = squareroot(number1);
    } else if (operator == "*") {
      result = multiply(number1, number2);
    } else if (operator == "/") {
      result = divide(number1, number2);
    } else if (operator == "squared") {
      result = squared(number1);
    }
    return result;
  }
}
// Updates the calculator display:
// If type is "select", show number1, the operator, and number2.
// If type is "answer", show the final calculated result.
function setHTMLUserInput(number1, operator, number2, type, answer) {
  if (type === "select") {
    userInput.innerHTML = `${number1} ${operator} ${number2}`;
  } else if (type === "answer") {
    userInput.innerHTML = answer;
  }
}
// Handles every button press: updates number1, operator, or number2
// depending on what was clicked (numbers, operators, CLEAR, DELETE),
// and updates the display.
function buttonPress(value, op) {
  if (value == "CLEAR") {
    number1 = "";
    operator = "";
    number2 = "";
    isLastNumber1 = false;
    isLastOperator = false;
    isLastNumber2 = false;
    setHTMLUserInput(number1, operator, number2, "select");
  } else if (value == "DELETE") {
    if (isLastOperator) {
      operator = "";
      isLastOperator = false;
      isLastNumber1 = true;
      setHTMLUserInput(number1, operator, number2, "select");
    } else if (isLastNumber1) {
      number1 = number1.slice(0, -1);
      setHTMLUserInput(number1, operator, number2, "select");
    } else if (isLastNumber2) {
      number2 = number2.slice(0, -1);
      if (number2 === "") {
        isLastNumber2 = false;
        isLastOperator = true;
      }
      setHTMLUserInput(number1, operator, number2, "select");
    }
    // If an operator button is clicked and there is already a first number:
    // 1. Save the chosen operator
    // 2. Mark that the operator was clicked
    // 3. Update flags so we know the next input goes to number2
    // 4. Update the display to show number1, operator, and number2
  } else if (value == "operatorClick" && number1 !== "") {
    operator = op;
    operatorClicked = true;
    isLastNumber1 = false;
    isLastNumber2 = true;
    isLastOperator = false;
    setHTMLUserInput(number1, operator, number2, "select");
  }
  // Handles number and decimal button presses:
  // - If an operator has already been clicked, add the input to number2
  // - If no operator has been clicked yet, add the input to number1
  // Updates flags to track which part was last modified
  // Updates the display with the current input and operator.
  if (
    operatorClicked == true &&
    value != "operatorClick" &&
    value != "DELETE" &&
    value != "CLEAR"
  ) {
    number2 += value;
    isLastNumber1 = false;
    isLastNumber2 = true;
    isLastOperator = false;
    setHTMLUserInput(number1, operator, number2, "select");
  } else if (
    !operatorClicked &&
    value != "operatorClick" &&
    value != "DELETE" &&
    value != "CLEAR"
  ) {
    console.log(`current arguments: value: ${value}, operator: ${operator}`);
    number1 += value;
    isLastNumber1 = true;
    isLastNumber2 = false;
    isLastOperator = false;
    setHTMLUserInput(number1, operator, number2, "select");
  }
}
// Called when the equals (=) button is pressed
// 1. Calculates the result using number1, operator, and number2
// 2. Updates the display to show the result
// 3. Resets number2 and operator so you can continue calculating
//    (e.g., pressing + after getting a result will add to it)
// 4. Updates flags to reflect that number1 now holds the last result
function onEqual() {
  let result = calculator(number1, operator, number2);
  setHTMLUserInput(null, null, null, "answer", result);

  number1 = result.toString();
  number2 = "";
  operator = "";
  operatorClicked = false;

  isLastNumber1 = true;
  isLastNumber2 = false;
  isLastOperator = false;
}
// Adds click behavior to all buttons on the calculator
// 1. Determines the value of the button pressed
// 2. Checks if the button represents an operator and sets 'op' accordingly
// 3. If the button is "=" (submit), run onEqual()
// 4. If the button is CLEAR or DELETE, call buttonPress() with that value
// 5. If the button is an operator, call buttonPress() with value "operatorClick" and the operator
// 6. Otherwise (numbers or decimal), call buttonPress() with the value
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.value;
    let op = null;

    if (button.name === "multiply") op = "*";
    if (button.name === "exponent") op = "^";
    if (button.name === "subtract") op = "-";
    if (button.name === "addition") op = "+";
    if (button.name === "squared") op = "squared";
    if (button.name === "sqroot") op = "√";
    if (button.name === "divide") op = "/";

    if (button.type === "submit") {
      onEqual();
      return;
    }

    if (value === "CLEAR" || value === "DELETE") {
      buttonPress(value);
      return;
    }

    if (value === "operatorClick") {
      buttonPress(value, op);
      return;
    }

    buttonPress(value);
  });
});
