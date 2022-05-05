// variables
let currentScreen = document.querySelector('[data-current-screen]');
let previousScreen = document.querySelector('[data-previous-screen]');
let numbers = document.querySelectorAll('[data-number]');
let operatorBttns = document.querySelectorAll('[data-operator]');
let allClearBttn = document.querySelector('[data-all-clear]');
let deleteBttn = document.querySelector('[data-delete]');
let equalsBttn = document.querySelector('[data-equals]');
let currentNumber = null;
let previousNumber = null;
let operatorId = null;
let result = null;  
const DIVIDE = '÷';
const TIMES = '×';
const PLUS = '+';
const MINUS = '-';


// events
numbers.forEach(number => {number.addEventListener('click', setCurrentScreen)});
operatorBttns.forEach(operator => {operator.addEventListener('click', setPreviousScreen)});
allClearBttn.addEventListener('click', allClear);
deleteBttn.addEventListener('click', del);
equalsBttn.addEventListener('click', calculate);


// functions
function setCurrentScreen(event){

    if(currentScreen.innerHTML == '' && event.target.innerHTML == '.'){
        currentScreen.innerHTML = '0.'
    }
    
    if(currentScreen.innerHTML.includes('.') && event.target.innerHTML == '.' ){
        return
    }

    if(currentScreen.innerHTML ==  result){
        return
    }

    let appendNumber = document.createTextNode(event.target.innerHTML);
    currentScreen.appendChild(appendNumber);
    currentNumber = parseFloat(currentScreen.innerHTML);  
}

function setPreviousScreen(event){

    if(currentScreen.innerHTML == ''){
        return
    }

    if(operatorId == DIVIDE || operatorId == TIMES || operatorId == PLUS || operatorId == MINUS){

        calculate()
    }

    previousScreen.innerHTML = currentScreen.innerHTML + ' ' + event.target.innerHTML;
    previousNumber = currentNumber;
    currentScreen.innerHTML = '';
    
    if(event.target.innerHTML == '÷'){

        operatorId = DIVIDE;
    }else if(event.target.innerHTML == '×'){

        operatorId = TIMES;
    }else if(event.target.innerHTML == '+'){

        operatorId = PLUS;
    }else{

        operatorId = MINUS;
    }
}

function allClear(){

    previousScreen.innerHTML = '';
    currentScreen.innerHTML = ''; 
    operatorId = null;
}

function del(){

    if(currentScreen.innerHTML == ''){
        return
    }

    currentScreen.innerHTML = currentNumber.toString().slice(0,-1);
    currentNumber = parseFloat(currentScreen.innerHTML);
}

function calculate() {

    if(currentScreen.innerHTML == ''){
        return
    }

    if(operatorId == DIVIDE){

        result = previousNumber / currentNumber;
    }else if(operatorId == TIMES){

        result = previousNumber * currentNumber;
    }else if(operatorId == PLUS){

        result = previousNumber + currentNumber;
    }else if(operatorId == MINUS){

        result = previousNumber - currentNumber;
    }else if(operatorId == null){
        return
    }

    previousScreen.innerHTML = previousNumber + ' ' + operatorId + ' ' + currentNumber + ' ' + '=' ;
    currentScreen.innerHTML =  result;
    currentNumber = result;
    operatorId = null;   
}



