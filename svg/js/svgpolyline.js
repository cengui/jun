function SVGPolyline( points ){
	
	this.tagName = "polyline";
	
	SVGNode.call(this, this.tagName);
	this.initialize();
	
	//如果填充颜色不是fill = none 终点会连接到原点形成一个封闭的图形
	//this.fill = "#f30";
	
	this.points = points;

	this.init();
}

SVGPolyline.prototype = Object.create(SVGNode.prototype);
$.extend(SVGPolyline.prototype, {
	init:function(){
		var _this = this;
		var handles = this.createHandle( 3 );
		var points = this.points;
		
		this.bindHandle(0, points[0], $(handles[0]) );
		this.bindHandle(1, points[1], $(handles[1]) );
		this.bindHandle(2, points[2], $(handles[2]) );
		
		this.update();
	},
	createHandleOne:function(x, y){
	
		var handles = this.createHandle( 1 );
		
		this.points.push([x, y]);

		this.bindHandle(this.points.length -1, [x, y], $(handles[0]));
		
		this.update();
		
	},
	bindHandle:function(index, position, element){
		var _this = this;
		element.css({
			top:position[1],
			left:position[0]
		});
		
		var p = new DragElement({
			dragElement:element,
			moveElement:element
		});
		
		p.onmove = function(x, y){
			_this.setPoint(index, x, y);//index
		};
		p.init();
		
	},
	setPoint:function( position, x, y ){
		this.points[position] = [x, y];
		this.update();
	},
	update:function(){
		var ps = "", i=0;
		for(; i<this.points.length; i++){
			ps += this.points[i][0] +","+this.points[i][1]+" ";
		}
		//回到原点可能形成一个封闭的图形
		//ps += this.points[0][0] +","+ this.points[0][1];
		this.node.setAttribute("points", ps);

	}
});