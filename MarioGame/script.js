const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1576;
canvas.height = 800;
const gravity = .5;
const button = document.getElementById("button");
let sjbtnc = false;
let superJump = false;
button.addEventListener("click", () => {
    if(!sjbtnc){
        superJump = true;
        sjbtnc = true;
    }
})
class Player {
    constructor(){
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 2
        }
        this.width = 66;
        this.height = 150;
        this.frames = 0;
        this.sprite = {
            stand: {
                right: "./images/spriteStandRight.png",
                left: "./images/spriteStandLeft.png",
                CropWidth:177,
                width: 66
            },
            run: {
                right: "./images/spriteRunRight.png",
                left: "./images/spriteRunLeft.png",
                CropWidth: 341,
                width:127.870
            }
        }

        this.currentSprite = new Image();
        this.currentSprite.src = this.sprite.stand.right;
        this.cp = this.currentSprite === (this.sprite.stand.right || this.sprite.stand.left) ? "sstr" : "srr"
        this.currentCropWidth = 177;
    }
    draw(){
        c.drawImage(this.currentSprite,this.currentCropWidth * this.frames,0,this.currentCropWidth,400,this.position.x,this.position.y,this.width,this.height);
    }
    update(){
        this.frames++
        if(this.frames > 59 && this.cp === "sstr"){
            this.frames = 0;
        }else if(this.frames > 29 && this.cp === "srr"){
            this.frames = 0;
        }
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        this.draw();
        this.velocity.y += gravity;
    }
}
class Platform {
    constructor({x , y}){
        this.position = {
            x,
            y
        }
        this.width = 570;
        this.height = 60;
        this.image = new Image();
        this.image.src = "./images/platform.png"
    }
    draw(){
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}
class Platfrom {
    constructor({x , y}){
        this.position = {
            x,
            y
        }
        this.width = 300;
        this.height = 60;
        this.image = new Image();
        this.image.src = "./images/platformSmallTall.png";
    }
    draw(){
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}

class GenericObject {
    constructor({x , y,height,src}){
        this.position = {
            x,
            y
        }
        this.height = height;
        this.image = new Image();
        this.image.src = src;
    }
    draw(){
        if(!this.height){
            c.drawImage(this.image,this.position.x,this.position.y)
        } else{
            c.drawImage(this.image,this.position.x,this.position.y,99999,this.height)
        }
    }
}

function init(){
    superJump = false;
    player = new Player();
    platforms = [new Platfrom({x: (577 * 3.5) + 390, y: 470}),new Platform({x: -1, y: 670}),new Platform({x: -1, y: 670}), new Platform({x: 700, y: 670}),new Platform({x: (577 * 2.5) + 100, y: 670}),new Platform({x: (577 * 3.5) + 100, y: 670}),new Platform({x: (577 * 4.5) + 800, y: 670}),new Platform({x:(577 * 5.5) + 800, y: 670})]
    genericObjects = [new GenericObject({x: -100,y : -200, height: 1000, src: "./images/platform2.png"}),new GenericObject({x: -1,y : 90, src: "./images/hills.png"})];
    scrollOffset = 0;
}
let WON = false;
let player = new Player();
let platforms = []
let genericObjects = []
let keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    },
    up: {
        pressed: false
    }
}
let scrollOffset = 0;
function animate(){
    if(!WON){
        requestAnimationFrame(animate);
    }
    c.fillStyle = "white";
    c.fillRect(0,0,canvas.width,canvas.height)
    genericObjects.forEach(platform => {
        platform.draw();
    })
    platforms.forEach(platform => {
        platform.draw();
    })
    player.draw();
    player.update();
    if(keys.right.pressed && player.position.x < 400){
        player.velocity.x = 10;
    }else if((keys.left.pressed && player.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)){
        console.log(scrollOffset)
        player.velocity.x = -10;
    }else{
        player.velocity.x = 0;

        if(keys.right.pressed){
            scrollOffset += 5;
            platforms.forEach(platform => {
                platform.position.x -= 10;
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x -= 10;
            })
        }else if(keys.left.pressed && scrollOffset > 0){
            scrollOffset -= 5;
            platforms.forEach(platform => {
                platform.position.x += 10;
            })
            genericObjects.forEach(genericObject => {
                genericObject.position.x += 10;
            })
        }
    }
    c.font = "50px Impact";
    if(player.position.x > platforms[platforms.length - 1].position.x + 100){
        c.fillStyle = "black";
        c.fillText("YOU WON", 50,75);
        c.fillStyle = "white";
        c.fillText("YOU WON", 55,80);
        WON = true;
    }
    if(player.position.y > canvas.height){
        init()
    }
    platforms.forEach(platform => {
        if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
            player.velocity.y = 0;
        }
    })
}
init()
animate();
window.addEventListener("keydown", (event) => {
    switch(event.keyCode){
    case 65:
        player.currentSprite.src = player.sprite.run.left;
        player.currentCropWidth = player.sprite.run.CropWidth;
        player.width = player.sprite.run.width;
        keys.left.pressed = true;
        break;
    case 68:
        player.currentSprite.src = player.sprite.run.right;
        player.currentCropWidth = player.sprite.run.CropWidth;
        player.width = player.sprite.run.width;
        keys.right.pressed = true;
        break;
    case 91:
        break;
    case 87:
        platforms.forEach(platform => {
            if(Math.floor(player.position.y + player.height + 0.5) === platform.position.y){
                if(!superJump){
                    player.velocity.y -= 1.666667;
                }else{
                    player.velocity.y -= 3;
                }
            }
        })
        break;
    }
})
window.addEventListener("keyup", (event) => {
    switch(event.keyCode){
    case 65:
        player.currentSprite.src = player.sprite.stand.left;
        player.currentCropWidth = player.sprite.stand.CropWidth;
        player.width = player.sprite.stand.width;
        keys.left.pressed = false;
        break;
    case 68:
        player.currentSprite.src = player.sprite.stand.right;
        player.currentCropWidth = player.sprite.stand.CropWidth;
        player.width = player.sprite.stand.width;
        keys.right.pressed = false;
        break;
    }
})
