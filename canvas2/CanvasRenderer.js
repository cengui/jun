
June.CanvasRenderer = function(canvas){
	//scene
	//object
	var ctx = canvas.getContext("2d");
	var j = 0;
	var width = 500;
	var height = 500;
	var camera = null;
	this.render = function(scene,  canmera){
	
		var item = null;
		var point = null;
		camera = scene.children[0];
		
		for(var i=1; i<scene.children.length; i++){
		
			var item = scene.children[i];

			if(item instanceof June.PlaneGeometry){

				item.translateX( item.rotation.x );
				item.translateY( item.rotation.y );
				item.translateZ( item.rotation.z );

				var v1 = canmera.getXY(item.vectors[0].clone().addSelf( item.position ))
				, v2 = canmera.getXY(item.vectors[1].clone().addSelf( item.position ))
				, v3 = canmera.getXY(item.vectors[2].clone().addSelf( item.position ))
				, v4 = canmera.getXY(item.vectors[3].clone().addSelf( item.position ));
				
				//console.log( v1, v2, v3, v4 );
				this.drawBegin(v1, v2, v3, v4, item.color);
			}
			
		}
	}
	
	
	//画一个点
	this.drawPoint = function(x, y, width, height){
	
		width = width || 2;
		height = height || 2;

		ctx.beginPath();
		ctx.fillRect(x-width/2, y-height/2, width, height);
		ctx.stroke();
		
	};
	
	//画一个封闭的路劲 4个点
	this.drawBegin = function(v1, v2, v3, v4, color){
		ctx.beginPath();
		ctx.moveTo(v1.x, v1.y);
		ctx.lineTo(v2.x, v2.y);
		ctx.lineTo(v3.x, v3.y);
		ctx.lineTo(v4.x, v4.y)
		//g.lineTo(pointA.screenX, pointA.screenY);
		ctx.closePath();
		ctx.fillStyle = color;//"#000";
		ctx.fill();
		ctx.strokeStyle = color;//"#000";
		ctx.stroke();
	};
	
	this.drawLine = function(v1, v2, color){
	
		ctx.beginPath();
		ctx.moveTo(v1.x, v1.y);
		ctx.lineTo(v2.x, v2.y);
		ctx.closePath();
		ctx.fill();
		ctx.strokeStyle = color|| "#000";
		ctx.stroke();
		
	}
	
	
	this.clear = function(){
		ctx.clearRect(0, 0, width, height);
	};
};

