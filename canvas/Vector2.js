/**
    .Vector2(x, y),
        .setXY(x, y);
		.square();
        .length();
		.addSelf( v );
		.subSelf( v );
		.multiplyScalar( s );
		.clone();

*/

June.Vector2 = function(x, y){
	this.x = x;
	this.y = y;
};

June.Vector2.prototype = {

	constructor : June.Vector2,
	
	setXY:function(x, y){

		this.x = x;
		this.y = y;
		
		return this;
	},
	
	square:function(){
		
		return this.x * this.x + this.y * this.y;
		
	},
	
	length:function(){
	
		return Math.sqrt( this.square() );
		
	},
	
	addSelf:function( v ){
		
		this.x += v.x;
		this.y += v.y;
		
		return this;
		
	},
	
	subSelf:function( v ){
		
		this.x -= v.x;
		this.y -= v.y;
		
		return this;
		
	},
	
	multiplyScalar:function( s ){
		
		this.x *= s;
		this.y *= s;
		
		return this;
	},
	
	clone:function(){
	
		return new June.Vector2(this.x, this.y);
		
	}
};
