let circles
let r = 10;
let colors = ["#CABBFA", "#FFB5A6", "#DDD4FA", "#FAF3B9", "#BBFAE2"];
var a = [];
let gap = 5;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style('z-index','-1');
  background(255);
	circles = (width/(r + gap));
	for(var i = 0; i < circles; i++){
		a.push(new arcs((r + gap)*i))
	}
	frameRate(12);
}

function windowResized(){
	console.log("resized");
	resizeCanvas(windowWidth, windowHeight)	
}

function draw() {
	background(255);
	noFill();
	for(var i = 0; i < circles; i++){
		a[i].draw();
	}
}

class arcs{
	constructor(r){
		this.x = width/2;
		this.y = height/2;
		this.r = r;
		this.s = random(TWO_PI);
		this.e = random(TWO_PI);
		this.c = random(colors);
		this.sw = random(1,5);
		this.dir = random([-1, 1]);
		this.speed = random(0.1);
	}
	
	draw(){
		strokeWeight(this.sw);
		stroke(this.c);
		arc(this.x, this.y, this.r, this.r, this.s, this.e, OPEN);
		this.s += this.dir * this.speed;
		this.e += this.dir * this.speed;
		this.r += 2;
		//this.speed = map(r, 0, width, 0, 10);
		if(this.r > width){ this.reset();}
	}
	
	reset(){
		this.r = r + gap;
		this.s = random(TWO_PI);
		this.e = random(TWO_PI);
		this.c = random(colors);
		this.sw = random(1,5);
		this.dir = random([-1, 1]);
		this.speed = random(0.1);
	}
}
