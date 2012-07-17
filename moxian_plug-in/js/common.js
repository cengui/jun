Common = {
	mix:function(a, b){
		for(var i in b){
			if(b.hasOwnProperty(i)){
				a[i] = b[i];
			}
		}
		return a;
	},
	tmpl:function(str, data){
			var fn = !/\W/.test(str) ?
			  cache[str] = cache[str] ||
				tmpl(document.getElementById(str).innerHTML) :
			  
			  new Function("obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};" +
				"with(obj){p.push('" +
				
				str
				  .replace(/[\r\t\n]/g, " ")
				  .split("<%").join("\t")
				  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
				  .replace(/\t=(.*?)%>/g, "',$1,'")
				  .split("\t").join("');")
				  .split("%>").join("p.push('")
				  .split("\r").join("\\'")
			  + "');}return p.join('');");
			  
			return data ? fn( data ) : fn;
	},
	get:function(url, data, success){
		$.ajax({
			url:url,
			type:"get",
			data:data,
			dataType:"json",
			error:function(data){
				//Common.tip(TipData["1002"], 0);
				//common_custom_msg('请求出现错误,请稍后再试。');
			},
			success:function(data){
				success && success(data);
			}
		});
	},
	post:function(url, data, success){
		$.ajax({
			url:url,
			dataType:"json",
			type:"post",
			data:data,
			dataType:"json",
			error:function(){
				console.log("ajax error");
				success && success();
			},
			success:function(data){
				success && success(data);
			}
		});
	},
	random:function(min, max){
		min = min || 0;
		var x = Math.random() * max;
		while(min > x){
			return this.random(max, min);
		}
		return parseInt(x);
	},
	countDown:function(time){
		var now = new Date();
		var endDate = new Date(time);
		var leftTime=endDate.getTime()-now.getTime();
		var leftsecond = parseInt(leftTime/1000);
		//var day1=parseInt(leftsecond/(24*60*60*6));
		var day1=Math.floor(leftsecond/(60*60*24)); 
		var hour=Math.floor((leftsecond-day1*24*60*60)/3600);
		var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60);
		var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60);

			
		return day1+":"+hour+":"+minute+":"+second;
	}
};

function BaseModel(){
	this.observers;
};
			
BaseModel.prototype = {
	ajaxResultFunction:function(arg){
		var _this = this;
		var action = this.getAction(arg);
		return function(data){
			_this.changeValue(data, action);
		};
	},
	getAction:function(arg){
		return arg[arg.length];
	},
	addObserver:function(a){
		if(!this.observers){this.observers = []};
		this.observers.push(a);
	},
	loadData:function(){
		throw "undefined";
	},
	changeValue:function(data, action){
		var observers = this.observers;
		for(var i = 0; observers && i<observers.length; i++){
			observers[i].update(data, action);
		}
	}
};

function BaseController(model){
	this.model = model;
};
BaseController.prototype = {
	update:function(){
		throw "undefined";
	}
};
			
			