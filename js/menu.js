class Menu {
    constructor(game){
		this.game = game;
		this.canvas = this.game.canvasMenu;
		this.context = this.game.contextMenu;
		this.shown = false;
        this.initButtons();
	}
    initButtons(){
        var centre = new Vector(this.canvas.width/2, this.canvas.height/2);
        this.buttonRestart = new MenuButton("Restart level", "ressources/Boutons/restart.png", this.canvas, this.context,centre.x-120, centre.y+120);
        this.buttonNext = new MenuButton("Next level", "ressources/Boutons/next_level.png", this.canvas, this.context,centre.x+20, centre.y+120);
        this.buttons = new Array();
        this.buttons.push(this.buttonRestart);
        this.buttons.push(this.buttonNext);
    }
    //ouvre le menu
    open(){
        this.game.pause = true;
        this.draw();
    }
    close(){
        this.game.pause = false;
        this.clearCanvas();
    }
    selectingButton(x,y){
        for (var i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].hasThis(x, y)) {
                this.buttons[i].click();
            }
        }
    }
	draw(){
        //noirci le fond
		this.context.fillStyle ='rgba(0,0,0,0.5)'
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        //créé les 2 boutons : restart et next level
        this.buttonRestart.draw();
        this.buttonNext.draw();
	}
	clearCanvas() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
