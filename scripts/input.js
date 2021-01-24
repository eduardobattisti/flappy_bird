export default class InputHandler {

    constructor(bird) {
        document.addEventListener("keydown", e => {            
            switch(e.key) {
				case " ":
					bird.jump();
					break
                case "ArrowRight":
                    bird.moveRight()
                    break;
                case "ArrowLeft":
                    bird.moveLeft();
                    break;
                case "ArrowUp":
                    bird.moveUp();
                    break;
                case "ArrowDown":
                    bird.moveDown();
                    break;
            };
            
        });

        document.addEventListener("keyup", () => {
            bird.stop();
        });

    };

};