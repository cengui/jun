
June.CanvasRenderer = function(canvas){
	//scene
	//object
	var ctx = canvas.getContext("2d");
	var j = 0;
	var width = 500;
	var height = 500;
	this.render = function(scene , object){
		var item = null;
		var point = null;
		//console.log(object.child.length);
		for(var i=0; i<object.child.length; i++){
			var item = object.child[i]
			if(item instanceof June.Vector3){
				var point = scene.getXY( item );
				this.drawPoint( point.x, point.y );
			}
			if(item instanceof June.PlaneGeometry){
			
				var v1 = scene.getXY(item.vectors[0])
				, v2 = scene.getXY(item.vectors[1])
				, v3 = scene.getXY(item.vectors[2])
				, v4 = scene.getXY(item.vectors[3]);
				this.drawBegin(v1, v2, v3, v4);
			}
		}
	}

	this.drawPoint = function(x, y, width, height){
	
		width = width || 2;
		height = height || 2;

		ctx.beginPath();
		ctx.fillRect(x-width/2, y-height/2, width, height);
		ctx.stroke();
		
	};
	
	this.drawPoint = function(x, y, width, height){
	
		width = width || 2;
		height = height || 2;
		ctx.beginPath();
		ctx.fillRect(x-width/2, y-height/2, width, height);
		ctx.stroke();
		
	};
	
	this.drawBegin = function(v1, v2, v3, v4){
		ctx.beginPath();
		ctx.moveTo(v1.x, v1.y);
		ctx.lineTo(v2.x, v2.y);
		ctx.lineTo(v3.x, v3.y);
		ctx.lineTo(v4.x, v4.y)
		//g.lineTo(pointA.screenX, pointA.screenY);
		ctx.closePath();
		ctx.fillStyle = "#000";
		ctx.fill();
		ctx.strokeStyle = "#000";
		ctx.stroke();
	}
	
	this.clear = function(){
		ctx.clearRect(0, 0, width, height);
	};
};

