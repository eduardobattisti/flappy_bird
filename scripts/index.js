import Bird from "../scripts/bird.js";
import InputHandler from "../scripts/input.js";
import Background from "../scripts/background.js";
import Base from "../scripts/base.js";
import Pipe from "../scripts/pipe.js";
import BirdCollapse from "../scripts/birdCollapse.js";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 640;

//Setting Width and Height of Canvas Element
let canvas = document.getElementById("gameScreen");
let backgroundImg = document.getElementById("background");
let baseImg = document.getElementById("base");
let pipeImg = document.getElementById("pipe");

canvas.setAttribute("width", GAME_WIDTH);
canvas.setAttribute("height", GAME_HEIGHT);

let ctx = canvas.getContext("2d");

let bird = new Bird(GAME_WIDTH, GAME_HEIGHT);
let background = new Background(GAME_WIDTH, GAME_HEIGHT, backgroundImg);
let base = new Base(GAME_WIDTH, GAME_HEIGHT, baseImg);
let pipe = new Pipe(GAME_WIDTH, GAME_HEIGHT, pipeImg);
let birdCollapse = new BirdCollapse();

new InputHandler(bird);

let lastTime = 0;

base.getLength();	
background.getLength();
pipe.getLength(ctx);

const gameLoop = (timestamp) => {    
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;		
    
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);  		  
	
	//Updates the background position
	background.update(deltaTime, ctx);
	
	//Draw and updates the bird
	bird.draw(timestamp, ctx);
	bird.update(deltaTime, base);	

	//Updates the base and pipe position;
	pipe.update(deltaTime, ctx);
	base.update(deltaTime, ctx);
	birdCollapse.botPipeCollapse(pipe, bird, GAME_HEIGHT);
	birdCollapse.topPipeCollapse(pipe, bird, GAME_HEIGHT);
		

    requestAnimationFrame(gameLoop);
}       

gameLoop();