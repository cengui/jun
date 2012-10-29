	/**
		geometry instanceof Jun.PlaneGeometry
			
		material :{}
	*/
June.Mesh = function(geometry, material){
	
	this.position = new June.Vector3();
	
	this.rotation = new June.Vector3();
	
	this.geometry = geometry;
	this.material = material;
	/**
		vectors
	*/
};

June.Mesh.prototype = {
	constructor:June.Mesh,
	
	applyMatrix:function( matrix ){
		
	}
	
};