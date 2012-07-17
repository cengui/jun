function BaseUserModel(){
	this.url = "http://moxian.com/";
};
BaseUserModel.prototype = new BaseModel();
Common.mix(BaseUserModel.prototype, {
	getPath:function(url){
		return this.url+url;
	},
	login:function(email, pwd){
		Common.post(
			this.getPath("login/gatway.php"), 
			{"type":"login","__userlable__":email,"__pwd__":$.md5(pwd),"keeplogin":"off","u":"","code":""}, 
			this.ajaxResultFunction(arguments)
		);
	},
	getUserInfo:function(mx_id){
		Common.post(
			this.getPath("main/gateway_user.php"), 
			{"type":"get_user_info","status":1,"mx_id":mx_id}, 
			this.ajaxResultFunction(arguments)
		);
	},
	
});


function GameYJSKModel(){
	this.url = "http://app.moxian.com/apps/";
};
GameYJSKModel.prototype = new BaseModel();
Common.mix(GameYJSKModel.prototype, {
	getPath:function(url){
		return this.url+url;
	},
	creategame:function(rank){
		Common.post(this.getPath("quickhand/system/creategame.php"), {rank:rank}, this.ajaxResultFunction(arguments));
		/**
			Common.gid = data.gid;
				$('#gidimage').attr('src', Common.url+data.gid);
				imgbijiao(Common.url+data.gid, function(array){

					array.sort(function(a, b){
						return b.length - a.length;
					});
					
					$('.input').eq(0).val(','+array[0]);
					$('.input').eq(1).val(','+array[1]);
					
					Common.time = setTimeout(function(){
						submit(0);
					}, rad(6,4));
				
				});
				$('#gidbox').find('li').each(function(){
					$(this).attr('checked', '0');
					$(this).css({background:"rgba(155,155,155,0)"});
				});
				$('.input').each(function(){
					$(this).val('');
				});
		*/
	},
	
	start:function(gid){
		Common.post(this.getPath("quickhand/system/start.php"), {gid:gid}, this.ajaxResultFunction(arguments));
		//$('#rulet').attr('src', data.card);
				//{"mobi":"220.00","obtain":10,"status":0}
		/**		
				if(data.status == 0){
					Common.sum += data.obtain;
					if(Common.sum > 4000){
						clearInterval(Common.timeout);
					}
					console.log("当前魔币："+data.mobi, "本次获得:"+data.obtain);
				}else{
					console.log("错误代码:"+data.status);
				}
		*/
	},
	checkchoose:function(gid, pos){
		Common.post(this.getPath("quickhand/system/checkchoose.php"), {gid:gid, pos:pos}, this.ajaxResultFunction(arguments));
		/**		
				if(data.status == 0){
					Common.sum += data.obtain;
					if(Common.sum > 4000){
						clearInterval(Common.timeout);
					}
					console.log("当前魔币："+data.mobi, "本次获得:"+data.obtain);
				}else{
					console.log("错误代码:"+data.status);
				}
		*/
	},
	
});