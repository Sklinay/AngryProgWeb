class Line {
    constructor(game, o, t) {
        this.game = game;
        this.canvasJeu = this.game.canvasJeu;
        this.context = this.game.contextJeu;
        this.maxSize = 170;
        this.origin = o;
        this.target = t;
        this.launcherPos = Vector.ZERO;
        this.drawing = false;
        this.bullet = null;
    }; 
    
    updateLauncher(){
        if(this.bullet != null) this.game.engine.removeBody(this.bullet);        
        if(this.game.ammo.selectedAmmo == null) return;
        
        var s = {
            x: this.launcherPos.x-this.game.ammo.selectedAmmo.width/2,
            y: this.launcherPos.y-this.game.ammo.selectedAmmo.height/2,
            width: this.game.ammo.selectedAmmo.width,
            height: this.game.ammo.selectedAmmo.height,
            mass: Infinity,
            velocity: 0,
            elasticity: 0,
            isStatic: true,
            texture: this.game.ammo.selectedAmmo.texture,
            canCollide: false
        };
        
        this.bullet = new Sprite(this.context, s);
        this.game.engine.addBody(this.bullet);
    }
    
    startDrawn() {
        this.drawing = true;
    }
    
    stopDrawn() {
        this.drawing = false;
    }

    setOrigin(v) {
        this.origin = v;
    }

    setTarget(v) {
        //Calcul du vecteur allant de l'origin a (x,y), normalisation de sa taille pour la limiter à 150
        var tmp = this.origin.sub(v);
        var norm = tmp.norm() > this.maxSize ? this.maxSize : tmp.norm();
        this.target = tmp.normalize().mult(norm);
    }
    
    getFireVec() {
        return this.target.mult(1 / Constants.fireScale);
    }

    beginAim(v) {
        if(this.game.ammo.selectedAmmo == null) return;
        this.setOrigin(v);
        this.setTarget(v);
        this.startDrawn();
    }

    aiming(v) {
        if(this.game.ammo.selectedAmmo == null) return;
        this.setTarget(v);        
        this.bullet.moveAt(this.launcherPos.x - this.target.x-this.game.ammo.selectedAmmo.width/2,
                           this.launcherPos.y - this.target.y-this.game.ammo.selectedAmmo.height/2);
    }

    fire(target) {
        if(this.game.ammo.selectedAmmo == null) return;
        this.bullet.moveAt(this.launcherPos.x-this.game.ammo.selectedAmmo.width/2,
                           this.launcherPos.y-this.game.ammo.selectedAmmo.height/2);
        if (Math.abs(this.target.x) < 15 && Math.abs(this.target.y) < 15) return;

        var s = {
            x: this.launcherPos.x - this.target.x-this.game.ammo.selectedAmmo.width/2,
            y: this.launcherPos.y - this.target.y-this.game.ammo.selectedAmmo.height/2,
            width: this.game.ammo.selectedAmmo.width,
            height: this.game.ammo.selectedAmmo.height,
            mass: this.game.ammo.selectedAmmo.mass,
            velocity: this.getFireVec(),
            elasticity: this.game.ammo.selectedAmmo.elasticity,
            isStatic: false,
            texture: this.game.ammo.selectedAmmo.texture
        };
        var sprite = new Sprite(this.context, s);

        this.game.engine.addBody(sprite);
        this.game.ammo.decAmount();
        this.game.ammo.update();
    }

    draw() {
        if (this.drawing) {
            this.context.beginPath();
            this.context.moveTo(this.launcherPos.x, this.launcherPos.y);
            this.context.lineTo(this.launcherPos.x - this.target.x, this.launcherPos.y - this.target.y);
            this.context.stroke();
        }
    }

}