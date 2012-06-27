var User = {
	email:"",
	mobi:0,
	changeMobi:function(val){
		User.mobi = val;
		$('#curmobi').text( val );
	},
	changeEmail:function(email){
		User.email = email;
		$('#curuser').text( email );
	}
};
var page = {
	login:function(email, pwd){
		var model = new BaseUserModel();
		var ctrl = new  BaseController();
		ctrl.update = function(data, action){
			if(data.result == true){
				console.log("登陆成功!");
				//$('#curuser').text(email);
				User.changeEmail(email);
			}else{
				alert(data.reason);
			}
		};
		model.addObserver(ctrl);
		model.login(email, pwd);
	},
	getUserInfo:function(mx_id, callback){
		var model = new BaseUserModel();
		var ctrl = new  BaseController();
		ctrl.update = function(data, action){
			/**
			fans_status: 0
			fans_to: 5
			first_name: "朱"
			last_name: "智欢"
			mobi: "7.00"
			mx_area: "1309"
			mx_birthday: "19850906"
			mx_country: "0"
			mx_email: "jicki@qq.com"
			mx_email_contact: null
			mx_full_area: "亚洲|中国|广东|深圳"
			mx_name: "欢er"
			mx_photo: "upload/user/3469/1337872630.png"
			mx_school: null
			mx_sex: "1"
			mx_work: null
			my_fans: 2
			*/
			callback(data);
			/**
			if(data.result == true){
				console.log("登陆成功!");
				//$('#curuser').text(email);
				User.changeEmail(email);
			}else{
				alert(data.reason);
			}
			*/
		};
		model.addObserver(ctrl);
		model.getUserInfo(mx_id);
	},
	log:function(){
	
		var html = '<div class="log-item">';
		for(var i=0; i<arguments.length; i++){
			html += arguments[i]+ " ";
		}
		html += '</div>';
		
		$('#log').append( html )
	},
	clearLog:function(){
		$('#log').empty();
	},
	sysLog:console.log,
	updateUserInfoRegEvent:function(){
		$('#userlist .update').click(function(){
			var mx_id = parseInt($(this).attr("data-id"));
			var prent = $(this).parent();
			page.getUserInfo(mx_id, function(data){
				if(data){
					prent.find('.mobi').text(data.mobi);
				}
			});
		});
	}
};

console.log = function(){
	page.log.apply(page, [].slice.call(arguments, 0));
	page.sysLog.apply(console, [].slice.call(arguments, 0));
};
/*共用页面逻辑*/

$('#userlist .login').click(function(){
	var input = $(this).parent().find("input[type=text]");
	var mx_id = $(this).attr('data-id');
	$('#updateCurUser').attr('data-id', mx_id);
	page.login(input.eq(0).val(), input.eq(1).val());
});

$('#updateCurUser').click(function(){
	var mx_id = parseInt($(this).attr('data-id'));
	if(mx_id){
		page.getUserInfo(mx_id, function(data){
			$('#curmobi').text(data.mobi);
		});
	}
});

$('#viewUserList').toggle(function(){
	$('#userlist').removeClass('hide');
}, function(){
	$('#userlist').addClass('hide');
});
	
	