var Base = {
	mix:function(a, b){
		for(var i in b){
			if(b.hasOwnProperty[i]){
				a[i] = b[i];
			}
		}
		return a;
	}
};

function BaseModel(){
	this.observer = [];
}

Base.mix(BaseModel.prototype, {
	get:function(url, data, success){
		Common.tip(TipData["1001"], 0);
		$.ajax({
			url:url,
			type:"get",
			data:data,
			dataType:"json",
			error:function(){
				Common.tip(TipData["1002"]);
			},
			success:function(data){
				if(data && data.code != 200){
					Common.showError(data);
				}else{
					Common.hideTip();
				}
				success && success(data);
			}
		});
	},
	post:function(url, data, success){
		Common.tip(TipData["1001"], 0);
		$.ajax({
			url:url,
			type:"post",
			data:data,
			dataType:"json",
			error:function(){
				Common.tip(TipData["1002"]);
			},
			success:function(data){
			
				if(data.code != 200){
					Common.showError(data);
				}else{
					Common.hideTip();
				}
				
				success && success(data);
			}
		});
	},
	loadTmpl:function(){
		this.get("user.html", function(data){
			
		});
	},
	loadData:function(id){
		this.get("getData.php",{id:id}, function(data){
			this.data = data;
			this.fire();
		});
	},
	addObserver:function(ctrl){
		this.observer.push(ctrl);
	},
	fire:function(){
		for(var i=0, len=this.observer.length; i<len; i++){
			this.observer[i].update(this.data);
		}
	}
});

function BaseController(){}

Base.mix(BaseController.prototype, {
	update:function(){},//数据合并
	view:function(){},//页面显示
	viewEvent:function(){},//时间注册
	
	
});
