class Sprite extends Body {

    constructor(context, s) {
        super(s);
        this.context = context;
        if (s.texture == undefined) {
            this.imagePath = "ressources/default.png";
        }
        else {
            this.imagePath = "ressources/"+s.texture;
        }
        this.image = new Image();
        this.image.src = this.imagePath;
    }

    draw(){
        this.context.save();
        this.context.translate(this.origin.x+this.width/2, this.origin.y+this.height/2);
        this.context.rotate(this.angle*Math.PI/180);
        this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, -this.width/2, -this.height/2, this.width, this.height);
        this.context.rotate(-this.angle*Math.PI/180);
        this.context.restore();
    }
    
    drawRecDebug(){
        this.context.fillStyle = '#f00';
        this.context.beginPath();
        this.context.moveTo(this.get_dummy_collision_rect_a().x, this.get_dummy_collision_rect_a().y);
        this.context.lineTo(this.get_dummy_collision_rect_b().x, this.get_dummy_collision_rect_b().y);
        this.context.lineTo(this.get_dummy_collision_rect_c().x, this.get_dummy_collision_rect_c().y);
        this.context.lineTo(this.get_dummy_collision_rect_d().x, this.get_dummy_collision_rect_d().y);
        this.context.closePath();
        this.context.fill();
    }
}
