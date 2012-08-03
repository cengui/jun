
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
		fireEvent:function(type, x, y){
			for(var i=0,el =this.eventList[type], l=el.length; i<l; i++){
				el[i].call(this, x, y, type);
			}
		}
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
			
			this.event = {x:-1, y:-1};
			
			/**
			this.canvas.addEventListener('click', function(e){
				var x = e.clientX - self.canvas.offsetLeft,
					y = e.clientY - self.canvas.offsetTop;
				self.fireEvent("click", x, y);
			}, false);
			*/
			
			
			this.canvas.addEventListener('mousemove', function(e){
				var x = e.clientX - self.canvas.offsetLeft,
					y = e.clientY - self.canvas.offsetTop;
					
				self.fireEvent("mouseout", x, y);
				self.fireEvent("mousemove", x, y);
				self.fireEvent("mouseover", x, y);
				
				//self.fireEvent("mouseout", x, y);
			}, false);
			
			this.canvas.addEventListener('mouseout', function(e){
				var x = e.clientX - self.canvas.offsetLeft,
					y = e.clientY - self.canvas.offsetTop;
				self.fireEvent("mouseout", x, y);
				//self.fireEvent("mouseout", x, y);
			}, false);
			
			this.canvas.addEventListener('mousedown', function(e){
				var x = e.clientX - self.canvas.offsetLeft;
				var y = e.clientY - self.canvas.offsetTop;
				self.event.x = x;
				self.event.y = y;
				self.fireEvent("mousedown", x, y);
			}, false);
			
			this.canvas.addEventListener('mouseup', function(e){
				var x = e.clientX - self.canvas.offsetLeft;
				var y = e.clientY - self.canvas.offsetTop;
				
				if(Math.abs(self.event.x - x) < 10 && Math.abs(self.event.y - y) < 10){
					self.fireEvent("click", x, y);
				}
				
				self.fireEvent("mouseup", x, y);
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
			this.clear();
			var ctx = this.ctx;
			//depth
			this.ondraw();
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
			
			if(this.eventList[type]){
				this.eventList[type][0].call(this, x, y, type);
			}
			for(var i=0; i<this.childList.length; i++){//console.log(type, x, y);
				if(this.childList[i].eventList && this.childList[i].eventList[type] && this.childList[i].isEvent && this.childList[i].isEvent(x, y, type)){
					this.childList[i].fireEvent(type, x, y);
				}
			}
		}
	});	


	//一个点
	function Point(x, y, z, option){
		/**记录初始坐标*/
		this.sx = x;
		this.sy = y;
		this.sz = z;
		
		/** 记录当前坐标 */
		this.x = x;
		this.y = y;
		this.z = z;
		
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
		
		this.focalLength = 600;
		
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
		update:function(){/**更新当前坐标点*/
			this.sx = this.xpos;
			this.sy = this.ypos;
			this.sz = this.zpos;
		},
		// 绕x轴旋转
		rotateX: function (angleX) {
			var cosx = Math.cos(angleX),
				sinx = Math.sin(angleX),
				y1 = this.sy * cosx - this.sz * sinx,
				z1 = this.sz * cosx + this.sy * sinx;
			this.ypos = y1;
			this.zpos = z1;
		},
		// 绕y轴旋转
		rotateY: function (angleY) {
			var cosy = Math.cos(angleY),
				siny = Math.sin(angleY),
				x1 = this.sx * cosy - this.sz * siny,
				z1 = this.sz * cosy + this.sx * siny;
			this.xpos = x1;
			this.zpos = z1;
		},
		// 绕z轴旋转
		rotateZ: function (angleZ) {
			var cosz = Math.cos(angleZ),
				sinz = Math.sin(angleZ),
				x1 = this.sx * cosz - this.sy * sinz,
				y1 = this.sy * cosz + this.sx * sinz;
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
	function Triangle(pointa, pointb, pointc, color){ // Angle == Math.PI
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
			
			if(this.isBackface()){
				//return ;
			}
			
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
			//g.lineTo(pointA.screenX, pointA.screenY);
			g.closePath();
			g.fillStyle = color;
			g.fill();
			g.strokeStyle = color;
			g.stroke();
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
		update:function(){
			this.pointA.update();
			this.pointB.update();
			this.pointC.update();
		},
		isEvent:function(x, y){//事件处理
			//console.log(x, y)
			return true;
		},
		setColor:function(color){
			this.color = color;
		},
		isBackface:function() {
			//see http://www.jurjans.lv/flash/shape.html
			
			var pointA = this.pointA;
			var pointB = this.pointB;
			var pointC = this.pointC;
			/***/
			var cax = pointC.screenX - pointA.screenX,
				cay = pointC.screenY - pointA.screenY,
				bcx = pointB.screenX - pointC.screenX,
				bcy = pointB.screenY - pointC.screenY;
			return cax * bcy > cay * bcx;

		}
	});
	Object.defineProperties(Triangle.prototype, {
		'depth': {
		  get: function () {
			//var zpos = Math.min(this.pointA.zpos, this.pointB.zpos, this.pointC.zpos);
			var zpos = this.pointA.zpos + this.pointB.zpos + this.pointC.zpos;
			//var zpos = (this.pointB.screenX - this.pointA.screenX) + (this.pointC.screenX - this.pointA.screenX) * (this.pointA.screenY - this.pointC.screenY) / 2; 
			return zpos;
		  }
		}
	});
	
	
	
	window.June = {
		point:Point,
		stage:Stage,
		event:Event,
		triangle:Triangle,
		extend:extend
	}
})();