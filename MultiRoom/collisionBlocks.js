const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

export class CollisionBlock {
      constructor({position}) {
          this.position = position;
          this.width = 64;
          this.height = 64;
      }
  
    draw() {
      }
  }
