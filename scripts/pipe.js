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
		this.screenX2 = this.constWidth * 2;
		this.width = screenWidth;
		this.height = screenHeight;

		//Top Pipe;
		this.constWidthTop = -screenWidth;
		this.widthTop = screenWidth;
		this.heightTop = screenHeight;

		//Top pipe variables
		this.lengthSeqImagesTop;
		this.initPositionTop = 0;
		this.positionsTop = [];		
		this.seqImagesTop = [];

	};

	getLength(ctx) {
		
		//Bottom pipe
		for(this.screenX2; this.screenX2 > 640; this.screenX2 -= 160) {
			this.seqImages.push(this.screenX2 - this.imgWidth)	
		};
	
		this.positions = [...this.seqImages];
		this.lengthSeqImages = this.seqImages.length;
		
		//------------------------
		//Top pipe
		ctx.save()
		ctx.translate(this.constWidth, this.height);
        ctx.rotate(180 * Math.PI/180);

		for(this.widthTop; this.widthTop > -160; this.widthTop -= 160) {
			this.seqImagesTop.push(-this.widthTop);	
		};	

		this.positionsTop = [...this.seqImagesTop]
		this.lengthSeqImagesTop = this.seqImagesTop.length;	
		ctx.restore();		
		
	};

	update(deltatime, ctx) {

		//Bottom pipe
		//Loop in each position of the screen where the image must fill;
		for(this.lengthSeqImages; this.lengthSeqImages >= -1; this.lengthSeqImages--) {
			ctx.drawImage(this.img, this.seqImages[this.lengthSeqImages], this.height - this.imgHeight, this.imgWidth, this.imgHeight);	
		};

		//Checks if lengthSeqImages get out of the index;
		if(this.lengthSeqImages <= -1) {
			this.lengthSeqImages = this.seqImages.length;
		};

		//Update the image. 		
		this.seqImages = this.seqImages.map((value, i) => {		
			if(value < -this.imgWidth) {
				value = this.constWidth + this.imgWidth * 2;
				return value
			} else {
				return value - 2;				
			};
			
		});		

		ctx.save()
		//----------------------------
		//Top pipe
		//Rotate and translate the top pipe to be draw.
		ctx.translate(this.constWidth, this.height);
        ctx.rotate(180 * Math.PI/180);

		for(this.lengthSeqImagesTop; this.lengthSeqImagesTop >= -1; this.lengthSeqImagesTop--) {
			ctx.drawImage(this.img, this.seqImagesTop[this.lengthSeqImagesTop], this.height, this.imgWidth, -this.imgHeight);	
		}
	  	
		//Checks if lengthSeqImages get out of the index;
		if(this.lengthSeqImagesTop <= -1) {
			this.lengthSeqImagesTop = this.seqImages.length;
		}
		
		//Update the image. 				
		this.seqImagesTop = this.seqImagesTop.map((value, i) => {		
			if(value > -this.constWidthTop) {
				value = -this.imgWidth * 3;
				return value
			} else {
				return value + 2;				
			};
			
		});		
		//Restore Ctx behaviour to the beginning;
		ctx.restore();

	};

};