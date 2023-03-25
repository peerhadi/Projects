window.onload = function(){
    let canv = document.getElementById("gc");
    let ctx = canv.getContext("2d")
    let dead = false;
    document.addEventListener("keydown",keyPush);
    let xv = 0;
    let yv = 0;
    let px = 10;
    let py = 15;
    let gs = 38;
    let tc = 31;
    let ax = 15;
    let ay = 15;
    let trail = [];
    let length = trail.length;
    let tail = 5;
    const myInterval = setInterval(game,1000/13);
    document.querySelector("#Score").innerHTML = "Score: " + (tail - 5);
    function game() {
    ctx.fillStyle = "black"
    ctx.fillRect(0,0, canv.height,canv.width)
    if(dead){
        clearInterval(myInterval)
    }
        px += xv;
        py += yv;

        ctx.fillStyle = "lime";
        for(var i = 0; i < trail.length; i++){
            
            if(i === trail.length - 1){
                ctx.fillStyle = "yellow"
                ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
                if(px > 20){
                    px = 31;
                    ctx.fillStyle = "yellow"
                    ctx.fillRect(trail[i - 1].x * gs, trail[i].y * gs, gs - 2, gs - 2);
                    dead = true;
                    window.location.reload();
                }
                if(px === -1){
                    px = 0
                    ctx.fillStyle = "yellow"
                    ctx.fillRect(trail[i - 1].x * gs, trail[i].y * gs, gs - 2, gs - 2);
                    dead = true;
                    window.location.reload();
                }
                if(py === 20){
                    py = 31;
                    dead = true;
                    window.location.reload();
                }
                if(py === -1){
                    py = 0;
                    dead = true;
                    window.location.reload();
                 }
                    
            }else{
                ctx.fillStyle = "lime"
                ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);
            }
        }
        trail.push({x:px,y:py});
        while(trail.length > tail){
            trail.shift();
        }
        if(ax == px && ay == py){
            tail++;
            document.querySelector("#Score").innerHTML = "Score: " + (tail - 5);
            ax = Math.floor(Math.random() * (20));
            ay = Math.floor(Math.random() * (20));
        }
        ctx.fillStyle = "red";
        ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2)
    }

    game();
    function keyPush(evt){
        switch(evt.keyCode){
        case 37:
            xv = -1;
            yv = 0;
            break;
        case 38:
            xv = 0;
            yv = -1;
            break;
        case 39:
            xv = 1;
            yv = 0;
            break;
        case 40:
            xv = 0;
            yv = 1;
            break;
        }
    }
}
