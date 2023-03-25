import {Player} from "./Player.js";
import {Obstacle} from "./Obstacle.js";
const canvas = document.getElementById("canvas1");
let increment = true;
const ctx = canvas.getContext("2d");
const player = new Player({
    position: {
        x: 80,
        y: 160,
    },
});

const obstacle = new Obstacle();
let score = -1;
function animate() {
    const animationId = requestAnimationFrame(animate);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    obstacle.update();
    if (
        player.position.x <= obstacle.position.x + obstacle.width - 80 &&
        player.position.x + player.width >= obstacle.position.x &&
        player.position.y + player.height >= obstacle.position.y &&
        player.position.y <= obstacle.position.y + obstacle.height
    ) {
        const audio = new Audio();
        audio.src = "./die.wav";
        audio.play();
        document.getElementById("Game-over").style.display = "block";
        increment = false;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationId);
    }
}

document.querySelector("svg").addEventListener("click", function () {
    document.querySelector("svg").style.display = "none";
    window.addEventListener("keydown", (e) => {
        if (e.keyCode === 87 || e.keyCode === 32) {
            if (player.position.y >= 159) {
                const audio = new Audio();
                audio.src = "./jump.wav";
                audio.play();
                player.jump();
            }
        }
    });

    window.addEventListener("keyup", (e) => {
        if (e.key === "w") player.velocity = 0;
    });

    let Seeincrement = true;
    setInterval(function () {
        if (increment) score++;
        if (score % 100 === 0 && score > 0) {
            Seeincrement = false;
            const audio = new Audio();
            audio.src = "./point.wav";
            audio.play();
            setTimeout(() => {
                Seeincrement = true;
            }, 2000);
        }
        if (Seeincrement)
            document.getElementById("score").innerHTML = score + 1;
    }, 100);
    animate();
});
