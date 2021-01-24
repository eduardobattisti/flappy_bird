export default class Pipe {

	constructor(screenWidth, screenHeight, img) {
		//Get image and image size in pixels		
		this.img = img;
		this.imgWidth = this.img.width;		
		this.imgHeight = 200;

		//Map the pipe positions in the screen;
		this.lengthSeqImages;
		this.initPosition = 0;
		this.positions = [];		
		this.seqImages = [];

		//Get screen width and height		
		this.constWidth = screenWidth;		
		this.width = screenWidth;
		this.height = screenHeight;

		//Top Pipe;
		this.constWidthTop = (-screenWidth / 2) - this.imgWidth;
		this.widthTop = (-screenWidth / 2) - this.imgWidth;
		this.heightTop = screenHeight;
	};

	getLength() {
		
		for(this.width; this.width + this.imgWidth > this.initPosition - this.imgWidth; this.width -= 200) {
			this.seqImages.push(this.width + this.imgWidth);	
		};
	
		this.positions = [...this.seqImages];
		this.lengthSeqImages = this.seqImages.length;						
	};

	update(deltatime, ctx) {


		//Loop in each position of the screen where the image must fill;
		for(this.lengthSeqImages; this.lengthSeqImages >= -1; this.lengthSeqImages--) {
			ctx.drawImage(this.img, this.seqImages[this.lengthSeqImages], this.height - 200, this.imgWidth, this.imgHeight);	
		}
		//ctx.drawImage(this.img, this.width, this.height - 200, this.imgWidth, this.imgHeight);	

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

		//Rotate and translate the top pipe to be draw.
		ctx.save()
		ctx.translate(this.constWidth/2, this.height/2);
        ctx.rotate(180 * Math.PI/180);
		ctx.drawImage(this.img, this.widthTop, this.height - 300, this.imgWidth, this.imgHeight);		

		//Restore Ctx behaviour to the beginning;
		ctx.restore();

		//Update the bottom Pipe position
		if(this.width <= -50) {
			this.width = this.constWidth;
		} else {
			this.width -= 4;
		};

		//Update the top Pipe position
		if(this.widthTop >= this.constWidth/2) {
			this.widthTop = this.constWidthTop;
		} else {
			this.widthTop += 4;
		};

		/*
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
		*/

	};

};