class MenuButtonLevel extends MenuButton {
	constructor(name, dataPath, numLevel, imagePath, canvas, context,x,y, width, height, clickable, game){
		super(name, imagePath, canvas, context,x,y, width, height, clickable, game);
		this.dataPath = dataPath;
		this.numLevel = numLevel;
	}
	draw(){
		this.context.fillStyle ='#e7dfc2';
		this.context.fillRect(this.x, this.y, this.width, this.height);
		this.context.strokeStyle = '#dbd3b5';
		this.context.lineWidth = 10;
		this.context.strokeRect(this.x+10, this.y+10, this.width - 20, this.height - 20);
		this.drawImage();
		this.drawText();
		if (!this.clickable) {
			this.context.fillStyle ='rgba(0,0,0,0.8)'
			this.context.fillRect(this.x, this.y, this.width, this.height);
		}
	}
	drawImage(){
		if(!this.image.complete){
			let _this = this;
			this.image.onload = function (){
				 _this.context.drawImage(_this.image,0,0,_this.image.width, 2*(_this.image.height/3), _this.x+20, _this.y+20, _this.width - 40, 2*(_this.height/3) - 5);
			};
		}else {
			 this.context.drawImage(this.image,0,this.image.height/3,this.image.width, 2*(this.image.height/3), this.x+20, this.y+20, this.width - 40, 2*(this.height/3) - 5);
		}
	}
	drawText(){
		this.context.font = "bold 30px Arial";
		this.context.fillStyle = "#A06D3D";
		this.context.textAlign = "center";
		this.context.fillText(this.name,this.x+this.width/2, this.y + this.height-20);
	}
	click(){
		console.log("Loading "+this.name);
		this.game.currentLevel = new Loader(this.game, this.dataPath, this.numLevel);
		this.game.reload();
		this.game.menu.close();
		this.game.menu.initButtons();
	}
}
