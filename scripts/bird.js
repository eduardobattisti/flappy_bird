export default class Bird {
    constructor(screenWidth, screenHeight) {
        this.direction;
        
        this.width = 30;
        this.height = 25;		

        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;		
		this.birdMovement = [
			new Image(this.width, this.height),
			new Image(this.width, this.height),
			new Image(this.width, this.height)
		];

        this.maxSpeed = 4;
        this.speed = 0;
		this.initTime = 0;
		this.counter = 0;

        this.position = {
            x: this.screenWidth / 2 - this.width / 2,
            y: this.screenHeight / 2 - this.height / 2
        };

    };	

    draw(timestamp, ctx) {		

		//Bird flap animation		
		//Define each src Image
		this.birdMovement[0].src = "../assets/sprites/bluebird-downflap.png";
		this.birdMovement[1].src = "../assets/sprites/bluebird-midflap.png";
		this.birdMovement[2].src = "../assets/sprites/bluebird-upflap.png" ;

		//Draw each bird movement in the screen		
		ctx.drawImage(this.birdMovement[this.counter], this.position.x, this.position.y, this.width, this.height);	

		if(this.initTime + 50 <= timestamp) {
			this.initTime = timestamp;
			if(this.counter >= 2) {
				this.counter = 0;
			} else {
				this.counter++
			};
		};		

		if(this.direction === "jump") {
			//ctx.translate(this.position.x, this.position.y);
			//ctx.rotate(270);
			//ctx.translate(this.position.x, this.position.y);
		};  

    }

	jump(ctx) {
		this.speed = -10;
		this.direction = "jump";		
	}

    moveLeft() {
        this.speed = -this.maxSpeed;
        this.direction = "x";
    }

    moveRight() {
        this.speed = this.maxSpeed;
        this.direction = "x";
    }

    moveUp() {
        this.speed = -this.maxSpeed;
        this.direction = "y";
    }

    moveDown() {
        this.speed = this.maxSpeed;
        this.direction = "y";
    }

    stop() {
        this.speed = 0;
    }

    update(deltaTime, base) {
        if(!deltaTime) return;   
		this.position.y += 3;					

		//Move between x and y 
        if(this.direction === "x") {
            this.position.x += this.speed;
        };

        if(this.direction === "y") {
            this.position.y += this.speed;
        };

		if(this.direction === "jump") {
			this.position.y += this.speed;
		};
        
        //Checks if the element is in the edge of the screen and stop it.
        if(this.position.x < 0) {
            this.position.x = 0;
        }
            
        if(this.position.x + this.width >= this.screenWidth) {
            this.position.x = this.screenWidth - this.width;
        }
            
        if(this.position.y < 0) {
            this.position.y = 0;
        }
            
        if(this.position.y + this.height >= this.screenHeight - base.imgHeight) {
            this.position.y = this.screenHeight - this.height - base.imgHeight;        
        };
            
    };
};