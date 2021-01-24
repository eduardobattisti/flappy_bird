export default class Background {

	constructor(screenWidth, screenHeight, img) {
		this.constWidth = screenWidth;
		this.img = img;
		this.imgWidth = this.img.width;

		this.lengthSeqImages;
		this.initPosition = 0;
		this.positions = [];		
		this.seqImages = [];

		this.width = screenWidth;
		this.height = screenHeight;
	};

	getLength() {
		
		for(this.width; this.width + this.img.width > this.initPosition -  this.img.width; this.width -=  this.img.width) {
			this.seqImages.push(this.width +  this.img.width);			
		}

		this.positions = [...this.seqImages];
		this.lengthSeqImages = this.seqImages.length;

	};

	update(deltatime, ctx) {
							
		for(this.lengthSeqImages; this.lengthSeqImages >= -1; this.lengthSeqImages--) {			
			ctx.drawImage(this.img, this.seqImages[this.lengthSeqImages], 0, this.imgWidth, this.height);	
		}		

		if(this.lengthSeqImages <= -1) {
			this.lengthSeqImages = this.seqImages.length;
		}

		//Update the image. 
		this.seqImages = this.seqImages.map((value, i) => {		
			if(value < this.positions[i] - 288) {
				value = this.positions[i];
				return value
			} else {
				return value - 1;				
			};

			
		});				
	};

};