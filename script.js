let numbersGrid = document.querySelector(".numbers");
let operators = document.querySelectorAll(".operator")
let history = document.querySelector(".history");
let recent = document.querySelector(".recent");
let equalBtn = document.querySelector(".equal");
let backSpaceBtn = document.querySelector(".backspace");
let clearBtn = document.querySelector(".clear");
let decimal = document.querySelector(".decimal");

let operationString = "";
let secondNum;
let recentString = "";
let historyString = "";
let answerAvailable = false;


for(var i =0; i<10;i++){
    var button = document.createElement("button");
        button.textContent = `${i}`;
    button.addEventListener("click",e => {getNumber(e)});
    if (i==9){
        button.classList.add("nine");
    }
    numbersGrid.appendChild(button);
}


decimal.addEventListener("click",(e)=>{insertDecimal(e)});

function updateDisplay(state,number){
    if(state === "operation"){
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
    }else if(state == "clear"){
        recent.textContent = recentString;
        history.textContent = historyString; 
    }
}

function getNumber(e){
    recentString = recentString.toString();
    if(recentString.length <= 14){
        let number = e.target.textContent;
        updateDisplay("number",number);
    }
    
}

function getOperation(e){
    if(operationString == "" || answerAvailable == false){
        operationString = e.target.textContent;
        updateDisplay("operation",null);
    }else if(answerAvailable == true && recentString != ""){
        operationString = e.target.textContent;
        secondNum = null;
        answerAvailable = false;
        updateDisplay("operation",null);
    }
    
}

function insertDecimal(){
    recentString = recentString.toString();
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
    let answer = ""
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
        answerAvailable = false;
    }
}



operators.forEach((node)=>{node.addEventListener("click",(e)=>{getOperation(e)})})
equalBtn.addEventListener('click', equalController);
backSpaceBtn.addEventListener("click", backSpace);
clearBtn.addEventListener("click", allClear);


