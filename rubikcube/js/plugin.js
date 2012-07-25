var pointsss = [];
function BaseRect(stage, x, y, z, color, depth, vpx, vpy){};
BaseRect.prototype = {
	init:function(){
		/**
		for(var i=0; i<this.cube.length; i++){
			console.log(this.cube[i]);
			pointsss.push(this.cube[i])
		}
		*/
		var cube = this.cube;
		var stage = this.stage;
		
		//var ball = null;
		balls = this.balls;
		//CVS.createTriangle;
		for(var i=0; i<cube.length; i++){
			var point = new June.point(cube[i][0], cube[i][1], cube[i][2]);
			point.setVanishPoint(300, 200);
			point.setCenterPoint(0, 0, 100);
			//stage.addChild(ball);
			balls.push(point);
		};
		var tg1 = new June.triangle(balls[0], balls[1], balls[2], this.color);
		var tg2 = new June.triangle(balls[3], balls[4], balls[5], this.color);
		//depth
		var polygon4 = this.polygon4 = new June.polygon4(tg1, tg2);
		//this.polygon4.setDepth(this.depth);
		//stage.addChild(this.polygon4);
		tg1.addEvent("click", function(x, y){
			//console.log(polygon4);
			//console.log(x, y)
			//console.log(polygon4.x, polygon4.y, polygon4.width, polygon4.height, polygon4.zpos);
			
			if(polygon4.zpos < -300 && polygon4.x < x && polygon4.y < y  && polygon4.x+polygon4.width > x && polygon4.y+polygon4.height > y){
				console.log(polygon4);
				console.log(x, y)
				console.log(polygon4.x, polygon4.y, polygon4.width, polygon4.height, polygon4.zpos);
				polygon4.setColor("#000");
				polygon4.draw(stage.ctx);
			}
			
		});
		stage.addChild(tg1);
		stage.addChild(tg2);
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
	},
	setDepth:function(depth){
		this.polygon4.setDepth(depth);
	}
	
};



function FrontBackRect(stage, x, y, z, color, depth, vpx, vpy){
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
	this.depth = depth;
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

function UpDownRect(stage, x, y, z, color, depth, vpx, vpy){
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
	this.depth = depth;
	
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


function LeftRightRect(stage, x, y, z, color, depth, vpx, vpy){
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
	this.depth = depth;
	
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



