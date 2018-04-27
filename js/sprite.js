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
    }

    draw () {
        var image = new Image();
        image.src = this.imagePath;
        this.context.drawImage(image, 0, 0, image.width, image.height, this.origin.x, this.origin.y, this.width, this.height);
        //this.context.fillRect(this.origin.x, this.origin.y, this.width, this.height);
    }

}
