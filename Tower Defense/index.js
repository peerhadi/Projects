import {placementTiles,PlacementTile} from "./PlacementData.js";
import {enemies,Enemy,waypoints} from "./Enemy.js";
import {buildings,Building}  from "./Building.js";
import {Sprite} from "./Sprite.js"

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1280;
canvas.height = 760;

let activeTile = undefined;

c.fillStyle =  "white";
c.fillRect(0,0,canvas.width,canvas.height)


const mouse = {
    x: undefined,
    y: undefined
}

const image = new Image();
image.src = "./tower defense.png";

let enemyCount = 3;
let hearts = 10;
let coins = 100;

const explosions = [];

function spawnEnemies(spawnCount){
    for(let i = 1; i < spawnCount + 1; i++){
	      const xOffset = i * 300;
	      enemies.push(
            new Enemy({
		            position: {x: waypoints[0].x - xOffset, y: waypoints[0].y}
            })
	      )
    }
}

spawnEnemies(enemyCount)
function animate(){
    const animationId = requestAnimationFrame(animate);
    
    c.drawImage(image, 0, 0)
             
    if(enemies.length === 0){
        enemyCount+= 2
        spawnEnemies(enemyCount);
    }
        for(let i = enemies.length - 1; i >= 0; i--){
            const enemy = enemies[i];
            enemy.update();
            
            if(enemy.position.x > canvas.width) {
                hearts -= 1
                enemies.splice(i,1)
                document.querySelector("#hearts").innerHTML = hearts;
                
                if(hearts === 0){
                    cancelAnimationFrame(animationId);
                    document.querySelector("#gameOver").style.display = "flex";
                }
            }
        }
    console.log(explosions)
    for(let i = explosions.length - 1; i >= 0; i--){
        const explosion = explosions[i]
        explosion.draw();
        explosion.update();
        if(explosion.frames.current >= explosion.frames.max - 1){
            explosions.splice(i, 1)
        }
        
    }
    
    placementTiles.forEach(tile => {
        tile.update(mouse);
    })

    buildings.forEach((building) => {
        building.update()
        building.target = null;
        const validEnemies = enemies.filter((enemy) => {
            const xDifference = enemy.center.x - building.center.x
            const yDifference = enemy.center.y - building.center.y
            const distance = Math.hypot(xDifference,yDifference);
            return distance < enemy.radius + building.radius
        })
        
        building.target = validEnemies[0]
        for(let i = building.projectiles.length - 1; i >= 0; i--){
        const projectile = building.projectiles[i]
        
        projectile.update();
        
        const xDifference = projectile.enemy.center.x - projectile.position.x
        const yDifference = projectile.enemy.center.y - projectile.position.y
        const distance = Math.hypot(xDifference,yDifference);
            
            if(distance < projectile.enemy.radius + projectile.radius){
                building.projectiles.splice(i, 1)
                projectile.enemy.health -= 20
                if(projectile.enemy.health <= 0){
                    const enemyIndex = enemies.findIndex((enemy) => {
                        return projectile.enemy == enemy
                    })

                    if(enemyIndex > -1){
                        coins+= 25;
                        document.querySelector("#coins").innerHTML = coins;
                        enemies.splice(enemyIndex, 1)
                    }
                    explosions.push(new Sprite({
                        position: {x: projectile.position.x,y: projectile.position.y },
                        imageSrc: "./explosion.png",
                        frames: {max: 4},
                        offset: {x: 0, y: 0}
                    }))
                }
            }       
        }
    })
    
}
image.onload = () => {
    animate();
}

canvas.addEventListener("click", (event) => {
    if(activeTile && !activeTile.isOccupied && coins >= 50){
        coins -= 50
        document.querySelector("#coins").innerHTML = coins;
        buildings.push(new Building({
            position:{
                x: activeTile.position.x,
                y: activeTile.position.y
            }
        }));
        activeTile.isOccupied = true;
        buildings.sort((a,b) =>{
            return a.position.y - b.position.y
        })
        
    }
})

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    
    activeTile = null;
    for(let i = 0; i < placementTiles.length; i++){
        const tile = placementTiles[i];

        if (mouse.x > tile.position.x &&
            mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y &&
            mouse.y < tile.position.y + tile.size){
            activeTile = tile;
            break;
        }
    }
})

