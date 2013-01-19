function SVGCircle(cx, cy, r){
	
	this.tagName = "circle";
	
	SVGNode.call(this, this.tagName);
	this.initialize();
	
	this.cx = cx;
	this.cy = cy;
	this.r = r;
	this.init();
}

SVGCircle.prototype = Object.create(SVGNode.prototype);
$.extend(SVGCircle.prototype, {
	init:function(){
		var _this = this;
		var handles = this.createHandle( 2 );
		
		var sqrt = Math.sqrt, abs = Math.abs, pow = Math.pow;

		this.p1node = $(handles[0]);
		this.p2node = $(handles[1]);
		
		this.p1node.css({
			top:this.cy,
			left:this.cx
		});
		
		this.p2node.css({
			top:this.cy,
			left:this.cx + this.r
		})
		
		
		var p1 = new DragElement({
			dragElement:this.p1node,
			moveElement:this.p1node
		});
		
		p1.onmove = function(x, y){
			_this.setCx(x);
			_this.setCy(y);
			p2.setPosition(x+_this.r, y);
		};
		p1.init();
		
		var p2 = new DragElement({
			dragElement:this.p2node,
			moveElement:this.p2node
		});

		p2.onmove = function(x, y){
			var r = sqrt(pow(abs(x - _this.cx), 2) + pow(abs(y - _this.cy), 2));
 			_this.setR( r );
		};
		p2.init();
		
		this.setR( this.r );
		this.setCx( this.cx );
		this.setCy( this.cy );
	},
	setR:function( r ){
		this.r = r;
		this.node.setAttribute("r", r);
	},
	setCx:function( x ){
		this.cx = x;
		this.node.setAttribute("cx", x);
	},
	setCy:function( y ){
		this.cy = y;
		this.node.setAttribute("cy", y);
	}
});