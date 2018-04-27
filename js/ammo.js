class Ammo {
    constructor(game) {
        this.game = game;
        this.selectedAmmo = null;
        this.canvasAmmo = this.game.canvasAmmo;
        this.contextAmmo = this.game.contextAmmo;
        this.birds = {};
    }

    selectAmmo(name) {
        if (this.birds[name] != null) {
            this.selectedAmmo = this.birds[name];
            this.game.engine.aimLine.updateLauncher();
        }
        else if (name == "noAmmo"){
            this.selectedAmmo = null;
            this.game.engine.aimLine.updateLauncher();
        }
    }

    decAmount(){
        this.selectedAmmo.decAmount();
        if(this.selectedAmmo.amount == 0){
            for (var key in this.birds) {
                if (this.birds[key].amount > 0) {
                    this.selectAmmo(key)
                    return;
                }
            }
            //Plus aucune munition
            this.selectAmmo("noAmmo")
        }
    }
    addAmmo(bird, defaultAmmo) {

        this.birds[bird.name] = bird;
        if (defaultAmmo == true)
            this.selectedAmmo = this.birds[bird.name];
    }

    update() {
        this.clearCanvas();
        var xPos = 0;

        for (var key in this.birds) {
            this.birds[key].drawAmmo(xPos);
            xPos += 60;
        }
    }

    clearCanvas(dt) {
        this.contextAmmo.clearRect(0, 0, this.canvasAmmo.width, this.canvasAmmo.height);
    }

    selectingAmmo(x, y) {
        for (var key in this.birds) {
            if (this.birds[key].hasThis(x, y) && this.birds[key].amount > 0) {
                this.selectAmmo(key)
                break;
            }
        }

    }
}