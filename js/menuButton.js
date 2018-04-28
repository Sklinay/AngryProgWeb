class MenuButton {
    constructor(name, imagePath, canvas, context){
		this.name = name;
		this.imagePath = imagePath;
		this.canvas = canvas;
		this.context = context;
        this.image = new Image();
        this.image.src = this.imagePath;
	}
	draw(x, y){
        this.context.fillStyle ='#e7dfc2';
		this.context.fillRect(x, y, 100, 100);
		this.context.strokeStyle = '#dbd3b5';
		this.context.lineWidth = 10;
		this.context.strokeRect(x+10, y+10, 80, 80);
		this.drawImage(x, y);
	}
	drawImage(x, y){
		if(!this.image.complete){
			let _this = this;
			this.image.onload = function (x,y){
				 _this.context.drawImage(_this.image,0,0,_this.image.width, _this.image.height, x+20, y+20, 60, 60);
			};
		}else {
			 this.context.drawImage(this.image,0,0,this.image.width, this.image.height, x+20, y+20, 60, 60);
		}
	}
	click(){
		console.log("clic");
	}
}
