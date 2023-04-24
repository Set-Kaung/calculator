const decimalRegex = /^\d+(\.\d+)?$/;

let numbersGrid = document.querySelector(".numbers");
let operatorsGrid = document.querySelector(".operators");
let history = document.querySelector(".history");
let recent = document.querySelector(".recent");
let buttons = document.querySelector(".buttons");
let equalBtn = document.querySelector(".equal");
let backSpaceBtn = document.querySelector(".backspace");
let clearBtn = document.querySelector(".clear");

let operationString = "";
let secondNum;
let recentString = "";
let historyString = "";
let answerAvailable = false;


for(var i =0; i<11;i++){
    var button = document.createElement("button");
    if(i == 10){
        button.textContent = "00";
    }else{
        button.textContent = `${i}`;
    }
    button.addEventListener("click",e => {getNumber(e)});
    numbersGrid.appendChild(button);
}




let decimal = document.createElement("button");
decimal.textContent = ".";
decimal.addEventListener("click",(e)=>{insertDecimal(e)});
numbersGrid.appendChild(decimal);

let height = numbersGrid.clientHeight;
operatorsGrid.style.height = `${height}`;

function updateDisplay(state,number){
    if(state === "operation"){
        temp = parseFloat(recentString);
        recentString = temp.toString();
        historyString = recentString + operationString;
        recentString ="";
        recent.textContent = recentString;
        history.textContent = historyString;
    }else if(state === "number"){
        recentString = recentString + number;
        recent.textContent = recentString;
    }else if(state == "decimal"){
        recent.textContent = recentString;
    }else if(state == "answer"){
        historyString= historyString + recentString;
        recentString = number;
        recent.textContent = recentString;
        history.textContent = historyString;
    }else if(state == "continuous"){
        historyString = recentString + operationString + secondNum;
        recentString = number;
        recent.textContent = recentString;
        history.textContent = historyString;
    }else if(state == "backspace"){
        recent.textContent = recentString;
        history.textContent = historyString;
    }else if(state = "clear"){
        recent.textContent = recentString;
        history.textContent = historyString; 
    }
}

function getNumber(e){
    if(recentString.length <= 11){
        let number = e.target.textContent;
        updateDisplay("number",number);
    }
    
}

function getOperation(e){
    if(operationString == "" && answerAvailable == false){
        operationString = e.target.textContent;
        updateDisplay("operation",null);
    }else if(answerAvailable == true){
        operationString = e.target.textContent;
        secondNum = null;
        answerAvailable = false;
        updateDisplay("operation",null);
        getOperation(e);
    }
    
}

function insertDecimal(e){
    if (recentString.indexOf('.') === -1) {
        recentString = recentString + ".";
        updateDisplay("decimal",null);
      } else {
        return false;
      }
}



function getAnswer(operation,recentString,historyString){
    let num1 = parseFloat(historyString);
    let num2 = parseFloat(recentString);
    secondNum = num2;
    let answer;
        switch(operation){
            case "+":
                answer= num1+num2;
                break;
            case "-":
                answer= num1-num2;
                break;
            case "/":
                if(num2 == 0){
                    answer = "Err";
                }else{
                    answer = num1/num2;
                }
                break;
            case "*":
                answer = num1*num2;
                break;
        }
    return answer
}

function getContinuousAnswer(operation,recentString){
    let num1 = parseFloat(recentString);
    let num2 = secondNum;
    let answer;
        switch(operation){
            case "+":
                answer= num1+num2;
                break;
            case "-":
                answer= num1-num2;
                break;
            case "/":
                if(num2 == 0){
                    answer = "Err";
                }else{
                    answer = num1/num2;
                }
                break;
            case "*":
                answer = num1*num2;
                break;
        }
    return answer

}

function equalController(){
    if(recentString == "" || historyString == ""){
        alert("Invalid Usage!");
    }else if(answerAvailable == false){
        answer = getAnswer(operationString,recentString,historyString);
        updateDisplay("answer",answer);
        answerAvailable = true;
    }else if(answerAvailable == true && secondNum != null){
        answer = getContinuousAnswer(operationString,recentString);
        updateDisplay("continuous",answer);
    }
}
function backSpace(){
    recentString = recentString.toString();
    if(recentString != "" || historyString == ""){
        recentString = recentString.slice(0,-1);
        updateDisplay("backspace",null);
    }else if(historyString != "" && recentString ==""){
        recentString = historyString.slice(0,-1);
        historyString ="";
        updateDisplay("backspace",null);
    }
}

function allClear(){
    if(recentString != "" || historyString != ""){
        recentString = "";
        historyString = "";
        updateDisplay("clear",null);
    }
}



operatorsGrid.childNodes.forEach((node)=>{node.addEventListener("click",(e)=>{getOperation(e)})})
equalBtn.addEventListener('click', equalController);
backSpaceBtn.addEventListener("click", backSpace);
clearBtn.addEventListener("click", allClear);
generateNumGrid();