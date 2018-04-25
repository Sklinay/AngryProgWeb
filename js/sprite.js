class Sprite extends Body {

    constructor(context, v, w, h, m, vel, imagePath) {
        super(v, w, h, m, vel);
        this.context = context;
        if (imagePath == undefined) {
            this.imagePath = "ressources/default.png";
        }
        else {
            this.imagePath = imagePath;
        }
    }

    draw () {
        var image = new Image();
        image.src = this.imagePath;
        this.context.drawImage(image, 0, 0, 70, 70, this.origin.x, this.origin.y, this.width, this.height);
        //this.context.fillRect(this.origin.x, this.origin.y, this.width, this.height);
    }

}
