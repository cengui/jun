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
			{"__userlable__":email,"__pwd__":pwd,"keeplogin":"off","u":"","code":""}, 
			this.ajaxResultFunction(arguments)
		);
	}
});