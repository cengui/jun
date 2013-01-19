function SVGLine(x1, y1, x2, y2){

	this.tagName = "line";
	SVGNode.call(this, this.tagName);
	this.initialize();
	
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;

	this.init();
}
SVGLine.prototype = Object.create(SVGNode.prototype);
$.extend(SVGLine.prototype, {
	init:function(){
		var _this = this;
		
		var handles = this.createHandle( 2 );
		this.p1node = $(handles[0]);
		this.p2node = $(handles[1]);
		
		this.p1node.css({
			top:this.y1,
			left:this.x1
		});
		this.setP1({x:this.x1, y:this.y1});
		
		this.p2node.css({
			top:this.y2,
			left:this.x2
		})
		this.setP2({x:this.x2, y:this.y2});
		
		var p1 = new DragElement({
			dragElement:this.p1node,
			moveElement:this.p1node
		});
		
		p1.onmove = function(x, y){
			_this.setP1({x:x, y:y});
		};
		p1.init();
		
		var p2 = new DragElement({
			dragElement:this.p2node,
			moveElement:this.p2node
		});
		
		p2.onmove = function(x, y){
			_this.setP2({x:x, y:y});
		};
		p2.init();
		
		
		
	},
	setP1:function( p ){
		this.x1 = p.x;
		this.y1 = p.y;
		this.node.setAttribute("x1", p.x);
		this.node.setAttribute("y1", p.y);
	},
	setP2:function( p ){
		this.x2 = p.x;
		this.y2 = p.y;
		this.node.setAttribute("x2", p.x);
		this.node.setAttribute("y2", p.y);
	}
})