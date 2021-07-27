//probablities
let probWave = 0.001 //chance for each cell to start a wave;

let qc = 65; //percentage of quarter circles
let sc = 25; //percentage of semicircles
let tf = 7.5 //percentage of three fourths circles
let cc = 2.5 //percentage of full circles


let cols = 25;
let rows = 25;
var r;
var cellW, cellH;
var colors = ["#65F0B6", "#F0664D", "#F0DF59", "#4DF0AC", "#937DF0"];
var corner, acrLen;
var cells = [];

function setup() {
	createCanvas(windowHeight, windowHeight);
	r = width / cols;
	cellW = width / cols;
	cellH = height / rows;
	corner = [PI + PI / 2, 2 * PI, 2 * PI + PI / 2, PI];
	arcLen = [HALF_PI, PI, PI + HALF_PI, 2 * PI]
	background("#44396E");
	frameRate(100)

	for (var i = 0; i < cols; i++) {
		cells[i] = [];
		for (var j = 0; j < rows; j++) {
			cells[i][j] = new arcs(i * cellW + cellW / 2, j * cellH + cellH / 2, i, j);
		}
	}

	noStroke();
}

function draw() {
	background("#44396E");
	stroke(25);
	strokeWeight(0.9);


	for (i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			cells[i][j].draw();
			cells[i][j].update();

		}
	}
}

function mousePressed() {
	var x, y;
	x = Math.floor(mouseX / cellW);
	y = Math.floor(mouseY / cellH);
	cells[x][y].wave();
}

class arcs {
	constructor(x, y, i, j) {
		this.x = x;
		this.y = y;
		this.row = i;
		this.col = j;
		this.angle = random(corner);
		this.color = random(colors);
		this.counter = 0;
		this.arcL = HALF_PI;
		this.signal = false;
		this.clicked = false;
		this.neighbor = [];
		this.dir = 0;
		this.tFrame = 0;

		var rndom = random(100);
		if (rndom < qc) {
			this.arcL = arcLen[0];
		} else if(rndom < qc + sc){
			this.arcL = arcLen[1];
		} else if(rndom < qc + sc + tf){
			this.arcL = arcLen[2];
		} else{
			this.arcL = arcLen[3];
		}

	}

	wave() {
		this.dir = 0;
		this.clicked = true;
		this.tFrame = frameCount + 1;
	}

	draw() {
		push();
		translate(this.x, this.y);
		rotate(this.angle);
		noFill();
		stroke(this.color);
		strokeWeight(4);
		arc(0, 0, r, r, 0, this.arcL, OPEN);
		pop();
	}

	update() {
		if (this.signal) {
			var c;
			if (this.dir == 0) {
				if (this.row - 1 >= 0) {
					c = cells[this.row - 1][this.col];
					c.clicked = true;
					c.dir = 4;
					c.tFrame = frameCount + 1;
				}
				if (this.row + 1 < rows) {
					c = cells[this.row + 1][this.col];
					c.clicked = true;
					c.dir = 6;
					c.tFrame = frameCount + 1;
				}
				if (this.col - 1 >= 0) {
					c = cells[this.row][this.col - 1];
					c.clicked = true;
					c.dir = 2;
					c.tFrame = frameCount + 1;
				}
				if (this.col + 1 < cols) {
					c = cells[this.row][this.col + 1];
					c.clicked = true;
					c.dir = 8;
					c.tFrame = frameCount + 1;
				}
				if (this.row - 1 >= 0 && this.col - 1 >= 0) {
					c = cells[this.row - 1][this.col - 1];
					c.clicked = true;
					c.dir = 1;
					c.tFrame = frameCount + 1;
				}
				if (this.row + 1 < rows && this.col + 1 < cols) {
					c = cells[this.row + 1][this.col + 1];
					c.clicked = true;
					c.dir = 9;
					c.tFrame = frameCount + 1;
				}
				if (this.row + 1 < rows && this.col - 1 >= 0) {
					c = cells[this.row + 1][this.col - 1];
					c.clicked = true;
					c.dir = 3;
					c.tFrame = frameCount + 1;
				}
				if (this.row - 1 >= 0 && this.col + 1 < cols) {
					c = cells[this.row - 1][this.col + 1];
					c.clicked = true;
					c.dir = 7;
					c.tFrame = frameCount + 1;
				}
			} else if (this.dir == 4 && this.row - 1 >= 0) {
				c = cells[this.row - 1][this.col];
				c.clicked = true;
				c.dir = 4;
				c.tFrame = frameCount + 1;
			} else if (this.dir == 6 && this.row + 1 < rows) {
				c = cells[this.row + 1][this.col];
				c.clicked = true;
				c.dir = 6;
				c.tFrame = frameCount + 1;
			} else if (this.dir == 2 && this.col - 1 >= 0) {
				c = cells[this.row][this.col - 1];
				c.clicked = true;
				c.dir = 2;
				c.tFrame = frameCount + 1;
			} else if (this.dir == 8 && this.col + 1 < cols) {
				c = cells[this.row][this.col + 1];
				c.clicked = true;
				c.dir = 8;
				c.tFrame = frameCount + 1;
			} else if (this.dir == 1) {
				if (this.row - 1 >= 0 && this.col - 1 >= 0) {
					c = cells[this.row - 1][this.col - 1];
					c.clicked = true;
					c.dir = 1;
					c.tFrame = frameCount + 1;
				}
				if (this.row - 1 >= 0) {
					c = cells[this.row - 1][this.col];
					c.clicked = true;
					c.dir = 4;
					c.tFrame = frameCount + 1;
				}
				if (this.col - 1 >= 0) {
					c = cells[this.row][this.col - 1];
					c.clicked = true;
					c.dir = 2;
					c.tFrame = frameCount + 1;
				}
			} else if (this.dir == 9) {
				if (this.row + 1 < rows && this.col + 1 < cols) {
					c = cells[this.row + 1][this.col + 1];
					c.clicked = true;
					c.dir = 9;
					c.tFrame = frameCount + 1;
				}
				if (this.row + 1 < rows) {
					c = cells[this.row + 1][this.col];
					c.clicked = true;
					c.dir = 6;
					c.tFrame = frameCount + 1;
				}
				if (this.col + 1 < cols) {
					c = cells[this.row][this.col + 1];
					c.clicked = true;
					c.dir = 8;
					c.tFrame = frameCount + 1;
				}
			} else if (this.dir == 3) {
				if (this.row + 1 < rows && this.col - 1 >= 0) {
					c = cells[this.row + 1][this.col - 1];
					c.clicked = true;
					c.dir = 3;
					c.tFrame = frameCount + 1;
				}
				if (this.row + 1 < rows) {
					c = cells[this.row + 1][this.col];
					c.clicked = true;
					c.dir = 6;
					c.tFrame = frameCount + 1;
				}
				if (this.col - 1 >= 0) {
					c = cells[this.row][this.col - 1];
					c.clicked = true;
					c.dir = 2;
					c.tFrame = frameCount + 1;
				}
			} else if (this.dir == 7) {
				if (this.row - 1 >= 0 && this.col + 1 < cols) {
					c = cells[this.row - 1][this.col + 1];
					c.clicked = true;
					c.dir = 7;
					c.tFrame = frameCount + 1;
				}
				if (this.row - 1 >= 0) {
					c = cells[this.row - 1][this.col];
					c.clicked = true;
					c.dir = 4;
					c.tFrame = frameCount + 1;
				}
				if (this.col + 1 < cols) {
					c = cells[this.row][this.col + 1];
					c.clicked = true;
					c.dir = 8;
					c.tFrame = frameCount + 1;
				}
			}

			this.signal = false;
			this.dir = 0;
		} else if (this.clicked && this.tFrame == frameCount) {
			//this.color = colors[1]
			this.turn();
			this.clicked = false;
			this.signal = true;
			this.tFrame = 0;
		} else this.randomTurn();
	}

	randomTurn() {
		var rand = random(100);
		if (rand <= probWave) {
			this.clicked = true;
			this.tFrame = frameCount + 1;
		}
	}

	turn() {
		this.angle = this.angle + random(corner);
	}
}
