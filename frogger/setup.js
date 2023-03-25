const canvas = document.getElementById("canvas1");
const ctx1 = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas.getContext("2d");
canvas2.width = 600;
canvas2.height = 600;

const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas.getContext("2d");
canvas3.width = 600;
canvas3.height = 600;

const canvas4 = document.getElementById("canvas4");
const ctx4 = canvas.getContext("2d");
canvas4.width = 600;
canvas4.height = 600;

const canvas5 = document.getElementById("canvas5");
const ctx5 = canvas.getContext("2d");
canvas5.width = 600;
canvas5.height = 600;


const grid = 80;
let keys = [];
let score = 0;
let collosionsCount = 0;
let frame = 0;
let gameSpeed = 1;

const particlesArray = [];
const maxParticles = 300;
const ripplesArray = [];
const carsArray = [];
const logsArray = [];
let safe = false;

const background_1v12 = new Image();
background_1v12.src = "./images/background_lvl2.png";

const grass = new Image();
grass.src ="./images/grass.png"

const collosions = new Image();
collosions.src = "./images/collisions.png"

const turtle = new Image();
turtle.src = "./images/turtles.png"

const log = new Image();
log.src = "./images/log.png"

const car = new Image();
car.src = "./images/cars.png"
let numberOfCars = 3;

const froggerI = new Image();
froggerI.src = "./images/frog_spritesheet.png";
