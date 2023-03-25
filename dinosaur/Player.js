const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = 1800;
canvas.height = 220;

export class Player{
    constructor({position}){
        this.position = position;
        this.velocity = 0;
        this.width = 60;
        this.height = 60;
        this.gravity = 1;
        this.image = new Image();
        this.image.src = "./dinosaur.png";
        this.canJump = true;
    }
    
    draw(){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    }

    jump(){
        this.velocity = -18;
    }

    update(){
        this.draw();
        
        this.position.y += this.velocity;
        if(this.position.y < canvas.height - this.height - 1){
            this.velocity += this.gravity;
        }
        
        
        if(this.position.y > canvas.height - this.height){
            this.position.y = canvas.height - this.height
        }
    }        
}
