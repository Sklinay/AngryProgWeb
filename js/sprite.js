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

    draw () {
        this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.origin.x, this.origin.y, this.width, this.height);
        //this.context.fillRect(this.origin.x, this.origin.y, this.width, this.height);
    }

}
