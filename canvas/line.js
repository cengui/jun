
June.Line = function( vector1, vector2 , color){
	this.color = color || "#000";
	this.vectors = [
		vector1,vector2
	];
};

June.Line.prototype = new June.Object3D();//Object.create();
June.mix(June.Line.prototype, {
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
			var cosz = Math.cos(angleZ),
				sinz = Math.sin(angleZ),
				x = item.x * cosz - item.y * sinz,
				y = item.y * cosz + item.x * sinz;
			item.x = x;
			item.y = y;
		}
	}
})