var Line = function (o, t) {
    this.origin = o;
    this.target = t;
    this.drawing = false;
};

Line.prototype.startDrawn = function (){
    this.drawing = true;
}
Line.prototype.stopDrawn = function (){
    this.drawing = false;
}

Line.prototype.setOrigin = function (x, y) {
    this.origin = new Vector(x, y);
};

Line.prototype.setTarget = function (x, y) {
    //Calcul du vecteur allant de l'origin a (x,y), normalisation de sa taille pour la limiter à 150
    var tmp = this.origin.sub(new Vector(x,y));
    var norm = tmp.norm() > 150 ? 150 : tmp.norm();
    this.target = tmp.normalize().mult(norm);        
};

Line.prototype.draw = function () {
    if (canvas.getContext && this.drawing) {
        ctx.beginPath();
        ctx.moveTo(this.origin.x, this.origin.y);
        ctx.lineTo(this.origin.x - this.target.x, this.origin.y - this.target.y);
        ctx.stroke();
    };
};