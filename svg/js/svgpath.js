function SVGPath(p1, p2, p3){
	
	this.tagName = "path";
	
	SVGNode.call(this, this.tagName);
	this.initialize();
	
	this.p1 = p1;
	this.p2 = p2;
	this.p3 = p3;
	this.rx = 10;
	this.ry = 10;
	this.largeFlag = 0;

	this.init();
}

SVGPath.prototype = Object.create(SVGNode.prototype);


$.extend(SVGPath.prototype, {
	init:function(){
		var _this = this;
		this.setR( Math.sqrt( Math.pow(this.p2.x-this.p1.x, 2) + Math.pow(this.p2.y -this.p1.y, 2))  );
		this.update();
	},
	setR:function( r ){
		this.rx = r;
		this.ry = r;
		this.update();
	},
	setP1:function( p ){
		this.p1 = p;
		this.setR( Math.sqrt( Math.pow(this.p2.x-this.p1.x, 2) + Math.pow(this.p2.y -this.p1.y, 2))  );	
	},
	setP2:function( p ){
		this.p2 = p;	
		this.setR( Math.sqrt( Math.pow(this.p2.x-this.p1.x, 2) + Math.pow(this.p2.y -this.p1.y, 2))  );
	},
	setP3:function( p ){
		this.p3 = p;
		this.setR( Math.sqrt( Math.pow(this.p3.x-this.p1.x, 2) + Math.pow(this.p3.y -this.p1.y, 2))  );
		
	},
	setLarge:function( largeFlag ){
		this.largeFlag = largeFlag ? 1 : 0;
		this.update();
	},
	getd:function(){
		return "M"+this.p1.x+","+this.p1.y+" L"+this.p2.x+","+this.p2.y+" A"+this.rx+","+this.ry+","+0+","+this.largeFlag+","+0+","+this.p3.x+","+this.p3.y+"Z";
	},
	update:function(){
		this.node.setAttribute("d", this.getd());
	}
});
/** 辅助句柄 */
SVGPath.prototype.initHandle = function(){
	var handles = this.createHandle( 3 );
	var _this = this;
	this.p1node = $(handles[0]);
	this.p2node = $(handles[1]);
	this.p3node = $(handles[2]);
	
	this.p1node.css({
		top:this.p1.y,
		left:this.p1.x
		
	});
	
	this.p2node.css({
		top:this.p2.y,
		left:this.p2.x
	})
	
	this.p3node.css({
		top:this.p3.y,
		left:this.p3.x
	})
	
	var p1 = new DragElement({
		dragElement:this.p1node,
		moveElement:this.p1node
	});
	
	p1.onmove = function(x, y){
		_this.setP1({x:x, y:y});
		_this.update();
	};
	p1.init();
	
	var p2 = new DragElement({
		dragElement:this.p2node,
		moveElement:this.p2node
	});
	
	p2.onmove = function(x, y){
		_this.setP2({x:x, y:y});
		_this.update();
	};
	p2.init();
	
	var p3 = new DragElement({
		dragElement:this.p3node,
		moveElement:this.p3node
	});
	p3.onmove = function(x, y){
		_this.setP3({x:x, y:y});
		_this.update();
	};
	p3.init();

};