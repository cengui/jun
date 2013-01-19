function SVGRect(x1, y1, width, height){

	this.tagName = "rect";
	SVGNode.call(this, this.tagName);
	this.initialize();
	
	this.x = x1;
	this.y = y1;
	this.width = width;
	this.height = height;

	this.init();
}
SVGRect.prototype = Object.create(SVGNode.prototype);
$.extend(SVGRect.prototype, {
	init:function(){
		var _this = this;
		
		var handles = this.createHandle( 2 );
		this.p1node = $(handles[0]);
		this.p2node = $(handles[1]);
		
		this.p1node.css({
			top:this.x,
			left:this.y
		});
		
		this.setXY(this.x, this.y);
		
		this.p2node.css({
			top:this.x+this.height,
			left:this.y+this.width
		});
		
		var p1 = new DragElement({
			dragElement:this.p1node,
			moveElement:this.p1node
		});
		
		p1.onmove = function(x, y){
			_this.setXY(x, y);
			p2.setPosition(x+_this.width+_this.strockWidth, y+_this.height+_this.strockWidth);
		};
		p1.init();
		
		var p2 = new DragElement({
			dragElement:this.p2node,
			moveElement:this.p2node
		});
		
		p2.onmove = function(x, y){
			_this.setSize(x-_this.x, y-_this.y);
		};
		p2.init();

		this.setSize(this.width, this.height);
	},
	setXY:function( x, y ){
		this.x = x;
		this.y = y;
		this.node.setAttribute("x", x);
		this.node.setAttribute("y", y);
	},
	setSize:function(width, height){
		this.width = width; 
		this.height = height;
		this.node.setAttribute("width", width);
		this.node.setAttribute("height", height);
	}
})