import {Projectile} from "./Projectile.js";
import {enemies} from "./Enemy.js";
import {Sprite} from "./Sprite.js";

const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

export class Building extends Sprite{
    constructor({position = {x:0,y:0}}){
        super({
            position,
            imageSrc: "./tower.png",
            frames:{
                max: 19,
            },
            offset: {
                x: 0,
                y: -80
            }
        })
        this.width = 64 * 2;
        this.height = 64;
        
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.projectiles = [];
        this.radius = 250;
        this.target;
    }
    
    draw(){
        super.draw();
    }

    update(){
        this.draw();
        if(this.target || !this.target && this.frames.current !== 0)
            super.update()
        
        if(this.target && this.frames.current === 6 && this.frames.elapsed % this.frames.hold === 0)
            this.shoot();
    }
    shoot(){
        this.projectiles.push(
            new	Projectile({
		            position: {
                    x: this.center.x - 20,
                    y: this.center.y - 110
                },
                enemy: this.target
            }))
    }

}

export const buildings = [];
   