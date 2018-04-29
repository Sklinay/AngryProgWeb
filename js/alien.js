class Alien extends Sprite {
    constructor(context, s) {
        s.velocity = Vector.ZERO;
        s.isStatic = false;
        s.x = 0;
        s.y = 0;
        super(context, s)
        this.name = s.name;
        this.amount = s.amount;
        this.speedFactor = s.speedFactor;
        this.texture = s.texture;
    }
    
    //Retire une munition
    decAmount() {
        this.amount--;
    }
    
    //Dessine le sprite de l'alien et le nombre de munitions restante dans le this.context (canvas de munition)
    drawAmmo(x) {
        this.origin = new Vector(x, 0);
        if (!this.image.complete) {
            let _this = this;
            this.image.onload = function () {
                _this.context.drawImage(_this.image, 0, 0, _this.image.width, _this.image.height, _this.origin.x, 0, 30, 30);
            };
        } else {
            this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.origin.x, 0, 30, 30);
        }

        this.context.font = "15px Grobold";
        this.context.fillText("x" + this.amount, x + 35, 23);
    }
    
    //Génère les donneés d'un nouveau tire de l'alien this
    generateBullet(origin,velocity,inert=false){
       var bullet =  {
            x: origin.x-this.width/2,
            y: origin.y-this.height/2,
            width: this.width,
            height: this.height,
            mass: this.mass,
            velocity: velocity.mult(this.speedFactor),
            elasticity: this.elasticity,
            damageFactor: this.damageFactor,
            speedFactor : this.speedFactor,
            life : this.life,            
            isStatic: inert,
            canCollide: !inert,
            texture: this.texture
        };
        return bullet;
        
    }

}