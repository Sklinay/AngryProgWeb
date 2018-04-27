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
        if(!this.image.complete){
            let _this = this;
            this.image.onload = function (){
                 _this.context.drawImage(_this.image, 0, 0, _this.image.width, _this.image.height, _this.origin.x, _this.origin.y, _this.width, _this.height);
            };
        }else {
             this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.origin.x, this.origin.y, this.width, this.height);
        }
    }

}
