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
        //this.bullet est l'aperçu de la munition, elle bouge avec la direction du tire
        
        //On la retire des bodies si elle existe
        if(this.bullet != null) this.game.engine.removeBody(this.bullet);  
        //S'il n'y a pas de munition seletionnée on annule
        if(this.game.ammo.selectedAmmo == null) return;
        
        //On génère un sprite de la munition inerte et on l'affiche à l'emplacement du launcher
        var bulletData = this.game.ammo.selectedAmmo.generateBullet(this.launcherPos,Vector.ZERO,true);        
        this.bullet = new Sprite(this.context, bulletData);
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
        //Calcul du vecteur allant de l'origin a (x,y), normalisation de sa taille pour la limiter à maxSize
        var tmp = this.origin.sub(v);
        var norm = tmp.norm() > this.maxSize ? this.maxSize : tmp.norm();
        this.target = tmp.normalize().mult(norm);
    }
    //Retourne la puissance du tire en fonction du vecteur de tire
    getFireVec() {
        return this.target.mult(1 / Constants.fireScale);
    }
    
    beginAim(v) {
        //S'il n'y a pas de munition seletionnée on annule
        if(this.game.ammo.selectedAmmo == null) return;
        this.setOrigin(v);
        this.setTarget(v);
        this.startDrawn();
    }

    aiming(v) {
        //S'il n'y a pas de munitions seletionnées on annule
        if(this.game.ammo.selectedAmmo == null) return;
        this.setTarget(v);
        //On déplace la munitions inerte (l'aperçu) en fonction de la souris
        this.bullet.moveAt(this.launcherPos.x - this.target.x-this.game.ammo.selectedAmmo.width/2,
                           this.launcherPos.y - this.target.y-this.game.ammo.selectedAmmo.height/2);
    }

    fire(target) {
        //S'il n'y a pas de munitions seletionnées on annule
        if(this.game.ammo.selectedAmmo == null) return;
        //On déplace la munitions inerte (l'aperçu) sur le launcher
        this.bullet.moveAt(this.launcherPos.x-this.game.ammo.selectedAmmo.width/2,
                           this.launcherPos.y-this.game.ammo.selectedAmmo.height/2);
        //Si le vecteur de tire est trop faible, on annule le tire
        if (Math.abs(this.target.x) < 15 && Math.abs(this.target.y) < 15) return;
        
        //On génère une "balle" de munitions et on l'ajoute au jeu
        var bulletData = this.game.ammo.selectedAmmo.generateBullet(this.launcherPos.sub(this.target),this.getFireVec());
        var sprite = new Sprite(this.context, bulletData,"ammo");
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