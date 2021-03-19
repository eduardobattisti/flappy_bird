export default class BirdCollapse {
	
	botPipeCollapse(pipeBot, bird, screen_height) {
		//Checks if the bird touchs the bottom pipe	
		
		let isBottomPipeTouched = pipeBot.seqImages.filter(value => {
			return value <= bird.position.x + bird.width &&
			value + pipeBot.imgWidth >= bird.position.x + bird.width &&
			screen_height - pipeBot.imgHeight <= bird.position.y + bird.height
		});		
	
		if(isBottomPipeTouched.length > 0) {
			console.log('bateuBot');
		}
	};

	topPipeCollapse(pipeTop, bird, screen_height) {	
		
		console.log(pipeTop)
		
		let isTopPipeTouched = pipeTop.seqImages.filter(value => {
			return value >= bird.position.x + bird.width &&
			value + pipeTop.imgWidth >= bird.position.x + bird.width &&
			screen_height - pipeTop.imgHeight >= bird.position.y + bird.height
		});		

		if(isTopPipeTouched.length > 0) {
			console.log('bateuTop');
		};

	};

};