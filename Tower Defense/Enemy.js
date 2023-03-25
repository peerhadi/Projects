import {Sprite} from "./Sprite.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

export class Enemy extends Sprite{
    constructor({ position = {x: 0, y: 0} }){
        super({position,imageSrc: "./orc.png", frames: { max: 7 }})
        this.position = position;
        this.width = 100;
        this.height = 100;
        this.waypointIndex = 0;
        this.center = {
            x: this.position.x + this.width/2,
            y: this.position.y + this.height/2
        }
        this.radius = 50
        this.health = 100;
        this.speed = 3;
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw(){
        super.draw();
        
        c.fillStyle = "red";
        c.fillRect(this.position.x, this.position.y - 15, this.width,10)
        
        c.fillStyle = "green";
        c.fillRect(this.position.x, this.position.y - 15, this.width * this.health / 100,10)
    }

    update(){
        this.draw();
        super.update();
        
        const waypoint = waypoints[this.waypointIndex];
        const yDistance = waypoint.y - this.center.y;
        const xDistance = waypoint.x - this.center.x;
        const angle = Math.atan2(yDistance,xDistance)

        
        this.velocity.x = Math.cos(angle) * this.speed;
        this.velocity.y = Math.sin(angle) * this.speed;
        
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        
        this.center = {
            x: this.position.x + this.width/2,
            y: this.position.y + this.height/2
        }
            
        if(Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
           Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) &&
           this.waypointIndex < waypoints.length - 1 ){
            this.waypointIndex++;
        }
        
    }
}

export const enemies = [];


export const waypoints = [
  {
    x: -124.21331566744,
    y: 475.322954620735
  },
  {
    x: 276.581649552832,
    y: 472.01059953627
  },
  {
    x: 276.581649552832,
    y: 157.33686651209
  },
  {
    x: 735.342828751242,
    y: 158.993044054323
  },
  {
    x: 735.342828751242,
    y: 405.763497846969
  },
  {
    x: 606.160980457105,
    y: 407.419675389202
  },
  {
    x: 606.160980457105,
    y: 669.095727061941
  },
  {
    x: 1046.70420669096,
    y: 665.783371977476
  },
  {
    x: 1050.01656177542,
    y: 288.17489234846
  },
  {
    x: 1407.75091089765,
    y: 286.518714806227
  }
]


