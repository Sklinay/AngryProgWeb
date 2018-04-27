class Body extends Rect {

    constructor(s) {
        super(s);
        this.mass = (s.mass==null?Infinity:s.mass) || 0;
        this.invMass = 1 / this.mass;
        //this._velocity = vel;
        this.velocity = new Vector(s.velocity.x, s.velocity.y);
        this.elasticity = s.elasticity;
        this.force = Vector.ZERO;
        this.hasCollision = false;
        this.isStatic = s.isStatic;
        this.angle = 0;
    }

    setCollision(b) {
        this.hasCollision = b;
    }


    /* Dectection de collision entre l'objet courrant et l'objet b.

       Renvoie null si pas de collision, sinon renvoie les nouveau vecteur vitesses
       pour l'objet courant et pour b
    */
    /*speedPolisher(v) {
        return new Vector(
            Math.abs(v.x) > Constants.minimalSpeed ? v.x : 0,
            Math.abs(v.y) > Constants.minimalSpeed ? v.y : 0,
        )
    }

    get velocity(){
        return this.speedPolisher(this._velocity);
    }

    set velocity(v){
        this._velocity = v;
    }*/


    collision(b) {
        var mdiff = this.mDiff(b);
        if (mdiff.hasOrigin()) { //Vérifie s'il y a collision entre b et this
            var vectors = [new Vector(0, mdiff.origin.y),
			new Vector(0, mdiff.origin.y + mdiff.height),
			new Vector(mdiff.origin.x, 0),
			new Vector(mdiff.origin.x + mdiff.width, 0)];

            //On détermine le vecteur de pénétration
            var vecPene = vectors[0];
            for (var i = 1; i < vectors.length; i++) {
                if (vectors[i].norm() < vecPene.norm())
                    vecPene = vectors[i];
            };

            var norm_v = this.velocity.norm();
            var norm_vb = b.velocity.norm();
            var kv = norm_v / (norm_v + norm_vb);
            var kvb = norm_vb / (norm_v + norm_vb);

            if (norm_v == 0 && norm_vb == 0) {
                if (this.invMass == 0 && this.invMass == 0)
                    return null;
                else {
                    if (this.mass <= b.mass)
                        kv = 1;
                    else
                        kvb = 1
                }

            };
            var vecPeneR = vecPene;
            vecPene = vecPene.normalize();

            // (2) On calcule l'impulsion j :
            var v = this.velocity.sub(b.velocity);
            //var e = Constants.elasticity; // pour les étudiants, juste faire var e = 1;
            var e = (this.elasticity + b.elasticity)/ 2
            var j = -(1 + e) * v.dot(vecPene) / (this.invMass + b.invMass);

            // (3) On calcule les nouvelle vitesse:
            var new_v = this.velocity.add(vecPene.mult(j * this.invMass));
            var new_bv = b.velocity.sub(vecPene.mult(j * b.invMass));

            b.setCollision(true);
            this.setCollision(true);

            return {
                vecPene: vecPeneR,
                kv: kv,
                kvb: kvb,
                velocity1: new_v,
                velocity2: new_bv
            };

        } else {
            return null;
        }
    }
}
