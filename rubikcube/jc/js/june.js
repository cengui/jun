
;(function(){	
	function extend(a, b){
		for(var i in b){
			a[i] = b[i];
		}
		return a;
	};
	
	// event
	function Event(){
		//this.eventList = {};
	};
	
	Event.prototype = {
		addEvent:function(type, func){
		
			if(this.eventList == undefined){
				this.eventList = {};
			}
			
			if(this.eventList[type] == undefined){
				this.eventList[type] = [func];
			}else{
				this.eventList[type].push(func);
			}
		},
		removeEvent:function(type, func){
			
		},
		fireEvent:function(type){},
		
	};

	
	//主对象
	function Stage(canvas, width, height){
		
		this.childList = [];
		this.eventList = {};
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
		this.playing = false;
		this.width = width;
		this.height = height;
		this.init();
	};
	extend(Stage.prototype, new Event());
	extend(Stage.prototype, {
		init:function(){
			var self = this;
			this.canvas.addEventListener('click', function(e){
				var x = e.clientX - self.canvas.offsetLeft,
					y = e.clientY - self.canvas.offsetTop;
				self.fireEvent("click", x, y);
			}, false);
		},
		start:function(){
			this.playing = true;
			this.play();
		},
		stop:function(){
			this.playing = false;
		},
		play:function(){
			var self = this;
			setTimeout(function(){
			
				//try{
					self.draw();
				//}catch(e){
				//	console.log(e);
				//}
				
				if(self.playing){
					self.play();
				}
			}, 30);
		},
		draw:function(){
			//var t = new Date().getTime();
			//this.clear();
			var ctx = this.ctx;
			//depth
			//this.childList.sort(function (a, b) { return  b.depth - a.depth });
			
			jc.clear("canvas");
			jc.start("canvas", true);
			for(var i=0; i<this.childList.length; i++){
				this.childList[i].draw(ctx);
			}
			//console.log(new Date().getTime() -t );
		},
		clear:function(){
			this.ctx.clearRect(0,0,this.width, this.height);
		},
		addChild:function(child){
			this.childList.push(child);
			return this;
		},
		removeChild:function(type, x, y){//---
			var index = i;
			for(var i=0,l=this.childList.length; i<l; i++){
				if(this.childList[i] == child){
					
				}
			}
		},
		fireEvent:function(type, x, y){
			
			for(var i=0; i<this.childList.length; i++){
				if(this.childList[i].eventList[type] && this.childList[i].isEvent && this.childList[i].isEvent(x, y)){
					console.log(this.childList[i]);
					this.childList[i].fireEvent(type);
				}
			}
		},
	});	


	//一个点
	function Point(x, y, z, option){
		this.x = 0;
		this.y = 0;
		
		
		//旋转中心点
		this.vpx = 0;
		this.vpy = 0;
		
		//设定坐标中心点
		
		this.cx = 0;
		this.cy = 0;
		this.cz = 0;
		
		
		this.xpos = x;
		this.ypos = y;
		this.zpos = z;
		
		this.focalLength = 250;
		
		this.ctx = null;
		
		option && extenx(this, option);
		
		Object.defineProperties(this, {
			'screenX': {
			  get: function () {
				return this.getScreenXY().x
			  }
			},
			'screenY': {
			  get: function () {
				return this.getScreenXY().y
			  }
			}
		});
		return 
	};
	Point.prototype = {
		setVanishPoint:function(vpx, vpy){
			this.vpx = vpx;
			this.vpy = vpy;
		},
		setCenterPoint: function (x, y, z) {
			this.cx = x;
			this.cy = y;
			this.cz = z;
		},
		// 绕x轴旋转
		rotateX: function (angleX) {
			var cosx = Math.cos(angleX),
				sinx = Math.sin(angleX),
				y1 = this.ypos * cosx - this.zpos * sinx,
				z1 = this.zpos * cosx + this.ypos * sinx;
			this.ypos = y1;
			this.zpos = z1;
		},
		// 绕y轴旋转
		rotateY: function (angleY) {
			var cosy = Math.cos(angleY),
				siny = Math.sin(angleY),
				x1 = this.xpos * cosy - this.zpos * siny,
				z1 = this.zpos * cosy + this.xpos * siny;
			this.xpos = x1;
			this.zpos = z1;
		},
		// 绕z轴旋转
		rotateZ: function (angleZ) {
			var cosz = Math.cos(angleZ),
				sinz = Math.sin(angleZ),
				x1 = this.xpos * cosz - this.ypos * sinz,
				y1 = this.ypos * cosz + this.xpos * sinz;
			this.xpos = x1;
			this.ypos = y1;
		},
		// 获取缩放scale
		getScale: function () {
			return (this.focalLength / (this.focalLength + this.zpos + this.cz));		  
		},
		// 获取z轴扁平化的 x，y值
		getScreenXY: function () {
			var scale = this.getScale(),
				x = this.vpx + (this.cx + this.xpos) * scale,
				y = this.vpy + (this.cy + this.ypos) * scale;
				
			this.x = x;
			this.y = y;
			return {
				x:x,
				y:y
			};
		}
	};
	
	

	//三角形	
	function Triangle(pointa, pointb, pointc, color){
		this.pointA = pointa;
		this.pointB = pointb;
		this.pointC = pointc;
		this.color = color;
	};
	extend(Triangle.prototype, new Event);
	extend(Triangle.prototype, {
		draw:function(ctx){
			//this.rotateX(0.01);
			//this.rotateY(0.01);
			/***
			var g = ctx,
				pointA = this.pointA,
				pointB = this.pointB,
				pointC = this.pointC,
				color = this.color;
			//Depth example doesn't set a light, use flat color.
			g.beginPath();
			g.moveTo(pointA.screenX, pointA.screenY);
			g.lineTo(pointB.screenX, pointB.screenY);
			g.lineTo(pointC.screenX, pointC.screenY);
			g.lineTo(pointA.screenX, pointA.screenY);
			g.closePath();
			g.fillStyle = color;
			g.fill();*/

			this.rotateX(0.01);
			
			
			jc.line([
				[this.pointA.screenX, this.pointA.screenY],
				[this.pointB.screenX, this.pointB.screenY],
				[this.pointC.screenX, this.pointC.screenY]
			],'#55ff00',1).click(function(){alert(1)});
			
			
			jc.start("canvas");
		
		
		},
		rotateX:function(angleX){
			this.pointA.rotateX(angleX);
			this.pointB.rotateX(angleX);
			this.pointC.rotateX(angleX);
		},
		rotateY:function(angleY){
			this.pointA.rotateY(angleY);
			this.pointB.rotateY(angleY);
			this.pointC.rotateY(angleY);
		},
		isEvent:function(x, y){//事件处理
			
			return true;
		}
	});
	Object.defineProperties(Triangle.prototype, {
		'depth': {
		  get: function () {
			/*
			var zpos = Math.min(
				this.pointA.zpos+this.pointA.ypos+this.pointA.xpos, 
				this.pointB.zpos+this.pointB.ypos+this.pointB.xpos, 
				this.pointC.zpos+this.pointC.ypos+this.pointC.xpos);
			// */
			var zpos = Math.min(this.pointA.zpos, this.pointB.zpos, this.pointC.zpos);
			return zpos;
		  }
		}
	});
	
	//多边形 现在只支持 4 边行
	function Polygon4(triangleA, triangleB, option){
		this.triangleA = triangleA;
		this.triangleB = triangleB;
		
		option && extend(this, option);
	};
	
	Polygon4.prototype = {
		init:function(){
			
		},
		draw:function(ctx){
			//this.triangleA.rotateX(0.01);
			//this.triangleB.rotateX(0.01);
			this.triangleA.draw(ctx);
			this.triangleB.draw(ctx);
		}
	};
	
	window.June = {
		point:Point,
		stage:Stage,
		event:Event,
		triangle:Triangle,
		polygon4:Polygon4
	}
})();