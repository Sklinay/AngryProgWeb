class MenuButton {
    constructor(name, imagePath, canvas, context,x,y){
		this.name = name;
		this.imagePath = imagePath;
		this.canvas = canvas;
		this.context = context;
        this.image = new Image();
        this.image.src = this.imagePath;
		this.x = x;
		this.y = y;
		this.width = 100;
		this.height = 100;
	}
	draw(){
        this.context.fillStyle ='#e7dfc2';
		this.context.fillRect(this.x, this.y, this.width, this.height);
		this.context.strokeStyle = '#dbd3b5';
		this.context.lineWidth = 10;
		this.context.strokeRect(this.x+10, this.y+10, this.width - 20, this.height - 20);
		this.drawImage();
	}
	drawImage(){
		if(!this.image.complete){
			let _this = this;
			this.image.onload = function (){
				 _this.context.drawImage(_this.image,0,0,_this.image.width, _this.image.height, _this.x+20, _this.y+20, _this.width - 40, _this.height - 40);
			};
		}else {
			 this.context.drawImage(this.image,0,0,this.image.width, this.image.height, this.x+20, this.y+20, 60, 60);
		}
	}
	hasThis(x, y) {
        return (this.x < x && this.x + this.width > x) &&
            (this.y < y && this.y + this.height > y);
    }
	click(){
		console.log("clic");
	}
}
