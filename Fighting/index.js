import {Sprite} from "./js/classes/Sprite.js";
import {Fighter} from "./js/classes/Fighter.js";
import {
    decreaseTimer,
    rectangularCollision,
    determineWinner,
    timerId,
} from "./js/utils.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./images/background.png",
});

const shop = new Sprite({
    position: {
        x: 600,
        y: 128,
    },
    imageSrc: "./images/shop.png",
    scale: 2.75,
    framesMax: 6,
});
const player = new Fighter({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    imageSrc: "./images/samuraiMack/idle.png",
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 157,
    },

    sprites: {
        idle: {
            imageSrc: "./images/samuraiMack/idle.png",
            framesMax: 8,
        },
        run: {
            imageSrc: "./images/samuraiMack/run.png",
            framesMax: 8,
        },
        jump: {
            imageSrc: "./images/samuraiMack/Jump.png",
            framesMax: 2,
        },
        fall: {
            imageSrc: "./images/samuraiMack/Fall.png",
            framesMax: 2,
        },
        attack1: {
            imageSrc: "./images/samuraiMack/Attack1.png",
            framesMax: 6,
        },
        takeHit: {
            imageSrc: "./images/samuraiMack/Take hit - white silhouette.png",
            framesMax: 4,
        },
        death: {
            imageSrc: "./images/samuraiMack/Death.png",
            framesMax: 6,
        },
        idleLeft: {
            imageSrc: "./images/samuraiMack/idleLeft.png",
            framesMax: 8,
        },
        runLeft: {
            imageSrc: "./images/samuraiMack/runLeft.png",
            framesMax: 8,
        },
        jumpLeft: {
            imageSrc: "./images/samuraiMack/JumpLeft.png",
            framesMax: 2,
        },
        fallLeft: {
            imageSrc: "./images/samuraiMack/FallLeft.png",
            framesMax: 2,
        },
        attack1Left: {
            imageSrc: "./images/samuraiMack/Attack1Left.png",
            framesMax: 6,
        },
        takeHitLeft: {
            imageSrc: "./images/samuraiMack/Take hitLeft.png",
            framesMax: 4,
        },
        deathLeft: {
            imageSrc: "./images/samuraiMack/Death.png",
            framesMax: 6,
        },
    },
    attackBox: {
        offset: {
            x: 100,
            y: 50,
        },
        width: 160,
        height: 50,
    },
});
const enemy = new Fighter({
    position: {
        x: 955,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 10,
    },
    imageSrc: "./images/kenji/idle.png",
    framesMax: 4,
    scale: 2.5,
    offset: {
        x: 215,
        y: 167,
    },

    sprites: {
        idle: {
            imageSrc: "./images/kenji/idle.png",
            framesMax: 4,
        },
        run: {
            imageSrc: "./images/kenji/run.png",
            framesMax: 8,
        },
        jump: {
            imageSrc: "./images/kenji/Jump.png",
            framesMax: 2,
        },
        fall: {
            imageSrc: "./images/kenji/Fall.png",
            framesMax: 2,
        },
        attack1: {
            imageSrc: "./images/kenji/Attack1.png",
            framesMax: 4,
        },
        takeHit: {
            imageSrc: "./images/kenji/Take hit.png",
            framesMax: 3,
        },
        death: {
            imageSrc: "./images/kenji/Death.png",
            framesMax: 7,
        },
        idleLeft: {
            imageSrc: "./images/kenji/idleLeft.png",
            framesMax: 4,
        },
        runLeft: {
            imageSrc: "./images/kenji/runLeft.png",
            framesMax: 8,
        },
        jumpLeft: {
            imageSrc: "./images/kenji/JumpLeft.png",
            framesMax: 2,
        },
        fallLeft: {
            imageSrc: "./images/kenji/FallLeft.png",
            framesMax: 2,
        },
        attack1Left: {
            imageSrc: "./images/kenji/Attack1Left.png",
            framesMax: 4,
        },
        takeHitLeft: {
            imageSrc: "./images/kenji/Take hitLeft.png",
            framesMax: 3,
        },
        deathLeft: {
            imageSrc: "./images/kenji/DeathLeft.png",
            framesMax: 7,
        },
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50,
        },
        width: 170,
        height: 50,
    },
});

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
};

decreaseTimer();

function animate() {
    if (!(player.dead || enemy.dead)) requestAnimationFrame(animate);
    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();

    player.update();
    enemy.update();

    player.velocity.x = 0;
    if (keys.a.pressed && player.lastKey === "a") {
        player.velocity.x = -5;
        player.switchSprite("runLeft");
    } else if (keys.d.pressed && player.lastKey === "d") {
        player.velocity.x = 5;
        player.switchSprite("run");
    } else {
        if(player.lastKey === "d"){
            player.switchSprite("idle");
        }else if(player.lastKey === "a"){
            player.switchSprite("idleLeft")
        }
    }
    
    if (player.velocity.y < 0) {
        if(player.lastKey === "d"){
            player.switchSprite("jump");
        }else if(player.lastKey === "a"){
            player.switchSprite("jumpLeft")
        }
    } else if (player.velocity.y > 0) {
        if(player.lastKey === "d"){
            player.switchSprite("fall");
        }else if(player.lastKey === "a"){
            player.switchSprite("fallLeft")
        }
    }
    
    enemy.velocity.x = 0;
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
        enemy.velocity.x = -5;
        enemy.switchSprite("run");
    } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
        enemy.velocity.x = 5;
        enemy.switchSprite("runLeft");
    } else {
        if(enemy.lastKey === "ArrowRight"){
            enemy.switchSprite("idleLeft");
        }else if(enemy.lastKey === "ArrowLeft"){
            enemy.switchSprite("idle")
        }
    }
    
    if (enemy.velocity.y < 0) {
        if(enemy.lastKey === "ArrowRight"){
            enemy.switchSprite("jumpLeft");
        }else if(enemy.lastKey === "ArrowLeft"){
            enemy.switchSprite("jump")
        }
    } else if (enemy.velocity.y > 0) {
        if(enemy.lastKey === "ArrowRight"){
            enemy.switchSprite("fallLeft");
        }else if(enemy.lastKey === "ArrowLeft"){
            enemy.switchSprite("fall")
        }
    }

    if (
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy,
        }) &&
        player.framesCurrent === 4
    ) {
        enemy.takeHit();
        player.isAttacking = false;
        document.querySelector("#enemyHealth").style.width = enemy.health + "%";
    }
    if (
        rectangularCollision({
            rectangle1: enemy,
            rectangle2: player,
        }) &&
        enemy.framesCurrent === 2
    ) {
        player.takeHit();
        document.querySelector("#playerHealth").style.width =
            player.health + "%";
    }

    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false;
    }

    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false;
    }

    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId});
    }
}

animate();

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "d":
            keys.d.pressed = true;
            player.lastKey = "d";
            break;
        case "a":
            keys.a.pressed = true;
            player.lastKey = "a";
            break;
        case "w":
            player.velocity.y = -20;
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = true;
            enemy.lastKey = "ArrowRight";
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = "ArrowLeft";
            break;
        case "ArrowUp":
            enemy.velocity.y = -20;
            break;
        case "s":
            player.attack();
            break;
        case "ArrowDown":
            enemy.attack();
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "d":
            keys.d.pressed = false;
            break;
        case "a":
            keys.a.pressed = false;
            break;
    }

    switch (e.key) {
        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            break;
    }
});
