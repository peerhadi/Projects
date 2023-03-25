const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
export class Obstacle{
    constructor(){
        this.position = {
            x: canvas.width - 60,
            y: canvas.height - 80
        }

        this.velocity = 5;

        this.width = 130;
        this.height = 100;
        this.image = new Image();
        this.image.src = "./cactus.png";
    }

    draw(){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height);
    }

    update(){
        this.draw();
        this.position.x -= this.velocity;
        if(this.position.x < 0){
            this.position.x = canvas.width - 20
        }
    }
}
