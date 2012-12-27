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
	Jun.extend(this, options || {});
	this.data = [];
	this.s = 1;
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
			var xy = $(this).data('xy').split(',')
			_this.setFill(xy[0], xy[1], _this.s);
		});
	},
	setFill:function(x, y, s){
		if(this.data[x][y] === undefined){
			this.data[x][y] = s;
			$('#fived'+x+'-'+y).addClass(s==1?"five-white":"five-black");
			var a = this.isOver();
			this.onFill(x, y, s);
			if(a == 1){
				alert("白方胜出");
			}
			if(a == 2){
				alert("黑方胜出");
			}
			
		}
	},
	isOver:function(){
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
	onOver:function(){
	
	},
	onFill:function(x, y, s){
		
	}
};
