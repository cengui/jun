/**
	Scene
*/

June.PerspectiveCamera = function(){
	
	this.width = 500;
	this.height = 500;
	
	this.focalLength = 500;
	
	this.centerX = this.width / 2;
	this.centerY = this.height / 2;
	
	
	
};


June.PerspectiveCamera.prototype = {
	constructor:June.PerspectiveCamera,
	getXY:function( v ){
		
		var x = this.focalLength / (this.focalLength + v.z) * v.x;
		var y = this.focalLength / (this.focalLength + v.z) * v.y;
		
		return {x:x+this.centerX, y:y+this.centerY};
	}
};