export default class Base {

	constructor(screenWidth, screenHeight, img) {
		//Get image and image size in pixels		
		this.img = img;
		this.imgWidth = this.img.width;
		this.imgHeight = 50;

		//Get the positions of the image in the screen;
		this.lengthSeqImages;
		this.initPosition = 0;
		this.positions = [];		
		this.seqImages = [];

		//Get screen width and height
		this.constWidth = screenWidth;
		this.width = screenWidth;
		this.height = screenHeight;
	};

	getLength() {
		
		for(this.width; this.width + this.imgWidth > this.initPosition - this.imgWidth; this.width -= this.imgWidth) {
			this.seqImages.push(this.width + this.imgWidth);			
		};
		
		this.positions = [...this.seqImages];
		this.lengthSeqImages = this.seqImages.length;			
		
	};

	update(deltatime, ctx) {

		//Loop in each position of the screen where the image must fill;
		for(this.lengthSeqImages; this.lengthSeqImages >= -1; this.lengthSeqImages--) {
			ctx.drawImage(this.img, this.seqImages[this.lengthSeqImages], this.height - this.imgHeight, this.imgWidth, this.imgHeight);	
		}
		
		//Checks if lengthSeqImages get out of the index;
		if(this.lengthSeqImages <= -1) {
			this.lengthSeqImages = this.seqImages.length;
		}

		//Update the image. 		
		this.seqImages = this.seqImages.map((value, i) => {		
			if(value < this.positions[i] - this.imgWidth) {
				value = this.positions[i];
				return value
			} else {
				return value - 4;				
			};
			
		});


	};

};