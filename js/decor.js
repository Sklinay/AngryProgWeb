class Decor {
	constructor(){
		this.type = "Grass"; //type par défaut
	}
	init(type){
		this.type = type;
		this.imagesPath = "ressources/" + this.type + "/";
		this.draw();
	}
	draw(){
		var canvas = document.getElementById("canvasDecor");
		var contexte = canvas.getContext("2d");
		this.drawBackground(canvas, contexte);
	}
	drawBackground(canvas, contexte){
		var background = new Image();
		background.src = this.imagesPath + "background.png";
		background.onload = function(){
			var ptrn = contexte.createPattern(background, 'repeat'); // Create a pattern with this image, and set it to "repeat".
		    contexte.fillStyle = ptrn;
		    contexte.fillRect(0, 0, canvas.width, canvas.height);
		}
	}
}
