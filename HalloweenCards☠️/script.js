class AudioController{
    constructor(){
        this.bgMusic = new Audio("/Users/hadi/Desktop/Assets_Audio_creepy.mp3 ");
        this.flipSound = new Audio("/Users/hadi/Desktop/Assets_Audio_flip.wav ");
        this.matchSound = new Audio("/Users/hadi/Desktop/Assets_Audio_match.wav ");
        this.victorySound = new Audio("/Users/hadi/Desktop/Assets_Audio_victory.wav ");
        this.gameOverSound = new Audio("/Users/hadi/Desktop/Assets_Audio_gameOver.wav ");
        this.bgMusic.volumne = 0.2;
        this.bgMusic.loop = true;
    }
    startMusic(){
        this.bgMusic.play();
    }
    stopMusic(){
        this.bgMusic.pause();
        this.bgMusic.AudioControllercurentTime = 0;
    }
    flip(){
        this.flipSound.play();
    }
    match(){
        this.matchSound.play();
    }
    victory(){
        this.stopMusic();
        this.victorySound.play();
    }
    gameOver(){
        this.stopMusic();
        this.gameOverSound.play();
    }
}
class MixOrMatch{
    constructor(){
    }
    startGame(totalTime,cards){
        this.timeRemaining = totalTime;
        this.timer = document.getElementById("time-remaining");
        this.ticker = document.getElementById("flips");
        this.audioController = new AudioController(); 
        this.cardToCheck = null;
        this.totalClicks = 0;
        this.matchedCards = [];
        this.busy = true;
        
        setTimeout(() => {
            this.audioController.startMusic();
            this.shuffleCards(cards);
            this.countDown = this.startCountDown();
            this.busy = false
        },500);
        this.hideCards(cards);
        this.timer.innerText = this.timeRemaining;
        this.ticker.innerHTML = this.totalClicks;
    }

    hideCards(cards){
        cards.forEach(card => {
            card.classList.remove("visible");
            card.classList.remove("matched");
        })
    }
    
    flipCard(card,cards){
        if(this.canFlipCard(card)){
            this.audioController.flip();
            this.totalClicks++;
            this.ticker.innerHTML = this.totalClicks;
            card.classList.add("visible")

            if(this.cardToCheck)
                this.checkForCardMatch(card,cards)
                else
                    this.cardToCheck = card
        }
    }

    checkForCardMatch(card,cards){
        if(this.getCardType(card) === this.getCardType(this.cardToCheck)){
            this.cardMatch(card,this.cardToCheck,cards)
        }else{
            this.cardMisMatch(card,this.cardToCheck)
            this.cardToCheck = null;
        }
    }
    cardMatch(card1,card2,cards){
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        card1.classList.add("matched")
        card2.classList.add("matched")
        this.cardToCheck = null;
        this.audioController.match();
        if(this.matchedCards.length === cards.length){
            this.victory();  
        }
    }
    
    cardMisMatch(card1,card2){
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove("visible")
            card2.classList.remove("visible")
            this.busy = false;
        }, 1000)
    }
    
    getCardType(card){
        return card.getElementsByClassName("card-value")[0].src;
    }
    startCountDown(){
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000)
    }
    
    gameOver(){
        clearInterval(this.countDown);
        this.audioController.gameOver();
        document.getElementById("game-over-text").classList.add("visible");
    }
    victory(){
        clearInterval(this.countDown);
        this.audioController.victory();
        document.getElementById("victory-text").classList.add("visible");
    }
    shuffleCards(cards){
        for(let i = cards.length - 1; i > 0; i--){
            let randomIndex = Math.floor(Math.random() * (i + 1))
            cards[randomIndex].style.order = i;
            cards[i].style.order = randomIndex;
        }
    }
    
    canFlipCard(card){
        return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck );
    }
}
function ready(){
    let overlays = Array.from(document.getElementsByClassName("overlay-text"));
    let cards = Array.from(document.getElementsByClassName("card"));
    let game = new MixOrMatch(); 
    overlays.forEach(overlay => {
        overlay.addEventListener("click", () => {
            overlay.classList.remove("visible")
            game.startGame(100,cards);
        })
    })

    cards.forEach(card => {
        card.addEventListener("click", () => {
            game.flipCard(card,cards);
        });
    })
}

if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", ready());
} else {
    ready();
}


