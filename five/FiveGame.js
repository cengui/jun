

/**
	server FiveGame
*/

function FiveGame( number ){
	this.number = number;
	this.status = -100; //  -2已经结束 -100未开始 0正在进行中    1等待白子下棋  2等待黑子下棋
	this.wSocket = null;
	this.bSocket = null;
};

FiveGame.prototype = {
	setWSocket:function( socket ){
		this.wSocket = socket;
	},
	setBSocket:function( socket ){
		this.bSocket = socket;
	},
	setStatus:function( status ){
		this.status = status;
		this.bSocket && this.bSocket.emit("status", {number:this.number, status:status});
		this.wSocket && this.wSocket.emit("status", {number:this.number, status:status});
	},
	
	lazi:function(x, y, color){
		if(color == this.status){
			if(color == 1){
				this.bSocket.emit("lazi", {x:x,y:y,color:color});
				this.setStatus(2);
			}
			if(color == 2){
				this.wSocket.emit("lazi", {x:x,y:y,color:color});
				this.setStatus(1);
			}
		}
	}
};
