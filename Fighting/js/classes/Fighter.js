import {Sprite} from "./Sprite.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

export class Fighter extends Sprite{
    constructor({position, velocity, imageSrc, scale = 1, framesMax = 1, offset = {x: 0, y: 0}, sprites, attackBox = { offset: {}, width: undefined, height: undefined }}) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
            sprites
        })
        
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.gravity = 0.7;
        this.lastKey;

        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height,
        };

        this.isAttacking;
        this.health = 100;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 5;
        this.sprites = sprites;
        this.lastKey;
        this.dead = false;
        this.direction;
        
        for(const sprite in this.sprites){
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }
    }

    switchSprite(sprite){
        if(this.image === this.sprites.death.image){
            if(this.framesCurrent === this.sprites.death.framesMax - 1){
                this.dead = true;
            }
            return;
        }
        if(this.image === this.sprites.attack1.image && this.framesCurrent < this.sprites.attack1.framesMax - 1) return;
        if(this.image === this.sprites.attack1Left.image && this.framesCurrent < this.sprites.attack1Left.framesMax - 1) return;
        if(this.image === this.sprites.takeHit.image && this.framesCurrent < this.sprites.takeHit.framesMax - 1) return;
        if(this.image === this.sprites.takeHitLeft.image && this.framesCurrent < this.sprites.takeHitLeft.framesMax - 1) return;
        switch(sprite){
        case "idle": 
        if(this.image !== this.sprites.idle.image){
            this.image = this.sprites.idle.image;
            this.framesMax = this.sprites.idle.framesMax;
            this.framesCurrent = 0;
        }

            break
        case "run":
            if(this.image !== this.sprites.run.image){
                this.image = this.sprites.run.image;
                this.framesMax = this.sprites.run.framesMax;
                this.framesCurrent = 0;
            }
            break
        case "jump":
            if(this.image !== this.sprites.jump.image){
                this.image = this.sprites.jump.image;
                this.framesMax = this.sprites.jump.framesMax;
                this.framesCurrent = 0;
            }
            break
        case "fall":
            if(this.image !== this.sprites.fall.image){
                this.image = this.sprites.fall.image;
                this.framesMax = this.sprites.fall.framesMax;
                this.framesCurrent = 0;
            }
            break
        case "attack1":
            if(this.image !== this.sprites.attack1.image){
                this.image = this.sprites.attack1.image;
                this.framesMax = this.sprites.attack1.framesMax;
                this.framesCurrent = 0;
            }
            break
        case "takeHit":
            if(this.image !== this.sprites.takeHit.image){
                this.image = this.sprites.takeHit.image;
                this.framesMax = this.sprites.takeHit.framesMax;
                this.framesCurrent = 0;
            }
            break
        case "death":
            if(this.image !== this.sprites.death.image){
                this.image = this.sprites.death.image;
                this.framesMax = this.sprites.death.framesMax;
                this.framesCurrent = 0;
            }
            break
        case "idleLeft": 
        if(this.image !== this.sprites.idleLeft.image){
            this.image = this.sprites.idleLeft.image;
            this.framesMax = this.sprites.idleLeft.framesMax;
            this.framesCurrent = 0;
        }

            break
        case "runLeft":
            if(this.image !== this.sprites.runLeft.image){
                this.image = this.sprites.runLeft.image;
                this.framesMax = this.sprites.runLeft.framesMax;
                this.framesCurrent = 0;
            }
            break
        case "jumpLeft": 
            if(this.image !== this.sprites.jumpLeft.image){
                this.image = this.sprites.jumpLeft.image;
                this.framesMax = this.sprites.jumpLeft.framesMax;
                this.framesCurrent = 0;
            }
            break
        case "fallLeft":
            if(this.image !== this.sprites.fallLeft.image){
                this.image = this.sprites.fallLeft.image;
                this.framesMax = this.sprites.fallLeft.framesMax;
                this.framesCurrent = 0;
            }
            break
        case "attack1Left":
            if(this.image !== this.sprites.attack1Left.image){
                this.image = this.sprites.attack1Left.image;
                this.framesMax = this.sprites.attack1Left.framesMax;
                this.framesCurrent = 0;
            }
            break
        case "takeHitLeft":
            if(this.image !== this.sprites.takeHitLeft.image){
                this.image = this.sprites.takeHitLeft.image;
                this.framesMax = this.sprites.takeHitLeft.framesMax;
                this.framesCurrent = 0;
            }
            break
        case "deathLeft":
            if(this.image !== this.sprites.deathLeft.image){
                this.image = this.sprites.deathLeft.image;
                this.framesMax = this.sprites.deathLeft.framesMax;
                this.framesCurrent = 0;
            }
            break
        }

    }

    takeHit(){
        this.health -= 20;

        if(this.health <= 0){
            if(this.lastKey === "d" || this.lastKey === "ArrowLeft"){
                this.switchSprite("death");
            }else if(this.lastKey === "a" || this.lastKey === "ArrowRight"){
                this.switchSprite("deathLeft")
            }
        }else {
            if(this.lastKey === "ArrowRight"){
                this.switchSprite("takeHitLeft");
            }else if(this.lastKey === "ArrowLeft"){
                this.switchSprite("takeHit")
            }
            if(this.lastKey === "a"){
                this.switchSprite("takeHitLeft");
            }else if(this.lastKey === "d"){
                this.switchSprite("takeHit")
            }
        }
    }
    
    updateAttackBox() {
        let ss = 0;
        if(this.lastKey === "a" ){
            this.direction = "left";
            ss = 300;
        }else if(this.lastKey === "ArrowRight"){
            this.direction = "left";
            ss = -300;
        }else if(this.lastKey === "d" || this.lastKey === "ArrowLeft"){
            this.direction = "right"
            ss = 0;
        }
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x - (this.direction === "left" ? ss : -ss);
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
    }
    update() {
        if(this.health <= 0){
            this.switchSprite("death");
        }
        
        if((this.position.x + 70 >= canvas.width && this.velocity.x > 0) || (this.position.x < 0 && this.velocity.x < 0)){
            this.velocity.x = 0;
        }
        
        if((this.position.y + 70 >= canvas.width && this.velocity.y > 0) || (this.position.y < 0 && this.velocity.y < 0)){
            this.velocity.y = 0;
        }
        this.draw();
        
        if(!this.dead)
            this.animateFrames();
        
        this.updateAttackBox();

        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0;
            this.position.y = 330;
        } else this.applyGravity();
    }

    applyGravity() {
        this.velocity.y += this.gravity;
    }

    attack() {
        if(this.lastKey === "d" || this.lastKey === "ArrowLeft"){
            this.switchSprite("attack1");
        } else if(this.lastKey === "a" || this.lastKey === "ArrowRight"){
            this.switchSprite("attack1Left");
        }
        this.isAttacking = true;
    }
}
