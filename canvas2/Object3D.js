

June.Object3D = function(x, y, z){

	this.position = new June.Vector3(x || 0, y || 0, z || 0);

	//this.matrix = new June.Matrix4();
	
	this.__v3 = new June.Vector3();
	this.child = [];
	
}

June.Object3D.prototype = {
	constructor:June.Object3D,
	add:function( v ){
		this.child.push( v );
	},
	
	translateX : function( angleX ){

		var item = this.position;

		var cosx = Math.cos(angleX),
			sinx = Math.sin(angleX),
			y = item.y * cosx - item.z * sinx,
			z = item.z * cosx + item.y * sinx;
		item.y = y;
		item.z = z;

	},
	// ÈÆyÖáÐý×ª
	translateY: function (angleY) {
		
		//console.log(angleY);
		var item = this.position;
		//console.log(item);
		var cosy = Math.cos(angleY),
			siny = Math.sin(angleY),
			x = item.x * cosy - item.z * siny,
			z = item.z * cosy + item.x * siny;
		item.x = x;
		item.z = z;
		//console.log(x, z);
	
		
	


	},
	// ÈÆzÖáÐý×ª
	translateZ: function (angleZ) {
	
		var item = this.position;
	
		var cosz = Math.cos(angleZ),
			sinz = Math.sin(angleZ),
			x = item.x * cosz - item.y * sinz,
			y = item.y * cosz + item.x * sinz;
		item.x = x;
		item.y = y;

	}
	
};