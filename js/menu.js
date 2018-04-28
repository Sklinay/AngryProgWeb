class Menu {
    constructor(game){
		this.game = game;
		this.canvas = this.game.canvasMenu;
		this.context = this.game.contextMenu;
		this.shown = false;
        this.sizeButtonLevel = 200;
        this.sizeButton = 100;
        this.centre = new Vector(this.canvas.width/2, this.canvas.height/2);
        this.getInfoLevels();
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
        var nbLevels = this.levels.length; //pour que ça prenne - de place sur les lignes
        this.buttonsLevels = new Array();
        /*Si le nb de niveaux est pair*/
        if (nbLevels%2 == 0) {
            //partie gauche
            var x = nbLevels - 1;
            for (var i = 0; i < nbLevels/2; i++) {
                this.buttonsLevels.push(new MenuButtonLevel(this.levels[i].name, i+1, this.levels[i].miniature, this.canvas, this.context,
                                                            this.centre.x-(this.sizeButtonLevel)*((nbLevels/2)-i) - 20*x, this.centre.y-120,
                                                            this.sizeButtonLevel, this.sizeButtonLevel, true));
                x = x -2;
            }
            //partie droite
            var y = 0;
            for (i; i < nbLevels; i++) {
                this.buttonsLevels.push(new MenuButtonLevel(this.levels[i].name, i+1, this.levels[i].miniature, this.canvas, this.context,
                                                            this.centre.x+20*(y+1)+(this.sizeButtonLevel+20)*y, this.centre.y-120,
                                                            this.sizeButtonLevel, this.sizeButtonLevel, true));
                y++;
            }
        }
        /*Si le nb de niveaux est impair*/
        else {
            var halfLevels = Math.trunc(nbLevels/2)
            //partie gauche
            var x = halfLevels;
            var pos;
            for (var i = 0; i < halfLevels+1; i++) {
                pos = this.centre.x - this.sizeButtonLevel*x - 20*(2*x) - this.sizeButtonLevel/2;
                this.buttonsLevels.push(new MenuButtonLevel(this.levels[i].name, i+1, this.levels[i].miniature, this.canvas, this.context,
                                                            pos, this.centre.y-120,
                                                            this.sizeButtonLevel, this.sizeButtonLevel, true));
                x = x-1;
            }
            //partie droite
            x = 1;
            for (i; i < nbLevels; i++) {
                pos = this.centre.x + this.sizeButtonLevel/2 + 20*x*2 + this.sizeButtonLevel*(x-1);
                this.buttonsLevels.push(new MenuButtonLevel(this.levels[i].name, i+1, this.levels[i].miniature, this.canvas, this.context,
                                                            pos, this.centre.y-120,
                                                            this.sizeButtonLevel, this.sizeButtonLevel, true));
                x++;
            }
        }
    }
    //récupérer la liste des niveaux et leurs miniatures
    getInfoLevels(){
        var xmlhttp = new XMLHttpRequest();
        let _this = this;
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var world = JSON.parse(this.responseText);
                _this.readData(world);
            }
        };
        xmlhttp.open("GET", "./level/world.json", true);
        xmlhttp.send();
    }
    //lire les infos du json
    readData(world){
        this.levels = world.levels;
        this.initButtons();
        this.initButtonsLevels();
        this.textInfo = "Game Paused";
    }
    //ouvre le menu
    open(){
        this.game.pause = true;
        this.draw();
    }
    //ferme le menu
    close(){
        this.game.pause = false;
        this.clearCanvas();
    }
    //check si on click sur un bouton
    selectingButton(x,y){
        for (var i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].hasThis(x, y)) {
                this.buttons[i].click();
            }
        }
        for (var i = 0; i < this.buttonsLevels.length; i++) {
            if (this.buttonsLevels[i].hasThis(x, y)) {
                this.buttonsLevels[i].click();
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
