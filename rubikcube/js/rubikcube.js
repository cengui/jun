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
			//var $(canvas).offset();
			var offsetLeft = $(canvas).offset().left;
			var offsetTop = $(canvas).offset().top;
			this.event = {x:-1, y:-1};
			
			/**
			this.canvas.addEventListener('click', function(e){
				var x = e.clientX - self.canvas.offsetLeft,
					y = e.clientY - self.canvas.offsetTop;
				self.fireEvent("click", x, y);
			}, false);
			*/
			
			
			this.canvas.addEventListener('mousemove', function(e){
				var x = e.clientX - offsetLeft,
					y = e.clientY - offsetTop;

				self.fireEvent("mouseout", x, y);
				self.fireEvent("mousemove", x, y);
				self.fireEvent("mouseover", x, y);
				
				//self.fireEvent("mouseout", x, y);
			}, false);
			
			this.canvas.addEventListener('mouseout', function(e){
				var x = e.clientX - offsetLeft,
					y = e.clientY - offsetTop;
				self.fireEvent("mouseout", x, y);
				//self.fireEvent("mouseout", x, y);
			}, false);
			
			this.canvas.addEventListener('mousedown', function(e){
				var x = e.clientX - offsetLeft;
				var y = e.clientY - offsetTop;
				self.event.x = x;
				self.event.y = y;
				self.fireEvent("mousedown", x, y);
			}, false);
			
			this.canvas.addEventListener('mouseup', function(e){
				var x = e.clientX - offsetLeft;
				var y = e.clientY - offsetTop;
				
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


//------------------

$(document).ready(function(){
/***
	开始魔方全部逻辑
*/
var canvas = document.getElementById('canvas');

if(!(canvas.getContext && canvas.getContext("2d"))){//不支持canvas的浏览器
	return false;
}



var stage = new June.stage(canvas, 230, 230);


var PATH = {
	pic: "http://rs.hk.moxian.com/"
};

for(var i=0; i<mc_apps.length; i++){
	mc_apps[i].app_picture_active = mc_apps[i].app_picture.split("|")[1].replace("%PICROOT%", PATH.pic).replace(/\\\\/g,"/").replace(/\\/g, "/");
	mc_apps[i].app_picture = mc_apps[i].app_picture.split("|")[0].replace("%PICROOT%", PATH.pic).replace(/\\\\/g,"/").replace(/\\/g, "/");
	//console.log(mc_apps[i].app_picture_active);
	//console.log(mc_apps[i].app_picture);
}
var apps = mc_apps;
var referapp = {
	app_height: "-1",
	app_id: "-1",
	app_name: "刷新",
	app_picture: PATH.pic+"/resource/common_info/images/mofang/logo.png",
	app_picture_active: PATH.pic+"/resource/common_info/images/mofang/logo.png",
	app_url: "",
	app_url_show: ""
};



stage.draw = function(){
	this.clear();
	this.childList.sort(function (a, b) {//排序
		return b.depth - a.depth
	});

	var ctx = this.ctx;//重画
	for(var i=0; i<this.childList.length; i++){
		this.childList[i].draw = this.childList[i].defaultDraw;
		this.childList[i].draw(ctx);
	}
};
stage.rotationing = false;
stage.rotation = function(angleX, angleY){
	//var angleX = 0.10;
	//var angleY = 0.10;
	if(this.rotationing){
		return ;
	}
	this.rotationing = true; //标示正在动画
	var countangleX = 0;
	var countangleY = 0;
	var _this = this;
	var id = setInterval(function(){
	
		countangleX += angleX;
		countangleY += angleY;

		countangleX = Math.abs(countangleX) > Math.PI/2 ? Math.PI/2 * (countangleX > 0 ? 1 : -1) : countangleX;
		countangleY = Math.abs(countangleY) > Math.PI/2 ? Math.PI/2 * (countangleY > 0 ? 1 : -1) : countangleY;

		for(var i=0; i<_this.childList.length; i++){ //设置角度
			
			if(countangleY != 0){
				_this.childList[i].rotateY(countangleY);
			}else{
				_this.childList[i].rotateX(countangleX);
			}
		}
		
		_this.draw();
		
		if(Math.abs(countangleX) == Math.PI/2 || Math.abs(countangleY) == Math.PI/2){//如果已经旋转了 90 度
			for(var i=0; i<_this.childList.length; i++){
				_this.childList[i].update();
			}
			_this.rotationing = false;
			clearInterval(id);
			stage.faceDraw();
		}
		
	}, 30);
};

//构建第一面
stage.faceDraw = function(){
	var list = this.childList.slice(-9);
	for(var i=0; i < list.length; i++){
		list[i].draw = list[i].drawImg;
		list[i].draw(stage.ctx);
	}
};

stage.up = function(){
	stage.rotation(-0.10, 0);
};

stage.down = function(){
	stage.rotation(0.10, 0);
};

stage.left = function(){
	stage.rotation(0, -0.10);
};

stage.right = function(){
	stage.rotation(0, 0.10);
};

stage.event = {x:-1,y:-1};
stage.addEvent("mousedown", function(x, y, type){
	this.event.x = x;
	this.event.y = y;
});

stage.addEvent("mouseup", function(x, y, type){
	//左右
	var angle = 0;
	if(Math.abs(this.event.x - x) > 50 && Math.abs(this.event.x - x) > Math.abs(this.event.y - y)){
		this.event.x - x > 0 ? this.left() : this.right();
	}
	if(Math.abs(this.event.y - y) > 50){
		this.event.y - y > 0 ? this.up() : this.down();
	}
	
});


/**此js需要重写*/


var extend = June.extend;
//多边形 现在只支持 4 边行
function Polygon4(triangleA, triangleB, option){
	this.triangleA = triangleA;
	this.triangleB = triangleB;
	
	this.depth = null;
	this.angle = 0;
	
	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	this.zpos = 0;
	this.color = null;
	this.app = null;
	this.ctx = null;
	option && extend(this, option);
	//console.log(option);
	this.init();
};
extend(Polygon4.prototype, new June.event);
extend(Polygon4.prototype, {
	init:function(){
		var _this = this;
		this.img = new Image();
		this.img.onload = function(){
			if(_this.zpos < -400){
				_this.draw(_this.ctx);
			}
		};
		
		this.img.src = this.app.app_picture;
		
		this.imgHover = new Image();
		this.imgHover.onload = function(){
			if(_this.zpos < -400){
				_this.draw(_this.ctx);
			}
		};
		this.imgHover.src = this.app.app_picture_active;
	},
	updateApp:function(app){
		this.app = app;
		this.init();
	},
	rotateY:function(angle){
		this.triangleA.rotateY(angle);
		this.triangleB.rotateY(angle);
		
	},
	rotateX:function(angle){
		this.triangleA.rotateX(angle);
		this.triangleB.rotateX(angle);
	},
	update:function(){
		//console.log('update');
		this.triangleA.update();
		this.triangleB.update();
	},
	defaultDraw:function(ctx){
		var g = ctx,
			pointAA = this.triangleA.pointA,
			pointAB = this.triangleA.pointB,
			pointAC = this.triangleA.pointC,
			pointBA = this.triangleB.pointA,
			pointBB = this.triangleB.pointB,
			pointBC = this.triangleB.pointC,
			color = this.color;
		//Depth example doesn't set a light, use flat color.
		g.beginPath();
		g.moveTo(pointAA.screenX, pointAA.screenY);
		g.lineTo(pointAB.screenX, pointAB.screenY);
		g.lineTo(pointAC.screenX, pointAC.screenY);
		//g.closePath();
		//g.lineTo(pointBA.screenX, pointBA.screenY);
		g.lineTo(pointBB.screenX, pointBB.screenY);
		//g.lineTo(pointBC.screenX, pointBC.screenY);
		//g.lineTo(pointA.screenX, pointA.screenY);
		g.closePath();
		g.fillStyle = color;
		g.fill();
		g.strokeStyle = color;
		g.stroke();
	},
	draw:function(ctx){
		this.defaultDraw(ctx);
	},
	drawImg:function(ctx){
		var g = ctx,
			img = this.img,
			pointAA = this.triangleA.pointA,
			pointAB = this.triangleA.pointB,
			pointAC = this.triangleA.pointC,
			pointBA = this.triangleB.pointA,
			pointBB = this.triangleB.pointB,
			pointBC = this.triangleB.pointC;

		this.defaultDraw(ctx);
		if(this.zpos < -400){
			g.drawImage(img, 0, 0, img.width, img.height, this.x, this.y, this.width, this.height);
		}
	},
	hover:function(ctx){
		var g = ctx,
			img = this.imgHover,
			pointAA = this.triangleA.pointA,
			pointAB = this.triangleA.pointB,
			pointAC = this.triangleA.pointC,
			pointBA = this.triangleB.pointA,
			pointBB = this.triangleB.pointB,
			pointBC = this.triangleB.pointC;
		this.defaultDraw(ctx);
		
		if(this.zpos < -400){
			g.drawImage(img, 0, 0, img.width, img.height, this.x, this.y, this.width, this.height);
		}
	},
	drawAppName:function(ctx,x,y){
		//this.
		ctx.save();
		ctx.fillStyle = "rgba(255,255,255,.8)";  
		ctx.fillRect(this.x, this.y+this.height-15, this.width+1, 15);
		ctx.textAlign = "center";
		ctx.fillStyle = "#000";  		
		ctx.fillText(this.app.app_name, this.x+35, this.y+this.height-3);
		ctx.restore();/***/
	},
	setDepth:function(depth){
		this.depth = depth;
	},
	setColor:function(color){
		this.color = color;
		this.triangleA.setColor(color);
		this.triangleB.setColor(color);
	},
	isEvent:function(x, y, type){
	
		var is = false;
		//console.log(arguments);
		if(this.zpos < -400 && this.x < x && this.y < y  && this.x+this.width > x && this.y+this.height > y){
			is = true;
		}
		
		return type== "mouseout" ? !is : is;
	}
});
Object.defineProperties(Polygon4.prototype, {
	'x': {
	  get: function () {
		return Math.min(
			this.triangleA.pointA.screenX,
			this.triangleA.pointC.screenX,
			this.triangleB.pointA.screenX,
			this.triangleB.pointC.screenX
		);
	  }
	},
	'y': {
	  get: function () {
		//return Math.min(this.triangleA.pointA.screenY, this.triangleB.pointC.screenY);//
		return Math.min(
			this.triangleA.pointA.screenY,
			this.triangleA.pointC.screenY,
			this.triangleB.pointA.screenY,
			this.triangleB.pointC.screenY
		);
	  }
	},
	'width': {
	  get: function () {
		//return Math.abs(Math.max(this.triangleA.pointB.screenX,this.triangleA.pointB.screenX) - this.x);
		return Math.max(
			this.triangleA.pointB.screenX,
			this.triangleB.pointB.screenX
		) - this.x;
	  }
	},
	'height': {
	  get: function () {
		//return Math.abs(Math.max(this.triangleB.pointB.screenY,this.triangleA.pointB.screenY) - this.y);
		return Math.max(
			this.triangleA.pointB.screenY,
			this.triangleB.pointB.screenY
		) - this.y;
	  }
	},
	'zpos': {
		get:function () {
			return this.triangleA.pointA.zpos + this.triangleA.pointB.zpos + this.triangleA.pointC.zpos;
		}
	},
	'depth':{
		get:function(){
			return this.triangleA.depth + this.triangleB.depth;
		}
	}
});


/**
	一个基本的面 
*/
function BaseRect(stage, x, y, z, color, option){};
BaseRect.prototype = {
	init:function(){
		var cube = this.cube;
		var stage = this.stage;
		var _this = this;
		
		var balls = this.balls;
		for(var i=0; i<cube.length; i++){
			var point = new June.point(cube[i][0], cube[i][1], cube[i][2]);
			point.setVanishPoint(115, 115);
			point.setCenterPoint(0, 0, 380);
			balls.push(point);
		};
		var tg1 = new June.triangle(balls[0], balls[1], balls[2], this.color);
		var tg2 = new June.triangle(balls[3], balls[5], balls[4], this.color);
		//depth
		var polygon4 = this.polygon4 = new Polygon4(tg1, tg2, {color:this.color, app:this.app, ctx:stage.ctx});
		
		polygon4.addEvent("mouseover", function(x, y){
			if(stage.rotationing){return ;}
			this.draw = this.hover;
			this.draw(stage.ctx);
			this.drawAppName(stage.ctx);
		});
		
		polygon4.addEvent("mouseout", function(x, y){
			if(stage.rotationing){return ;}
			this.draw = this.drawImg;
			this.draw(stage.ctx);
		});
		
		polygon4.addEvent("click", function(x, y){
			if(stage.rotationing){return ;}
			var self = this;
			if(_this.index == 4){//刷新魔方的某个面
				_this.parent.transform(_this.face);
			}else{
				moxian.openApp({
					title:_this.app.app_name,
					width:_this.app.app_width || 700,
					height:_this.app.app_height != 0 || 500,
					href: _this.app.app_url,
					appid:_this.app.app_id
				});
				
			}
		});
		
		stage.addChild(polygon4);
	},
	setCube:function(x, y , z){//需要覆盖的方法
		throw "undefined setCube";
	},
	setRotateXY:function(angleX, angleY){
		this.polygon4.rotateX(angleX);
		this.polygon4.rotateY(angleY);
	},
	setRotateX:function(angleX){
		this.polygon4.rotateX(angleX);
	},
	setRotateY:function(angleY){
		this.polygon4.rotateY(angleY);
	}
	
};
/**
	前后
*/
function FrontBackRect(stage, x, y, z, color, option){
	var width = 100;

	this.stage = stage;
	this.ctx = stage.ctx;
	this.width = width;
	//this.vpy = vpy;
	//this.vpx = vpx;
	this.cube = null;

	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	
	this.balls = [];
	this.triangle = [];
	this.setCube(x, y, z);
	this.color = color;
	
	this.index = null;
	this.face = null;
	this.parent = null;
	
	option && extend(this, option);
	
	//this.depth = depth;
	this.init();
};
FrontBackRect.prototype = new BaseRect();
FrontBackRect.prototype.setCube = function(x, y, z){
	var width = 100;
	this.cube = [
		//前后 z轴不边
		//-155, -155, -155
		[x, y ,z],
		[x+width, y ,z],
		[x+width, y+width ,z],
		
		[x, y ,z],
		[x+width, y+width ,z],
		[x, y+width ,z]
	];
};
/**
	上下
*/
function UpDownRect(stage, x, y, z, color,option){
	var width = 100;

	this.stage = stage;
	this.ctx = stage.ctx;
	this.width = width;
	//this.vpy = vpy;
	//this.vpx = vpx;
	this.cube = null;

	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	
	this.balls = [];
	this.triangle = [];
	this.color = color;

	//this.depth = depth;
	this.index = null;
	this.face = null;
	this.parent = null;
	
	option && extend(this, option);
	this.setCube(x, y, z);
	this.init();
};
UpDownRect.prototype = new BaseRect();
UpDownRect.prototype.setCube = function(x, y ,z ){
	var width = 100;
	this.cube = [
		//山下 z轴不边
		//-155, -155, -155
		[x, y ,z],
		[x+width, y ,z],
		[x+width, y ,z-width],
		
		[x, y ,z],
		[x+width, y ,z-width],
		[x, y ,z-width]
	];
};

/**左右*/
function LeftRightRect(stage, x, y, z, color, option){
	var width = 100;

	this.stage = stage;
	this.ctx = stage.ctx;
	this.width = width;
	//this.vpy = vpy;
	//this.vpx = vpx;
	this.cube = null;

	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	
	this.balls = [];
	this.triangle = [];
	this.color = color;
	this.index = null;
	this.face = null;
	this.parent = null;
	
	option && extend(this, option);
	//this.depth = depth;
	
	this.setCube(x,y,z);
	
	this.init();
};
LeftRightRect.prototype = new BaseRect();
LeftRightRect.prototype.setCube = function(x, y, z){
	var width = 100;
	this.cube = [
		//山下 z轴不边
		//-155, -155, -155
		[x, y ,z],
		[x, y ,z+width],
		[x, y+width ,z+width],
		
		[x, y ,z],
		[x, y+width ,z+width],
		[x, y+width ,z]
	];
};



//**构造一个面*/
function Rects(stage, rect){
	//前后
	this.stage = stage;
	this.data = null;
	this.after = [];
	//this.rects = [];
	this.rect = rect;
	//this.init();
}

Rects.prototype = {
	init:function(){},
	setRectData:function(data){
		this.data = data;
	},
	getapps:function(index){
		var len = 9;
		var arr = [];
		var app = null;
		var appids = [];
		if((index+1)*9 > apps.length || index == -1){//apps不够用 随即取出app
			while(arr.length < 10){
				app = apps[parseInt((Math.random() * apps.length))];
				if(!new RegExp(app.app_id).test(appids.join())){//如果已经随机到
					appids.push(app.app_id);
					arr.push(app);
				}
			}
			arr[4] = referapp;
			//console.log(appids);
			return arr;
		}
		arr = apps.slice(index*len, (index+1)*len);
		arr[4] = referapp;
		return arr;
	},
	frontBackInit:function(){
		var after = this.after;
		var data = this.data;
		//var rects = this.rects;
		var frontRects = this.frontRects = [];
		var backRects = this.backRects = [];
		var frontapp = this.getapps(0);
		var backapp = this.getapps(3);
		for(var i=0; i<data.length; i++){
			after.push([data[i][0], data[i][1], -data[i][2]]);
			frontRects.push(new this.rect(this.stage, data[i][0], data[i][1], data[i][2], "#b2b2b2",{
				index:i,
				face:"front",
				parent:this,
				app:frontapp[i]
			}));// f30f30
			backRects.push(new this.rect(this.stage, data[i][0], data[i][1], -data[i][2], "#b2b2b2",{
				index:i,
				face:"back",
				parent:this,
				app:backapp[i]
			}));// cccccc
		}
		
	},
	upDownInit:function(){
		var after = this.after;
		var data = this.data;
		var upRects = this.upRects = [];
		var downRects = this.downRects = [];
		
		var upapp = this.getapps(4);
		var downapp = this.getapps(5);
		
		for(var i=0; i<data.length; i++){
			after.push([data[i][0], data[i][1], -data[i][2]]);
			upRects.push(new this.rect(this.stage, data[i][0], data[i][1], data[i][2], "#a6a6a6",{
				index:i,
				face:"up",
				parent:this,
				app:upapp[i]
			}));//
			downRects.push(new this.rect(this.stage, data[i][0], -data[i][1], data[i][2], "#a6a6a6",{
				index:i,
				face:"down",
				parent:this,
				app:downapp[i]
			}));//
		}
	},
	leftRightInit:function(){
		var after = this.after;
		var data = this.data;
		var leftRects = this.leftRects = [];
		var rightRects = this.rightRects = [];
		var leftapp = this.getapps(1);
		var rightapp = this.getapps(2);
		for(var i=0; i<data.length; i++){
			after.push([data[i][0], data[i][1], -data[i][2]]);
			rightRects.push(new this.rect(this.stage, data[i][0], data[i][1], data[i][2], "#bfbfbf",{
				index:i,
				face:"right",
				parent:this,
				app:leftapp[i]
			}));//
			leftRects.push(new this.rect(this.stage, -data[i][0], data[i][1], data[i][2], "#bfbfbf",{
				index:i,
				face:"left",
				parent:this,
				app:rightapp[i]
			}));//
		}
	},
	setDepth:function(depth, rects){
		for(var i=0; i<rects.length; i++){
			rects[i].setDepth(depth);
		}
	},
	transform:function(face){
		var faces = {
			"front":this.frontRects,
			"back":this.backRects,
			"up":this.upRects,
			"down":this.downRects,
			"right":this.rightRects,
			"left":this.leftRects
		};
		
		var faceData = faces[face];
		var arr = this.getapps(-1);
		for(var i=0; i<faceData.length; i++){
			if(i !== 4){
				faceData[i].polygon4.updateApp(arr[i]);
			}
		}
	}
};



//*构造各个面
//上下
var updown = new Rects(stage, UpDownRect);
updown.data = [
	[-155, -155, 155],
	[-50, -155, 155],
	[55, -155, 155],
	
	[-155, -155, 50],
	[-50, -155, 50],
	[55, -155, 50],
	
	[-155, -155, -55],
	[-50, -155, -55],
	[55, -155, -55]
];
updown.upDownInit();


// 前后
var frontBack = new Rects(stage, FrontBackRect);
frontBack.data = [
	[-155, -155, -155],
	[-155, -50, -155],
	[-155, 55, -155],
	
	[-50, -155, -155],
	[-50, -50, -155],
	[-50, 55, -155],
	
	[55, -155, -155],
	[55, -50, -155],
	[55, 55, -155]
];
frontBack.frontBackInit();

//*
//左右
var leftRight = new Rects(stage, LeftRightRect);
leftRight.data = [
	[155, -155, -155],
	[155, -155, -50],
	[155, -155, 55],
	
	[155, -50, -155],
	[155, -50, -50],
	[155, -50, 55],
	
	[155, 55, -155],
	[155, 55, -50],
	[155, 55, 55]
	
];
leftRight.leftRightInit();
// */

//魔方
stage.start();
stage.stop();
setTimeout(function(){
	stage.faceDraw();
}, 500);
window.stage = stage;
});
