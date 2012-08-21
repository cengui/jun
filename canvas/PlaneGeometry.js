

June.PlaneGeometry = function(x, y, z, width, height){
	
	this.positon = new June.Vector3();
	
	this.vectors = [
		new June.Vector3(x, y , z),
		new June.Vector3(x+width, y, z),
		new June.Vector3(x+width, y+height, z),
		new June.Vector3(x, y+height, z)
	];
	
	this.translateX = function( angleX ){
		var item = null;
		for(var i=0; i<this.vectors.length; i++){
			item = this.vectors[i];
			var cosx = Math.cos(angleX),
				sinx = Math.sin(angleX),
				y = item.y * cosx - item.z * sinx,
				z = item.z * cosx + item.y * sinx;
			item.y = y;
			item.z = z;
		}
	}
};

June.PlaneGeometry.prototype = new June.Object3D();
June.PlaneGeometry.prototype.constructor = June.PlaneGeometry;

