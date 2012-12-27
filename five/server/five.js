
/**五子棋 server**/

var FiveGame =  require('./FiveGame.js').FiveGame;
var sockets = require('socket.io');

exports.socketList = {};
exports.roomid = 100;

exports.init = function( server ){
	var _this = this;
	var io = sockets.listen(server);
	io.sockets.on('connection', function (socket) {

	  /**
	  
		创建一个房间
		
	  */
	  socket.on("create", function(){
	  
		var number =  _this.roomid++;
		var fg = new FiveGame(number);
		
		fg.setWSocket(socket);
		fg.setStatus(-100);//未开始
		_this.socketList[number] = fg;
		
		//分配白色
		socket.emit('create', { number:number, color:1});
	  });
	  
	  /**
		落子
	  */
	  socket.on('lazi', function( data ){
	  
		// data.number 房间号
		// data.x
		// data.y
		// data.color
		console.log("-------------------lazi", data);
		if(data.number && _this.socketList[data.number]){
			_this.socketList[data.number].lazi( data.x, data.y, data.color );
		}	
	  });
	  
		/**
		加入一个房间
		*/
		socket.on('join', function( data ){

			if(data.number && _this.socketList[data.number]){
				if(_this.socketList[data.number].status == -100){
					_this.socketList[data.number].setBSocket(socket);
					socket.emit('create', { number:data.number, color:2});
					_this.socketList[data.number].setStatus(1);//未开始
				}else{
					console.log("请求的房间号:"+data.number+",状态为"+_this.socketList[data.number].status);
				}
			}
		});
		
		/**
			
		*/
		socket.on('over', function( data ){
			if(data.number && _this.socketList[data.number] && (data.color == 1 || data.color == 2)){
				_this.socketList[data.number].setStatus(-data.color);//获胜方
			}
		});
		
		
		//请求系统分配
		socket.on('allot', function(){
			for(var item in _this.socketList){
				if(_this.socketList.hasOwnProperty(item) && _this.socketList[item].status == -100){
					socket.emit('create', {number:_this.socketList[item].number, color:2});
					_this.socketList[item].setBSocket(socket);
					_this.socketList[item].setStatus(1);
					return ;
				}
			}
		});
	});
};

