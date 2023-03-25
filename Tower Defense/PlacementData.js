const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

export class PlacementTile{
    constructor({position = {x:0, y: 0}}){
        this.position = position;
        this.size = 64;
        this.color = "rgba(255,255,255,0.15)";
    }

    draw(){
        c.fillStyle = this.color;
        c.fillRect(this.position.x,this.position.y, this.size, this.size)
    }

    update(mouse){
        this.draw()
    }
}

const placementTilesData = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0,
  0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14,
  0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0,
  0, 14, 0, 0, 0, 0, 14, 0, 0, 0, 14, 0, 14, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 14, 0, 0, 0, 14, 0, 14, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 14, 0, 14, 0, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
]

export const placementTiles = [];

const placementTilesData2D = [];

for(let i = 0; i < placementTilesData.length; i+= 20){
    placementTilesData2D.push(placementTilesData.slice(i, i + 20))
}

placementTilesData2D.forEach((row,ys) => {
    row.forEach((symbol,xs) => {
        if(symbol === 14){
            placementTiles.push(new PlacementTile({
                position: {
                    x: xs * 64,
                    y: ys * 64
                }
            })
           )
        }
    })
})


