class Explosion{
    constructor(context,origin, power){
        this.context = context;
        this.origin = origin;
        this.particles = [];
        this.power = power;
        for (let i = 0; i < this.power; i++) {
            this.particles.push(new Particle(this.context,this.origin, power));
        }
        
    }
    draw(){
        this.particles.forEach(function (e){
           e.draw(); 
        });
    }
    update(){
        this.particles = this.particles.filter(e => e.duration >= 0);
        this.particles.forEach(function (e){
           e.move(); 
        });
    }
}

class Particle {
    constructor(context, origin, power){
        this.duration = Math.random() * 50;
        this.context = context;
        this.origin = origin;
        var randomAngle = Math.random() * Math.PI * 2;
        this.velocity = new Vector(Math.cos(randomAngle),Math.sin(randomAngle)).mult(Math.random());
    }    
    
    
    move() {        
        this.origin = this.origin.add(this.velocity);
        this.duration--;
    }
    
    draw (){
         this.context.fillStyle="#FF0000";
         this.context.fillRect(this.origin.x,this.origin.y,1,1); // fill in the pixel at (10,10)
    }
}