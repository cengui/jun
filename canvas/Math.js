/**
	Math
*/

June.Math = {
	randFloat:function(min, max){
		return Math.random()*(max-min)+min;
	},
	randInt:function(min, max){
		min = min || 0;
		max = max || 65535;
		return parseInt(Math.random()*(max-min)+min);
	}
};