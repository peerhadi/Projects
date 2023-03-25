let lostArray = [];
const options = {
    paraphrase: "To restate something in your own words",
    ostensible: "Appearing to be true",
    candor: "Frankness, openness",
    digress: "Wander, miander",
    uncanny: "Strange in a remarkable manner",
    morose : "Gloomy, depressed",
    congenial: "Sympathetic",
    adept: "Skilled, proficient",
    pragmatic: "Practical, based on practive",
    saturate: "Soak, permeate",
    capricious: "Inconstant,changeable",
    blatant: "Noisy, conspicuous",
    obligatory: "Required, mandatory",
    negligible: "Unimportant",
    adamant: "Inflexible, unyielding",
    sporadic: "Occasional, irregular",
    vanguard: "At the leading position",
    concur: "Agree",
    precociousness: "Early development",
    aloof: "Apart, at a distance",
    creed: "Belief",
    tawdry: "Cheap, showy",
    peevish: "Irritable, cross",
    arduous: "Difficult, hard",
    personable: "Attractive, handsome",
    resolute: "Unwavering, resolved",
    supposition: "An assumtion, theory",
    arbitrary: "Unreasoned",
    monotonous: "Lacking variety, dull",
    legacy: "An inheritance",
    manifold: "Numerous,varied",
    pliant: "Bending easily, flexible",
    retort: "A quick reply",
    obstinate: "Stubborn, uncompromising",
    lacerate: "Tear,mangle, wound",
    omnipotent: "All-powerful, having unlimited power",
    unscrupulous: "Untrustworthy, corrupt",
    renaissance: "Rebirth, revival",
    genesis: "Beggining, origin",
    warrant: "Justify, authorize",
    cantankerous: "Disagreable, argumentive",
    flippant: "Disrespectful in a frivolous way",
    subjugate: "Conquer, overwhelm completely",
    wry: "Twisted or distorted in an odd, amusing way",
    urbane: "Polished, suave",
    jargon: "A specialized and often pretentious vocabulary, language that is highly technical and difficult to understand.",
    prudent: "Cautious, thrifty",
    inviolable: "Secure, safe",
    commodious: "Spacious, roomy",
    proximity: "Nearness, closeness"
}

const message = document.getElementById("message");
const hintRef = document.querySelector(".hint-ref");
const controls = document.querySelector(".controls-container");
const startBtn = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInpSection = document.getElementById("user-input-section");
const resultText = document.getElementById("result");
const word = document.getElementById("word");
const words = Object.keys(options);
let randomWord = "";
let randomHint = ""
let winCount = 0;
let lossCount = 5;
let lostCount = 0;
let wonCount = 0;

const generateRandomValue = (array) => {
    let ans = Math.floor(Math.random() * array.length);
    if(controls.classList.contains("hide")){
        array.splice(array.indexOf(ans),1);
    }
    console.log(array.length)
    return ans
};


const blocker = () => {
    let lettersButtons = document.querySelectorAll(".letters")
    stopGame();
}


startBtn.addEventListener("click", () => {
    controls.classList.add("hide");
    init();
})

const stopGame = () => {
    controls.classList.remove("hide");
}


let wordsInEx = 50;
const generateWord = () => {
    if(lostArray.length === wordsInEx){
        alert("You have completed the list. Your percentage was " + Math.floor((wordsInEx - lostCount) / wordsInEx * 100));
        window.location.reload();
    }
    letterContainer.classList.remove("hide");
    userInpSection.innerText = "";
    randomWord = words[generateRandomValue(words)];
    randomHint = options[randomWord];
    console.log(randomWord)
    hintRef.innerHTML = `<div id="wordHint"><span>Hint: </span>${randomHint}</div>`;
    let displayItem = "";
    randomWord.split("").forEach(value => {
        displayItem += '<span class="inputSpace">_ </span>';
    })
    userInpSection.innerHTML = displayItem;
    userInpSection.innerHTML += `<div id="chanceCount">CHANCES LEFT: ${lossCount}</div>`;
}

const init = () => {
    winCount = 0;
    lossCount = 5;
    randomWord = "";
    word.innerText = "";
    randomHint = "";
    message.innerText = "";
    userInpSection.innerHTML = "";
    letterContainer.classList.add("hide");
    letterContainer.innerHTML = "";
    generateWord();

    for(let i = 65; i < 91; i++){
        let button = document.createElement("button");
        button.classList.add("letters");


        button.innerText = String.fromCharCode(i);

        
        button.addEventListener("click", () => {
            lostArray.push(randomWord);
            lostArray = Array.from(new Set(lostArray));
            let charArray = randomWord.toUpperCase().split("");
            let inputSpace = document.querySelectorAll(".inputSpace");

            if(charArray.includes(button.innerText)){
                message.innerText = `Correct Letter`;
                message.style.color = "#008000";
                charArray.forEach((chara,index) => {
                    if(chara === button.innerText){
                        button.classList.add("correct");
                        inputSpace[index].innerText = chara;

                        winCount += 1;
                        if(winCount === charArray.length){
                            wonCount++
                            resultText.innerHTML = "You Won";
                            startBtn.innerText = "Restart";
                            blocker();
                        }
                    }
                })
            }else {
                button.classList.add("incorrect");
                lossCount -= 1;
                document.getElementById("chanceCount").innerText = `Chances Left: ${lossCount}`;
                message.innerText = `Incorrect Letter`;
                message.style.color = "#ff0000";
                if(lossCount === 0){
                    lostCount++;
                    word.innerHTML = `The word was: <span>${randomWord}</span>`
                    result.innerHTML = "Game Over";
                    blocker();
                }
            }
            button.disabled = true;
        })
        letterContainer.appendChild(button);
    }
}


window.onload = () => {
    init();
};


