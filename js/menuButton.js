//classe des boutons de menu
class MenuButton {
    constructor(name, imagePath, canvas, context,x,y, width, height, clickable, game){
		this.name = name;
		this.imagePath = imagePath;
		this.canvas = canvas;
		this.context = context;
        this.image = new Image();
        this.image.src = this.imagePath;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.clickable = clickable;
		this.game = game;
	}
    //dessine les boutons
	draw(){
        this.context.fillStyle ='#e7dfc2';
		this.context.fillRect(this.x, this.y, this.width, this.height);
		this.context.strokeStyle = '#dbd3b5';
		this.context.lineWidth = 10;
		this.context.strokeRect(this.x+10, this.y+10, this.width - 20, this.height - 20);
		this.drawImage();
		if (!this.clickable) {
			this.context.fillStyle ='rgba(0,0,0,0.8)'
			this.context.fillRect(this.x, this.y, this.width, this.height);
		}
	}
    //dessine l'image dans le bouton (icone)
	drawImage(){
		if(!this.image.complete){
			let _this = this;
			this.image.onload = function (){
				 _this.context.drawImage(_this.image,0,0,_this.image.width, _this.image.height, _this.x+20, _this.y+20, _this.width - 40, _this.height - 40);
			};
		}else {
			 this.context.drawImage(this.image,0,0,this.image.width, this.image.height, this.x+20, this.y+20, 60, 60);
		}
	}
    //vérifie que le click est dans le bouton
	hasThis(x, y) {
        return (this.x < x && this.x + this.width > x) &&
            (this.y < y && this.y + this.height > y);
    }
    //appelé quand un click est fait sur un des 2 boutons
	click(){
        //si c'est le bouton restart
		if (this.name == "Restart level") {
			console.log("Restarting level...");
			console.log(this.game.currentLevel.levelNum);
			this.game.currentLevel = new Loader(this.game, this.game.menu.levels[this.game.currentLevel.levelNum].data, this.game.currentLevel.levelNum);
			this.game.reload();
			this.game.menu.close();
		}
        //si c'est le bouton next
		else if (this.name == "Next level"){
			console.log("Loading next level...");
			this.game.currentLevel = new Loader(this.game, this.game.menu.levels[this.game.currentLevel.levelNum+1].data, this.game.currentLevel.levelNum+1);
			this.game.reload();
			this.game.menu.close();
			this.game.menu.initButtons();
		}
	}
}
