class Line {
    constructor(context, o, t) {
        this.context = context;
        this.origin = o;
        this.target = t;
        this.drawing = false;
    };

    startDrawn() {
        this.drawing = true;
    }
    stopDrawn() {
        this.drawing = false;
    }

    setOrigin(x, y) {
        this.origin = new Vector(x, y);
    }

    setTarget(x, y) {
        //Calcul du vecteur allant de l'origin a (x,y), normalisation de sa taille pour la limiter à 150
        var tmp = this.origin.sub(new Vector(x, y));
        var norm = tmp.norm() > 150 ? 150 : tmp.norm();
        this.target = tmp.normalize().mult(norm);
    }

    draw() {
        if (this.drawing) {
            this.context.beginPath();
            this.context.moveTo(this.origin.x, this.origin.y);
            this.context.lineTo(this.origin.x - this.target.x, this.origin.y - this.target.y);
            this.context.stroke();
        }
    }

}