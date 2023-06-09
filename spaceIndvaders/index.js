const scoreEl = document.getElementById("scoreEL")
const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

canvas.width = innerWidth;
canvas.height = innerHeight;
class Player{
    constructor(){
        
        this.velocity = {
            x: 0,
            y: 0
        }
        const image = new Image();
        image.src = "./images/spaceship.ong.png";
        image.onload = () => {
            const scale = 0.5
            this.image = image
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: canvas.width / 2 - this.width,
                y: canvas.height - this.height
            }
            this.rotation = 0;
            this.opacity = 1;
        }
    }
    
    draw(){
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(player.position.x + player.width / 2,player.position.y + player.height / 2)
        ctx.rotate(this.rotation);
        ctx.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2)
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width / 2,this.height / 2)
        ctx.restore();
    }
    update() {
         if(this.image){
            this.draw();
             this.position.x += this.velocity.x;
             this.position.y += this.velocity.y;
        }
    }
}
class Invader{
    constructor({position}){
        
        this.velocity = {
            x: 0,
            y: 0
        }
        const image = new Image();
        image.src = "./images/invader.png";
        image.onload = () => {
            const scale = 1
            this.image = image
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: position.x,
                y: position.y
            }
        }
    }
    
    draw(){
        ctx.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    }
    update({velocity}) {
        if(this.image){
            this.draw();
            this.position.x += velocity.x;
            this.position.y -= velocity.y;
        }
    }
    
    shoot(invaderProjectiles){
        invaderProjectiles.push(new InvaderProjectile({
            position: {
                x: this.position.x + this.width/2,
                y: this.position.y + this.height
            },
            velocity: {
                x: 0,
                y: 5
            }
        }))                     
    }
    
}

class Grid {
    constructor() {
        this.position = {
            x: 0,
            y: 0
        }
        this.velocity = {
            x: 10,
            y: 0
        }
        this.invaders = [];
        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)
        
        this.width = columns * 30;
        for(let x = 0; x < columns; x++){
            for(let y = 0; y < rows; y++){
                this.invaders.push(new Invader({
                    position: {
                        x: x * 30,
                        y: y * 30
                    }
                }
              )
            )
          }
        }
    }
    update(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.velocity.y = 0;
        
        if(this.position.x + this.width >= canvas.width || this.position.x <= 0){
            this.velocity.x = -this.velocity.x;
            this.velocity.y = -30
        }
    }
}


const keys = {
    d: {
        pressed: false
    },

    a: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

class Projectile{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;

        this.radius = 4;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.position.x,this.position.y,this.radius,0, Math.PI * 2)
        ctx.fillStyle = "dodgerblue";
        ctx.fill();
        ctx.closePath();
    }
    

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
class Particle{
    constructor({position, velocity,radius, color, fades}){
        this.position = position;
        this.velocity = velocity;

        this.radius = radius;
        this.color = color;
        this.opacity = 1;
        this.fades = fades
    }

    draw(){
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.position.x,this.position.y,this.radius,0, Math.PI * 2)
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    

    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.fades)
            this.opacity -= 0.01; 
    }
}
class InvaderProjectile{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
 
        this.width = 3;
        this.height = 10;
    }

    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width,this.height);
    }
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

let frames = 0;
const player = new Player();
const projectiles = []
const grids = [];
const invaderProjectiles = []
const particles = [];
let randomInterval = Math.floor((Math.random() * 500) + 500)
let game = {
    over: false,
    active: true
}
let score = 0;

for(let i = 0; i < 100; i++){
    particles.push(new Particle({
        position: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
            },
        velocity: {
            x: 0,
            y: 0.3
            },
        radius: Math.random() * 2,
        color: "white"
    }))
}
function createParticles({object,color,fades}){
    for(let i = 0; i < 15; i++){
        particles.push(new Particle({
            position: {
                x: object.position.x + object.width/4,
                y: object.position.y + object.height/2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 5,
            color: color || "#BAA0DE",
            fades: fades
        }))
    }
}

function animate(){
    if(!game.active) return
    requestAnimationFrame(animate)
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height)
    player.update();
    particles.forEach((particle,i) => {
        if(particle.position.y + particle.radius >= canvas.height){
            particle.position.x = Math.random() * canvas.width
            particle.position.y = -particle.radius;
        }
        if(particle.opacity <= 0){
            setTimeout(() => {
                particles.splice(i,1)
            }, 0)
        }else{
            particle.update()
        }
    })
    invaderProjectiles.forEach((invaderProjectile,index) => {
        if(invaderProjectile.position.y + invaderProjectile.height >= canvas.height){
            setTimeout(() => {
                invaderProjectiles.splice(index,1)
            }, 0)
        }else{
            invaderProjectile.update();
        }              
        if(invaderProjectile.position.y + invaderProjectile.height >= player.position.y && invaderProjectile.position.x + invaderProjectile.width  >= player.position.x && invaderProjectile.position.x <= player.position.x + player.width - 100){
            setTimeout(() => {
                invaderProjectiles.splice(index,1)
                game.over = true;
            }, 0)
            setTimeout(() => {
                game.active = false;
            },100)
            player.opacity = 0;
            createParticles({
                object: player,
                color: "white",
                fades: true
            })
        }
    })
    projectiles.forEach((projectile,index) => {

        if(projectile.position.y + projectile.radius <= 0){
            setTimeout(() => {
                projectiles.splice(index,1)
            },0)
        }else{
            projectile.update();
        }
    })
    grids.forEach((grid,gridIndex) => {
        grid.update()
        
        if(frames % 50 === 0 && grid.invaders.length > 0){
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles)
        }
        grid.invaders.forEach((invader,i) => {
            invader.update({velocity:grid.velocity})
        projectiles.forEach((projectile,j) => {
            if(projectile.position.y - projectile.radius <= invader.position.y && projectile.position.x + projectile.radius >= invader.position.x && projectile.position.x - projectile.radius <= invader.position.x && projectile.position.y + projectile.radius >= invader.position.y){
                setTimeout(() => {
                    const invaderFound = grid.invaders.find(invader2 => {
                        return invader2 === invader 
                    })
                    const projectileFound = projectiles.find(
                        projectile2 => projectile2 === projectile
                    )
                    if(invaderFound && projectileFound){
                        score+= 1
                        scoreEl.innerHTML = score;
                        createParticles({
                            object: invader,
                            fades: true
                        })
                        grid.invaders.splice(i,1)
                        projectiles.splice(j,1)
                        if(grid.invaders.length > 0){
                            const firstInvader = grid.invaders[0];
                            const lastInvader = grid.invaders[grid.invaders.length - 1]
                            grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
                            grid.position.x = firstInvader.position.x
                        }else{
                            grids.splice(gridIndex,1)
                        }
                    }
                }, 0)
            }
        })
        })
    })
    if(keys.a.pressed && player.position.x >= 0){
        player.rotation = -0.15;
        player.velocity.x = -7;
    }else if(keys.d.pressed && player.position.x + player.width <= canvas.width){
        player.rotation = 0.15;
        player.velocity.x = 7;
    }else{
        player.velocity.x = 0;
        player.rotation = 0;
    }
    if(frames % randomInterval === 0){
        frames = 0;
        grids.push(new Grid())
    }
    
    frames++
}
                              
animate()

addEventListener("keydown", ({ key }) => {
    if(game.over) return;
    switch(key) {
        case "a":
        keys.a.pressed = true;
        break;
    case "d":
        keys.d.pressed = true;
        break;
    case " ":
        projectiles.push(new Projectile({
            position: {
                x: player.position.x + player.width/4,
                y: player.position.y
            },
            velocity: {
                x: 0,
                y: -10
            }
        }))
        keys.space.pressed = true;
        break;
    }
})

addEventListener("keyup", ({ key }) => {
    switch(key) {
        case "a":
        keys.a.pressed = false;
        break;
    case "d":
        keys.d.pressed = false;
        break;
    case " ":
        keys.space.pressed = false
        break;
    }
})
