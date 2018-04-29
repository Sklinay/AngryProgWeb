class Ammo {
    constructor(game) {
        this.game = game;
        this.selectedAmmo = null;
        this.canvasAmmo = this.game.canvasAmmo;
        this.contextAmmo = this.game.contextAmmo;
        this.aliens = {};
    }
    //Selectionne l'alien name comme munition actuelle
    selectAmmo(name) {
        if (this.aliens[name] != null) {
            this.selectedAmmo = this.aliens[name];
            this.game.engine.aimLine.updateLauncher();
        } else if (name == "noAmmo") {
            this.selectedAmmo = null;
            this.game.engine.aimLine.updateLauncher();
        }
    }
    //Retourne le nombre de munitions d'aliens restantes
    getRemainingAmmo() {
        var total = 0;
        for (var key in this.aliens) {
            total += this.aliens[key].amount;
        }
        return total;
    }
    //Décrémente de 1 les munitions de l'alien en cours. Si il atteint zéro, on sélectionne le suivant avec des munitions
    decAmount() {
        this.selectedAmmo.decAmount();
        if (this.selectedAmmo.amount == 0) {
            for (var key in this.aliens) {
                if (this.aliens[key].amount > 0) {
                    this.selectAmmo(key)
                    return;
                }
            }
            //Plus aucune munition
            this.selectAmmo("noAmmo")
        }
    }
    
    addAmmo(alien, defaultAmmo) {

        this.aliens[alien.name] = alien;
        if (defaultAmmo == true)
            this.selectedAmmo = this.aliens[alien.name];
    }

    //Dessine le canvas de munitions d'aliens
    update() {
        this.clearCanvas();
        var xPos = 0; //Décallage de 60 pixel à chaque itération pour faire une ligne de munitions
        for (var key in this.aliens) {
            this.aliens[key].drawAmmo(xPos);
            xPos += 60;
        }
    }

    clearCanvas() {
        this.contextAmmo.clearRect(0, 0, this.canvasAmmo.width, this.canvasAmmo.height);
    }
    
    //x,y coordonnées d'un clique, vérifie si un alien a été cliqué dans la liste de munitions, si oui on la selectionne
    selectingAmmo(x, y) {
        for (var key in this.aliens) {
            if (this.aliens[key].hasThis(x, y) && this.aliens[key].amount > 0) {
                this.selectAmmo(key)
                break;
            }
        }

    }
}