

June.Object3D = function(){

	this.position = new June.Vector3();
	
	this.matrix = new June.Matrix4();
	
	this.__v3 = new June.Vector3();
	this.child = [];
	
}

June.Object3D.prototype = {
	constructor:June.Object3D,
	add:function( v ){
		this.child.push( v );
	},
	
	translateX:function( angleX ){
		var item = null;
		for(var i=0; i<this.child.length; i++){
			/**
			item = this.child[i];
			var cosx = Math.cos(angleX),
				sinx = Math.sin(angleX),
				y = item.y * cosx - item.z * sinx,
				z = item.z * cosx + item.y * sinx;
			item.y = y;
			item.z = z;*/
			item = this.child[i];
			item.translateX( angleX );
		}
	}
	
};