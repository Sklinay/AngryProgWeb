class Menu {
    constructor(game){
		this.game = game;
		this.canvas = this.game.canvasMenu;
		this.context = this.game.contextMenu;
		this.shown = false;
        this.sizeButtonLevel = 200;
        this.sizeButton = 100;
        this.centre = new Vector(this.canvas.width/2, this.canvas.height/2);
        this.initButtons();
        this.initButtonsLevels();
        this.textInfo = "Game Paused";
	}
    //boutons pour relancer et aller au suivant
    initButtons(){
        this.buttons = new Array();
        this.buttonRestart = new MenuButton("Restart level", "ressources/Boutons/restart.png", this.canvas, this.context,
                                            this.centre.x-this.sizeButton-20, this.centre.y+this.sizeButton+20,
                                            this.sizeButton, this.sizeButton, true, this.game);
        this.buttonNext = new MenuButton("Next level", "ressources/Boutons/next_level.png", this.canvas, this.context,
                                            this.centre.x+20, this.centre.y+this.sizeButton+20,
                                            this.sizeButton, this.sizeButton, false, this.game);
        this.buttons.push(this.buttonRestart);
        this.buttons.push(this.buttonNext);
    }
    //boutons de choix de niveaux
    initButtonsLevels(){
        var nbLevels = 4; //a changer, il faudrait detecter le nb de niveaux qu'on a, pour l'instant on peut donner que un nombre pair
        this.buttonsLevels = new Array();
        //partie gauche
        var x=nbLevels/2 + 1;
        for (var i = 0; i < nbLevels/2; i++) {
            this.buttonsLevels.push(new MenuButtonLevel("Level "+(i+1)+"", "ressources/Screens/level"+(i+1)+".png", this.canvas, this.context,
                                                        this.centre.x-(this.sizeButtonLevel)*((nbLevels/2)-i) - 20*x, this.centre.y-120,
                                                        this.sizeButtonLevel, this.sizeButtonLevel, true));
            x = x -2;
        }
        //partie droite
        var j = 0;
        for (i; i < nbLevels; i++) {
            this.buttonsLevels.push(new MenuButtonLevel("Level "+(i+1)+"", "ressources/Screens/level"+(i+1)+".png", this.canvas, this.context,
                                                        this.centre.x+20*(j+1)+(this.sizeButtonLevel+20)*j, this.centre.y-120,
                                                        this.sizeButtonLevel, this.sizeButtonLevel, true));
            j++;
        }
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
        this.drawButtonsLevels();
        this.drawInfo();
	}
    //affiche les boutons de niveaux
    drawButtonsLevels(){
        for (var i = 0; i < this.buttonsLevels.length; i++) {
            this.buttonsLevels[i].draw();
        }
    }
    //affiche si la partie est en cours, gagnée ou perdue
    drawInfo(){
        this.context.font = "bold 60px Arial";
        this.context.strokeStyle = "#e7dfc2";
        this.context.fillStyle = "#A06D3D";
        this.context.textAlign = "center";
        this.context.strokeText(this.textInfo, this.centre.x, 100);
        this.context.fillText(this.textInfo, this.centre.x, 100);
    }
	clearCanvas() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
