const explosions = [];
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let canvasPosition = canvas.getBoundingClientRect();
canvas.width = 500;
canvas.height = 700;
class Explosion {
    constructor(x,y){
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth / 2;
        this.height = this.spriteHeight / 2;
        this.x = x - this.width/2;
        this.y = y - this.height/2;
        this.image = new Image();
        this.image.src = "/Users/hadi/Desktop/images/Visual\ Effects/boom.png";
        this.frame = 0;
        this.timer = 0;
        this.sound = new Audio();
        this.sound.src = "/Users/hadi/Desktop/images/Visual\ Effects/Magic\ SFX\ Preview\ Pack/Ice\ attack\ 2.wav ";
    }
    update(){
        this.timer++;
        if(this.timer % 15 === 0){
            this.frame++;
        }
    }
    draw(){
        ctx.drawImage(this.image,this.spriteWidth * this.frame,0,this.spriteWidth,this.spriteHeight,this.x,this.y,this.width,this.height);
    }
}

window.addEventListener("mousemove", function(e){
    createAnimation(e)
})

function createAnimation(e){
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX,positionY))
}
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < explosions.length; i++){
        explosions[i].update();
        explosions[i].draw();
        if(explosions[i].frame > 5){
            explosions.splice(i,1);
            i--
        }
    }
    requestAnimationFrame(animate);
}
animate();
