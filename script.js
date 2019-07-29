let canvas = document.querySelector("#canvas");
canvas.width = 500;
canvas.height = 500;
canvas.style.backgroundColor = "black";

let c = canvas.getContext("2d");
let scale = 20;
let size = 20;
let center = 10;
let speed = 60;
let rows = canvas.height/scale;
let columns = canvas.width/scale;
let snake;
let direction;
	let index = 0;

function Snake() {
	this.x = 240;
	this.y = 240;
	this.xSpeed = size*1;
	this.ySpeed = 0;
	this.total = 0;

	this.tail = [];

	this.draw = function() {
		c.fillStyle = "white";
		if (this.total > 0) {
			for(let i=0; i<this.tail.length; i++) {
				c.fillRect(this.tail[i].x,this.tail[i].y, size,size);	
			}
		}
		c.fillRect(this.x,this.y, size,size);
	}

	this.update = function() {
		for(let i=0; i<this.tail.length-1; i++) {
			this.tail[i] = this.tail[i+1];
		}
		this.tail[index-1] = {x:this.x, y:this.y};
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		if (this.x > canvas.width) {
			this.x = 0;
		}
		if (this.y > canvas.height) {
			this.y = 0;
		}
		if (this.x < 0) {
			this.x = canvas.width-size;
		}
		if (this.y < 0) {
			this.y = canvas.height-size;
		}
	}

	this.changeDirection = function(direction) {
		switch(direction) {
			case "Up" :
				this.xSpeed = 0;
				if(this.tail.length > 0 && this.tail[index-1].y == this.y-size) return;
				this.ySpeed = -size*1;
				break;
			case "Down" :

				this.xSpeed = 0;
				if(this.tail.length > 0 && this.tail[index-1].y == this.y+size) return;
				this.ySpeed = size*1;

				break;
			case "Left" :
				if(this.tail.length > 0 && this.tail[index-1].x == this.x-size) return;
				this.xSpeed = -size*1;
				this.ySpeed = 0;
				break;
			case "Right" :
				if(this.tail.length > 0 && this.tail[index-1].x == this.x+size) return;
				this.xSpeed = size*1;
				this.ySpeed = 0;
				break;
		}
	}
	
	this.eatFood = function(food) {
		if(this.x === food.x && this.y === food.y) {
			index++;
			snake.total++;	
			return true;
		} else return false;
	}

	this.checkCollision = function() {
		if (this.total > 0) {
			for(let i=1; i<this.tail.length; i++) {
				if(this.x === this.tail[i].x && this.y === this.tail[i].y) {
					this.total = 0;
					this.tail = [];
					return true;
				} 
			}
		}
	}
}

function Food() {
	this.x;
	this.y;

	this.foodLocation = function() {
		this.x = (Math.floor(Math.random() * rows-1)+1)*scale;
		this.y = (Math.floor(Math.random() * columns-1)+1)*scale;
	}

	this.drawFood = function() {
		c.fillStyle = "red";
		c.fillRect(this.x,this.y, size,size)
	}

	this.updateFood = function() {
		if (this.x == snake.x) {
			this.foodLocation();
			this.drawFood();
		}
	}

}

(function setup() {
	snake = new Snake();
	food = new Food();
	food.foodLocation();

		
	
	window.setInterval( function() {
		c.clearRect(0,0, canvas.width, canvas.height);
		food.drawFood();
		snake.update();
		snake.draw();
		if(snake.checkCollision()) {
			alert(`Patay!`);
			return stop();
		}
		if(snake.eatFood(food)) {
				
			food.foodLocation();
		}

		// if(snake.tail.length > 0) {
		// 		if(snake.xSpeed == 0 && snake.tail[0].y == snake.y+size) {
		// 			console.log("eureka!");
		// 			console.log(snake.y)
		// 			console.log(snake.ySpeed == -size);
		// 		}
		// 	}

	}, speed);

	function stop() {
		clearInterval(window.setInterval());
	}
}());



window.addEventListener("keydown", function(event) {
	let direction = event.key.replace("Arrow", "");
	
		snake.changeDirection(direction);
})





