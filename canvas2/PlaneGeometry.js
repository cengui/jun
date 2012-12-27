

June.PlaneGeometry = function(width, height, rotation, color){
	
	June.Object3D.call(this);
	
	var width_half = width / 2;
	var height_half = height / 2;
	
	this.color = color || "#000";
	this.vectors = [
		new June.Vector3(-width_half, -height_half , 0),
		new June.Vector3(width_half, -height_half, 0),
		new June.Vector3(width_half, height_half, 0),
		new June.Vector3(-width_half, height_half, 0)
	];
	
	this.__v = 	rotation ||  new June.Vector3();
	this.rotation = new June.Vector3();
	
	this.init();
};


June.PlaneGeometry.prototype = {
	position:new June.Vector3(),
	constructor:June.PlaneGeometry,
	applyMatrix:function( matrix ){
	
	},
	init:function(){
	
		this.translateX(this.__v.x);
		this.translateY(this.__v.y);
		this.translateZ(this.__v.z);
		
	},
	translateX : function( angleX ){

		var item = null;
		for(var i=0; i<this.vectors.length; i++){
			item = this.vectors[i];
			var cosx = Math.cos(angleX+this.__v.x),
				sinx = Math.sin(angleX+this.__v.x),
				y = item.y * cosx - item.z * sinx,
				z = item.z * cosx + item.y * sinx;
			item.y = y;
			item.z = z;
		}
	},
	// ÈÆyÖáÐý×ª
	translateY: function (angleY) {
		
		//console.log(angleY);
		var item = null;
		for(var i=0; i<this.vectors.length; i++){
			item = this.vectors[i];
			var cosy = Math.cos(angleY),
				siny = Math.sin(angleY),
				x = item.x * cosy - item.z * siny,
				z = item.z * cosy + item.x * siny;
			item.x = x;
			item.z = z;
			//console.log(x, z);
			
		}
		
	


	},
	// ÈÆzÖáÐý×ª
	translateZ: function (angleZ) {
		var item = null;
		for(var i=0; i<this.vectors.length; i++){
			item = this.vectors[i];
			var cosz = Math.cos(angleZ+this.__v.z),
				sinz = Math.sin(angleZ+this.__v.z),
				x = item.x * cosz - item.y * sinz,
				y = item.y * cosz + item.x * sinz;
			item.x = x;
			item.y = y;
		}
	}
};


