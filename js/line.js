class Line {
    constructor(context, o, t) {
        this.maxSize = 170;
        this.context = context;
        this.origin = o;
        this.target = t;
        this.launcherPos = Vector.ZERO;
        this.drawing = false;
    };

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
        this.setOrigin(v);
        this.setTarget(v);
        this.startDrawn();
    }

    aiming(v) {
        this.setTarget(v);
    }

    fire(target) {
        var s = {
            x: this.launcherPos.x - this.target.x,
            y: this.launcherPos.y - this.target.y,
            width: 30,
            height: 30,
            mass: 10,
            velocity: this.getFireVec(),
            elasticity : 0.5,
            isStatic: false,
            texture: 'bird1.png'
        };
        var sprite = new Sprite(this.context, s);

        window.game.engine.addBody(sprite);
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