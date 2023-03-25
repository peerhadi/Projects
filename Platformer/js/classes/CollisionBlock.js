const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

export class CollisionBlock{
    constructor({position,height = 16}){
        this.position = position;
        this.width = 16;
        this.height = height;
    }

    draw(){
    }

    update(){
        this.draw();
    }
}
