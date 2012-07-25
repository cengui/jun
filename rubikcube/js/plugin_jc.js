function BaseRect(stage, x, y, z, color, vpx, vpy){};
BaseRect.prototype = {
	init:function(){
		var cube = this.cube;
		var stage = this.stage;
		//var ball = null;
		//balls = this.balls;
		//CVS.createTriangle;
		for(var i=0; i<cube.length; i++){
			var point = CVS.createPoint3D(stage.ctx, function(){
				this.xpos = cube[i][0];
				this.ypos = cube[i][1];
				this.zpos = cube[i][2];
				this.width = 0;
				this.draw = function () {
					//console.log(this.width);
					//this.ctx.beginPath();
					//this.ctx.arc(0, 0, this.width/2, 0, Math.PI*2, true);
					//this.ctx.closePath();
					//this.ctx.fill();
				};
			});
			point.setVanishPoint(300, 200);
			point.setCenterPoint(0, 0, 600);
			//stage.addChild(ball);
			balls.push(point);
			//balls.push(point);
		};
		var tg1 = CVS.createTriangle(stage.ctx, balls[0], balls[1], balls[2], this.color);
		var tg2 = CVS.createTriangle(stage.ctx, balls[3], balls[4], balls[5], this.color);
		//depth
		//tg1.addEvent("click", function(){//1
		//	alert(1)
		//});
		//tg2.addEvent("click", function(){//2
		//	alert(2)
		//});
		
		stage.addChild(tg1);
		stage.addChild(tg2);
	},
	setCube:function(x, y , z){//需要覆盖的方法
		throw "undefined setCube";
	},
	setRotateXY:function(angleX, angleY){
		for(var i=0; i<this.balls.length; i++){
			this.balls[i].rotateX(angleX);
			this.balls[i].rotateY(angleY);
		}
	},
	setRotateX:function(angleX){
		for(var i=0; i<this.balls.length; i++){
			this.balls[i].rotateX(angleX);
		}
	},
	setRotateY:function(angleY){
		for(var i=0; i<this.balls.length; i++){
			this.balls[i].rotateY(angleY);
		}
	}
	
};



function FrontBackRect(stage, x, y, z, color, vpx, vpy){
	var width = 100;
	this.stage = stage;
	this.ctx = stage.ctx;
	this.width = width;
	this.vpy = vpy;
	this.vpx = vpx;
	this.cube = null;

	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	
	this.balls = [];
	this.triangle = [];
	this.setCube(x, y, z);
	this.color = color;
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

function UpDownRect(stage, x, y, z, color, vpx, vpy){
	var width = 100;
	this.stage = stage;
	this.ctx = stage.ctx;
	this.width = width;
	this.vpy = vpy;
	this.vpx = vpx;
	this.cube = null;

	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	
	this.balls = [];
	this.triangle = [];
	this.color = color;
	
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


function LeftRightRect(stage, x, y, z, color, vpx, vpy){
	var width = 100;
	this.stage = stage;
	this.ctx = stage.ctx;
	this.width = width;
	this.vpy = vpy;
	this.vpx = vpx;
	this.cube = null;

	this.x = 0;
	this.y = 0;
	this.width = 0;
	this.height = 0;
	
	this.balls = [];
	this.triangle = [];
	this.color = color;
	
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



