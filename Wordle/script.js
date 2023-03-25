const randomWords = require('random-words');

function generate(randomWords){
    let ans = randomWords();
    while(ans.length !== 5){
        ans = randomWords();
    }
    return ans;
}

let doneWords = [];
let container = document.querySelector(".container");
let winScreen = document.querySelector(".win-screen");
let submitButton = document.querySelector(".submit");
let inputCount, tryCount, inputRow;
let backSpaceCount = 0;
let randomWord, finalWord;

const isTouchDevice = () => {
    try {
        document.createEvent("TouchEvent")
        return true;
    } catch (e) {
        return false
    }
}

/*class Cursor {
    constructor() {
        this.row = 0;
        this.currentWord = "";
    }

    nextRow() {
        if (this.currentWord.length === 0) {
            this.row += 1;
            return true;
        }

        return false;
    }

    moveForward(c) {
        if (this.currentWord.length === 5) {
            return false;
        }

        this.currentWord += c;
        this.render(this.currentWord.length - 1, c);
    }

    moveBackward() {
        if (this.currentWord.length === 0) {
            return false;
        }

        this.currentWord = this.currentWord.substring(0, this.currentWord.length - 1);
        this.render(this.currentWord.length, ' ');
        return true;
    }

    render(index, c) {
        document.querySelectorAll(".input-box")[this.row * 5 + index].value = c;
    }

    resetWord() {
        this.currentWord = '';
    }
    
}

const cursor = new Cursor();

window.addEventListener("keyup", (e) => {
    switch(e.key) {
    case "Backspace":
        cursor.moveBackward();
        break;

    case "Enter":
        finalWord = cursor.currentWord;
        cursor.resetWord();
        validateWord();
        cursor.nextRow();
        break;

    default:
        if ("abcedefghijklmnopqrstuvwxyz".includes(e.key)) {
            cursor.moveForward(e.key);
        }
    }
});*/


function checker(e) {
    let value = e.target.value.toUpperCase();
    updateDivConfig(e.target, true);
  //  if(!Array.from("qwertyuiopasdfghjklzxcvbnm").includes(value)){
    //    return false;
    //;}
    if(!(Array.from("qwertyuiopasdfghjjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM").includes(value)) && value.length > 0){
        value = "";
        e.target.value = "";
        return false;
    }    
    if(value.length == 1){
        if(inputCount <= 4 && e.key != "Backspace"){
            if(finalWord.length <= 6){
                finalWord += value;
            }
            if(inputCount < 4){
                updateDivConfig(e.target.nextSibling,false);
            }
        }
        inputCount += 1;
    } else if(value.length == 0 && e.key == "Backspace"){
        finalWord = finalWord.substring(0, finalWord.length - 1);
        if(inputCount == 0){
            updateDivConfig(e.target,false);
            return false;
        }

        updateDivConfig(e.target, true);
        e.target.previousSibling.value = "";

        updateDivConfig(e.target.previousSibling, false);
        inputCount = -1;
    }

    if(inputCount === 6){
        selectedInput = 0;
    }
};

window.checker = checker;
let s = 0;


let inputGroup, inputCounta;
function startGame() {
    winScreen.classList.add("hide");
    container.innerHTML = "";
    inputCount = 0;
    succesCount = 0;
    tryCount = 0;
    finalWord = "";
    
    for(let i = 0; i < 6; i++){
        inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");
        for(let j = 0; j < 5; j++){
            inputCounta++;
            const input = document.createElement("input");
            input.setAttribute("class","input-box");
            input.id = `input_${i}_${j}`;
            input.setAttribute("maxlength","1");
            input.setAttribute("type","text");
            input.setAttribute("onkeyup","checker(event)");
            input.focus();
            input.disabled = false;
          
            inputGroup.appendChild(input);
        }
        container.appendChild(inputGroup);
    }

    inputRow = document.querySelectorAll(".input-group");
    inputBox = document.querySelectorAll(".input-box");
    updateDivConfig(inputRow[tryCount].firstChild, false);
    
    while(doneWords.includes(randomWords)){
        s += 2
        randomWord = generate(randomWords);
    }

    if(s === 0){
        randomWord = generate(randomWords);
    }
    randomWord = generate(randomWords);
    console.log(randomWord);
}

window.addEventListener("click", () => {
    updateDivConfig(document.getElementById(`input_${tryCount}_${inputCount}`), false);
})
const updateDivConfig = (element, disabledStatus) => {
    if(element){
        if(element.innerHTML){
            element.disabled = disabledStatus;
        }
        if(!disabledStatus){
            element.focus();
        }
    }
}

document.onkeydown = function(e){
    if(e.key === "Tab"){
        return false;
    }
}

window.addEventListener("keyup", (e) => {
    if(inputCount > 4){
        if(isTouchDevice()){
            submitButton.classList.remove("hide");
        }
        if(e.key == "Enter"){            
            validateWord()
        }

        
        if(e.key == "Backspace"){
            inputRow[tryCount].lastChild.value = "";
            finalWord = finalWord.substring(0, finalWord.length - 1);
            updateDivConfig(inputRow[tryCount].lastChild,false);
            inputCount -= 1;
        }
    } 
})

const validateWord = async () => {
    finalWord = Array.from(finalWord).map(x => x.toLowerCase()).join("");

    let currentInputs = inputRow[tryCount].querySelectorAll(".input-box");
    
    if(isTouchDevice())
        submitButton.classList.add("hide");
    

    
    let successCount = 0;
    let successLetters = "";
    for(let i in randomWord){
        if(finalWord[i] == randomWord[i]){
            currentInputs[i].classList.add("correct");
            successCount += 1;
            successLetters += randomWords[i];
        } else if(randomWord.includes(finalWord[i]) && !successLetters.includes(finalWord[i])){
            currentInputs[i].classList.add("exists");
        } else{
            currentInputs[i].classList.add("incorrect");
        }
    }

    tryCount += 1;
    console.log(tryCount);
    window.startGame = startGame;
    if(successCount == 5){
        doneWords.push(randomWord);
        for(let i = 0; i < 6; i++){
            for(let j = 0; j < 5; j++){
                document.getElementById(`input_${i}_${j}`).disabled = true;
            }
        }
        setTimeout(() => {
            const button = document.createElement("button");
            button.setAttribute("onclick","startGame()")
            button.innerHTML = "New Game";
            winScreen.classList.remove("hide");
            winScreen.innerHTML = `<span>You Won! Total guesses: ${tryCount}</span>`;
            winScreen.appendChild(button);
            document.querySelector("body").style.cursor = "pointer";
            winScreen.style.cursor = "pointer";
        },3400)
    } else {

        inputCount = 0;
        finalWord = "";
        
        if(tryCount == 6){
            tryCount = 0;
            for(let i = 0; i < 6; i++){
                for(let j = 0; j < 5; j++){
                    
                    document.getElementById(`input_${i}_${j}`).disabled = true;
                }
            }
            setTimeout(() => {
                const button = document.createElement("button");
                button.setAttribute("onclick","startGame()")
                button.innerHTML = "New Game";
                winScreen.classList.remove("hide");
                winScreen.innerHTML = `<span>You lose the word was ${randomWord.toUpperCase()}</span>`;
                winScreen.appendChild(button);
                document.querySelector("body").style.cursor = "pointer";
                winScreen.style.cursor = "pointer";
                return false;
            },3400)
        }
    }

    updateDivConfig(inputRow[tryCount].firstChild, false);
}

inputCount = 0;

window.onload = startGame();
