/**

	五子棋 棋盤 構建類
	
	new FiveChessboard( options );
	
	options:
		wrap:"#FiveChessboard"  //容器ID
		size:15 //棋盤大小
		
		setEmptyAll(); //清空盘面
		setFill(x, y, s) //在 x y 下子 s   s = [0,1,2];
		setBack(); //取消上一次操作
		
		getData();//获取盘面对局数据
		
		onOver(); //当游戏结束
		
*/

Jun.g.FiveChessboard = function( options ){
	this.wrap = null;
	this.size = 15;
	this.color = 1;
	this.status = -2;// -100无法继续  -2 等待对方  -1平局  0可以继续游戏  1 白棋获胜 2 黑棋获胜
	this.previous = null;
	Jun.extend(this, options || {});
	this.data = [];
	this.init();
};

Jun.g.FiveChessboard.prototype = {
	construcotr:Jun.g.FiveChessboard,
	init:function(){
		var html = "", i=0, j=0;
		for(i=0; i<this.size; i++){
			this.data[i] = [];
			for(j=0; j<this.size; j++){
				//this.data[i][j] = 0;
				html += this.createItem( geti(i,j,this.size), i*30, j*30, i, j);
				
			}
		}
		
		$(this.wrap).html( html );
		
		this.regEvent();
		function geti( i, j, size ){
		
			if(j == 0){
				if(i == 0){
					return 1;
				}
				if(i == size - 1){
					return 7;
				}
				return 4;
			}
			
			if( j == size-1){
			
				if(i == 0){
					return 3;
				}
				if(i == size - 1){
					return 9;
				}
				return 6;
				
			}
			
			if(i == 0){
				return 2;
			}
			if(i == size-1){
				return 8;
			}
			
			return 5;
		}
		
	},
	createItem:function(i, top, left, x, y){
		return '<div class="five-doc five-doc'+i+'" style="left:'+left+'px;top:'+top+'px" ><div class="five-doc five-d" data-xy="'+x+','+y+'" id="fived'+x+'-'+y+'" ></div></div>';
	},
	regEvent:function(){
		var _this = this;
		this.wrap.find('.five-d').click(function(){
			var xy = $(this).data('xy').split(',');
			if(_this.isFill()){
				_this.setFill(xy[0], xy[1], _this.color);
			}
		});
	},
	setFill:function(x, y, color){
		if(this.data[x][y] === undefined){
			this.data[x][y] = color;
			this.setPrevious();//改变上一次动作的状态
			$('#fived'+x+'-'+y).addClass(color==1?"five-current-white":"five-current-black");//five-current-white
			this.previous = {x:x,y:y,color:color};
			var a = this.isOver();
			this.onFill(x, y, color);
			if(a == 1){
				//alert("白方胜出");
				this.onOver(1);
			}
			if(a == 2){
				this.onOver(2);
				//alert("黑方胜出");
			}
			
		}
	},
	setColor : function( color ){// 1白旗 2黑棋
		this.color = color == 1 ? 1 : 2;
	},
	setPrevious:function(){
		var p = this.previous;
		if(p){
			$('#fived'+p.x+'-'+p.y).removeClass(p.color == 1 ? 'five-current-white' : 'five-current-black').addClass(p.color==1?"five-white":"five-black");//five-current-white
		}
	},
	isOver:function(){
		// -100无法继续  -2 等待对方  -1平局  0可以继续游戏  1 白棋获胜 2 黑棋获胜
		var data = this.data;
	
		
		function isover(data, i, j){
			var c = data[i][j];
			if( c != undefined && (
				(data[i][j+1] == c && data[i][j+2] == c && data[i][j+3] == c && data[i][j+4] == c) ||
				(data[i+1][j] == c && data[i+2][j] == c && data[i+3][j] == c && data[i+4][j] == c) ||
				(data[i+1][j+1] == c && data[i+2][j+2] == c && data[i+3][j+3] == c && data[i+4][j+4] == c) ||
				(data[i-1][j+1] == c && data[i-2][j+2] == c && data[i-3][j+3] == c && data[i-4][j+4] == c)
				)
			)return c;
			return 0;
		}
		
		for(var i=0;i<data.length; i++){
			for(var j=0; j<data[i].length; j++){
				var isInt = isover( data, i, j );
				if(isInt != 0){
					return isInt;
				}
			}
		}
		
		return 0;
		
	},
	isFill:function(){
		return true;//是否可以落子
	},
	onOver:function(){
	
	},
	onFill:function(x, y, color){
		
	}
};
