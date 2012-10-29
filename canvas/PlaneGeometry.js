

June.PlaneGeometry = function(width, height, color){
	
	var width_half = width / 2;
	var height_half = height / 2;
	
	this.color = color || "#000";
	this.vectors = [
		new June.Vector3(-width_half, -height_half , 0),
		new June.Vector3(width_half, -height_half, 0),
		new June.Vector3(width_half, height_half, 0),
		new June.Vector3(-width_half, height_half, 0)
	];
	
	
};



June.PlaneGeometry.prototype = new June.Object3D();
June.PlaneGeometry.prototype = {
	constructor:June.PlaneGeometry,
	applyMatrix:function( matrix ){
	
	},
	translateX : function( angleX ){
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
	},
	// ��y����ת
	translateY: function (angleY) {
		var item = null;
		for(var i=0; i<this.vectors.length; i++){
			item = this.vectors[i];
			var cosy = Math.cos(angleY),
				siny = Math.sin(angleY),
				x = item.sx * cosy - item.sz * siny,
				z = item.sz * cosy + item.sx * siny;
			item.x = x;
			item.z = z;
		}
	},
	// ��z����ת
	translateZ: function (angleZ) {
		var item = null;
		for(var i=0; i<this.vectors.length; i++){
			item = this.vectors[i];
			var cosz = Math.cos(angleZ),
				sinz = Math.sin(angleZ),
				x = item.sx * cosz - item.sy * sinz,
				y = item.sy * cosz + item.sx * sinz;
			item.x = x;
			item.y = y;
		}
	},
}


