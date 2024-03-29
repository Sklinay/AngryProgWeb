class Body extends Rect {

    constructor(s) {
        super(s);
        this.mass = (s.mass === null ? Infinity : s.mass) || 0;
        this.invMass = 1 / this.mass;
        this.velocity = s.velocity === undefined?new Vector(0, 0):new Vector(s.velocity.x, s.velocity.y);
        this.elasticity = (s.elasticity === undefined ? 0 : s.elasticity);
        this.force = Vector.ZERO;
        this.hasCollision = false;
        this.isStatic = (s.isStatic === undefined ? false : s.isStatic);
        this.angle = 0;
        this.canCollide = (s.canCollide != null ? s.canCollide : true);    
        this.damageLevel = 0; 
        this.lifeMax = (s.life === undefined ? Infinity : s.life);
        this.life = this.lifeMax;
        this.damageFactor = (s.damageFactor === undefined ? 0 : s.damageFactor);
        this.speedFactor = (s.speedFactor === undefined ? 1 : s.speedFactor);
        this.description = (s.description === undefined ? "Unknow" : s.description);
    }

    setCollision(b) {
        this.hasCollision = b;
    }
    //Retire les pv du body en fonction des dégats subit
    takeDamage(damage) {
        if (damage > 20) {
            this.life -= damage;
            this.updateDamageLevel();
            this.updateImage();
        }
    }
    //Mise à  jour du sprite en fonction des dégats subit
    updateDamageLevel() {
        if (this.life <= 0) return;

        this.damageLevel = Math.min(Math.ceil((this.lifeMax - this.life) / Math.trunc(this.lifeMax / this.textureState)),this.textureState-1);

    }
    
    collision(b) {
        if (!this.canCollide || !b.canCollide) return;
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
            var e = (this.elasticity + b.elasticity) / 2
            var j = -(1 + e) * v.dot(vecPene) / (this.invMass + b.invMass);

            // (3) On calcule les nouvelle vitesse:
            var new_v = this.velocity.add(vecPene.mult(j * this.invMass));
            var new_bv = b.velocity.sub(vecPene.mult(j * b.invMass));

            b.setCollision(true);
            this.setCollision(true);
            if(this.description == "mur tour haut" || b.description == "mur tour haut"){
                console.log("mur tour haut");
            }
            //Calcul des dégats subit par this et b
            if (this.life != Infinity) {
                this.takeDamage((b.velocity.norm() * Constants.baseDamageFactor * b.damageFactor));
                //Dégats auto infligés en fonction du damageFactor de l'autre bodi divisé par 10
                this.takeDamage(this.velocity.norm() * Constants.baseDamageFactor * this.damageFactor*0.10);
            }
            if (b.life != Infinity) {
                b.takeDamage(this.velocity.norm() * Constants.baseDamageFactor * this.damageFactor);
                //Dégats auto infligés en fonction du damageFactor de l'autre bodi divisé par 10
                b.takeDamage(b.velocity.norm() * Constants.baseDamageFactor * this.damageFactor*0.10);
            }

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
