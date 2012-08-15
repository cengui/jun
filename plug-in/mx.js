var MX = {
	extend:function(a, b){//把B对象的属性组合到A对象
		for(var i in b){
			if(b.hasOwnProperty(i)){
				a[i] = b[i];
			}
		}
		return a;
	},
	ui:{},
	kit:{},
	unstr:{}
};