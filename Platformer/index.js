import {floorCollisions,platformCollisions} from "./js/data/collisions.js";
import {Player} from "./js/classes/Player.js";
import {Sprite} from "./js/classes/Sprite.js";
import {CollisionBlock} from "./js/classes/CollisionBlock.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const floorCollisions2D = [];
const collisionBlocks = [];


for(let i = 0; i < floorCollisions.length; i+= 36){
    floorCollisions2D.push(floorCollisions.slice(i, i+36));
}

const platformCollisions2D = [];

for(let i = 0; i < platformCollisions.length; i+= 36){
    platformCollisions2D.push(platformCollisions.slice(i, i+36));
}

floorCollisions2D.forEach((row,y) => {
    row.forEach((symbol,x) => {
        if(symbol === 202){
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 16,
                    y: y * 16
                }
            }))
        }
    })
})

const platformCollisionBlocks = [];
platformCollisions2D.forEach((row,y) => {
    row.forEach((symbol,x) => {
        if(symbol === 202){
            platformCollisionBlocks.push(new CollisionBlock({
                position: {
                    x: x * 16,
                    y: y * 16
                },
                height: 4,
            }))
        }
    })
})


const scaledCanvas = {
    width: canvas.width/4,
    height: canvas.height/4
}

const player = new Player({
    position: {
        x: 100,
        y: 300
    },
    collisionBlocks: collisionBlocks,
    platformCollisionBlocks,
    imageSrc: "./images/warrior/Idle.png",
    frameRate: 8,
    animations: {
        Idle: {
            imageSrc: "./images/warrior/Idle.png",
            frameRate: 8,
            frameBuffer: 3,
        },
        IdleLeft: {
            imageSrc: "./images/warrior/IdleLeft.png",
            frameRate: 8,
            frameBuffer: 3,
        },
        Run: {
            imageSrc: "./images/warrior/Run.png",
            frameRate: 8,
            frameBuffer: 5
        },
        RunLeft: {
            imageSrc: "./images/warrior/RunLeft.png",
            frameRate: 8,
            frameBuffer: 5
        },
        Jump: {
            imageSrc: "./images/warrior/Jump.png",
            frameRate: 2, 
            frameBuffer: 3
        },
        JumpLeft: {
            imageSrc: "./images/warrior/JumpLeft.png",
            frameRate: 2, 
            frameBuffer: 3
        },
        Fall: {
            imageSrc: "./images/warrior/Fall.png",
            frameRate: 2, 
            frameBuffer: 3
        },
        FallLeft: {
            imageSrc: "./images/warrior/FallLeft.png",
            frameRate: 2, 
            frameBuffer: 3
        },
        AttackOne: {
            imageSrc: "./images/warrior/Attack1.png",
            frameRate: 4, 
            frameBuffer: 1
        }
    }
})

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./images/background.png"
});

const backgroundImageHeight = 432;

const camera = {
    position: {
        x: 0,
        y: -backgroundImageHeight + scaledCanvas.height
    },
}
function animate(){
    requestAnimationFrame(animate);
    c.save();
    c.scale(4,4);
    c.translate(camera.position.x, camera.position.y)
    background.update();
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.update();
    })
    platformCollisionBlocks.forEach(block => {
        block.update();
    })

    player.checkForHorizontalCanvasCollision();
    player.update();

    player.velocity.x = 0;
    if(keys.d.pressed){
        player.velocity.x = 2
        player.switchSprite("Run");
        player.lastDirection = "right";
        player.shouldPanCameraToTheLeft({
            canvas,
            camera
        });
    } else if(keys.a.pressed){
        player.velocity.x = -2;
        player.switchSprite("RunLeft");
        player.lastDirection = "left"
        player.shouldPanCameraToTheRight({
            canvas,
            camera
        });
    }
    else if(player.velocity.y === 0){
        if(player.lastDirection === "right"){
            player.switchSprite("Idle")
        }
        if(player.lastDirection === "left"){
            player.switchSprite("IdleLeft")
        }
    }

    if(player.velocity.y < 0){
        player.shouldPanCameraDown({canvas, camera})
        if(player.lastDirection === "right") player.switchSprite('Jump');
        else player.switchSprite("JumpLeft")
    } else if(player.velocity.y > 0){
        player.shouldPanCameraUp({canvas, camera})
        if(player.lastDirection === "right"){
            player.switchSprite("Fall");
        }else{
            player.switchSprite("FallLeft");
        }
    }
    c.restore();
}

const keys = {
    d: {
        pressed: false
    },
    a: {
        pressed: false 
    }
}
animate();

window.addEventListener("keydown", (e) => {
    switch(e.key){
    case "d":
        keys.d.pressed = true;
        break
    case "a":
        keys.a.pressed = true;
        break
    case "w":
        player.velocity.y = -4;
        break
    }
})

window.addEventListener("keyup", (e) => {
    switch(e.key){
    case "d":
        keys.d.pressed = false;
        break
    case "a":
        keys.a.pressed = false;
        break
    }
})
