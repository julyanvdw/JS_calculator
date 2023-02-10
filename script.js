// OPERATION FUNCTIONS

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b; 
}

function divide(a, b){
    return a / b;
}

function operate(operation, a, b){
    switch (operation){
        case "add":
            return add(a, b);
        case "subtract":
            return subtract(a, b);
        case "multiply":
            return multiply(a, b);
        case "divide":
            return divide(a, b);
    }
}

//HANDLING OPERANDS

let stored_operand = "",
    stored_value = 0,
    clear_on_next_type = false,
    reset_on_next_type = false,
    equals_toggle = false;

function doCalculation(operand){
    if (equals_toggle){
        stored_operand = operand;
        equals_toggle = false;
    } else {
        if (operand === "equals"){
            if ((stored_operand === "divide") && (current_value === 0)){
                dis.textContent = "ERROR!";
                reset_on_next_type = true;
            } else {
                let resulting_value = operate(stored_operand, stored_value, current_value);
                stored_value = parseFloat(resulting_value.toFixed(2));
                dis.textContent = stored_value;
                stored_operand = operand;
                clear_on_next_type = true;
                equals_toggle = true;
            }
        } else if (stored_operand === ""){
            stored_operand = operand;
            stored_value = current_value;
            clear_on_next_type = true;
        } else {
            if ((stored_operand === "divide") && (current_value === 0)){
                dis.textContent = "ERROR!";
                reset_on_next_type = true;
            } else {
                let resulting_value = operate(stored_operand, stored_value, current_value);
                stored_value = parseFloat(resulting_value.toFixed(2));
                dis.textContent = stored_value;
                stored_operand = operand;
                clear_on_next_type = true;
            }
        }
    }
}

//BUTTON LINKS
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function(){
        //add specific funciton depending on the button type
        if (button.id === "number"){
            if (clear_on_next_type){
                clearDisplay();
                clear_on_next_type = false;
            }
            if (reset_on_next_type){
                clearData();
                reset_on_next_type = false;
            }
            addToDisplay(button.value);
            btn_back.disabled = false;
        } else if (button.id === "clear") {
            clearData();
            btn_equals.disabled = false;
        } else if (button.id === "operand"){
            doCalculation(button.value);
            btn_equals.disabled = false;
            btn_back.disabled = true;
        }
    });
});

let btn_equals = document.querySelector("#equals");
btn_equals.disabled = true;
btn_equals.addEventListener('click', function(){
    doCalculation(btn_equals.value);
    btn_equals.disabled = true;
    btn_back.disabled = true;
});

let btn_back = document.querySelector("#backSpace");
btn_back.addEventListener('click', function(){
    removeFromDisplay();
});

//DISPLAY FUNCTIONS
const dis = document.querySelector("#display");
let current_value = 0;

function addToDisplay(number){
    current_value = (current_value * 10) + Number(number);
    dis.textContent = current_value;
}

function removeFromDisplay(){
    current_value = Math.floor(current_value / 10)
    dis.textContent = current_value;
}

function clearData(){
    clearDisplay()
    stored_operand = "";
    stored_value = 0;
    clear_on_next_type = false;
    equals_toggle = false;
}

function clearDisplay(){
    current_value = 0;
    dis.textContent = current_value;
}


