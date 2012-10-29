/**
	Scene
*/

June.Scene = function(scene,  canmera){
	
	this.scene = scene;
	this.canmera = canmera;
	
	this.children = [];
};


June.Scene.prototype = {
	
	add:function( object ){
	
		this.children.push( object );
		
	}
	
};