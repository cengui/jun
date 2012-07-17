
		/**
			FriendSelect 选择界面类
		*/
		function FriendSelect(wrap, opt){
			// x, y的偏移量
			this.px = 5;
			this.py = 0;
			this.opt = opt;
			
			this.wrap = $(wrap);
			this.ele = null;
			this.ul = null;
			this.input = null;
			this.input_mx_id = 0;
		};
		FriendSelect.tmpl = '<div class="mx-circle-friend">\
			<div class="title">选择好友或输入标签<p class="del" title="取消"></p></div>\
			<div class="context">\
				<input type="text" class="input" placeholder="输入描述或选择好友" maxlength="40" />\
				<div class="tip-text">选择您的好友：</div>\
				<div class="firend-list">\
					<ul class="firend-list-ul">\
						<li>加载好友...</li>\
					</ul>\
				</div>\
				<div class="buttons">\
					<input type="button" value="确定" class="btns submit" />  <input type="button" value="取消" class="btns esc" />\
				</div>\
			</div>\
		</div>';
		//[{"mx_id":1001,"mx_name":"M\u9b54\u738bM"}]
		FriendSelect.itemLi = '<li><label><input type="radio" name="firend" id="" value="$mx_id$" data-mx_name="$mx_name$" /> $mx_name$</label></li>';
		FriendSelect.prototype = {
			constructor:FriendSelect,
			init:function(){
				var _this = this;
				this.wrap.append(FriendSelect.tmpl);
				this.ele = this.wrap.find('.mx-circle-friend');
				this.input = this.wrap.find('.input');
				
				this.ele.find('.esc,.del').click(function(e){
					_this.close();
				});
				
				this.ele.find('.submit').click(function(e){
					_this.submit();
				});
				
				this.ul = this.ele.find('.firend-list-ul');
				
				//如果input没有值，清空已经选中的人
				this.input.keyup(function(){
					if($(this).val() == ""){
						_this.ul.find('input').attr('checked', false);
						_this.input_mx_id = 0;
					};
					if(_this.input_mx_id == 0){
						_this.onSearch( $(this).val()  );
					}
				});
			},
			hide:function(){
				this.ele.hide();
			},
			show:function(){
				this.ele.show();
			},
			setPos:function(x, y){
				x += this.px;
				y += this.py;
				this.show();
				this.ele.css({left:x, top:y});
			},
			close:function(){
				this.hide();
				this.opt.onClose();
			},
			submit:function(){
				this.opt.onsubmit();
			},
			showSelectList:function(data){
				//var ul = this.wrap.find('.firend-list-ul');
				
				this.input_mx_id = 0;
				
				if(!data || data.length == 0){
					this.ul.html("<li>无</li>");
					return ;
				};
				var _this = this;
				var html = "";
				if(data.length > 100){data.length = 100};
				for(var i=0; i<data.length; i++){
					html += FriendSelect.itemLi.replace("$mx_id$", data[i].mx_id).replace(/\$mx_name\$/g, data[i].mx_name);
				};
				this.ul.find('input').unbind('click');
				this.ul.html( html );
				
				this.ul.find('input').click(function(){
					console.log($(this).attr('data-mx_name'));
					_this.input.val( $(this).attr('data-mx_name') );
					_this.input_mx_id = $(this).val();
				});
				
				
			},
			getATinfo:function(){
				return {mx_id:this.input_mx_id, tag:this.input.val()}
			},
			onSearch:function(key){
				this.opt.onSearch( key );
			}
		};
		
		
		
		/**
			圈人类
					x, y //左上角顶点坐标
					width, height //宽度和高度
					
					宽度高度最小值100,x，y坐标最小值 0
					
					
			new ImagesCircle(id);
			-initCircle 开始圈人
			-delCircle 删除一个圈
			-addCircle 添加一个圈
				-addCircles 初始化图片所有的圈
				
			getCircle 获取当前用户的圈
				
			
		*/
		
		function ImagesCircle( id ){
		
			var _this = this;
			this.img = $(id);
			this.x = 0;
			this.y = 0;
			this.width = 100;
			this.height = 100;
			
			this.minWidth = 10;
			this.minHeight = 10;
			
			this.friendSelect = null;
			this.jcrop_api = null;
			
			this.wrap = null;
			this.cWrap = null;
			
			this.zWidth = 0;
			this.zHeight = 0;
			this.proportionX = 1;
			this.proportionY = 1;
			this.load = false;
			this.noCircle = false;
			
			this.img.load = function(){
				_this.load = true;
			};
			
		};

		ImagesCircle.prototype = {
			constructor:ImagesCircle,
			timeout:function(fn){
				if(this.load){
					fn.call(this);
				}else{
					setTimeout(fn, 1000);
				}
			},
			init:function(){
				
				var width = this.img.width();
				var height = this.img.height();
				
				if(width < 110 || height < 110){
					this.noCircle = true;
					return;
				};
				this.calculate();
				this.img.parent().append( $('<div>').css({width:width+"px", height:height+"px", margin:"auto", position:"relative"}) );
				
				this.wrap = this.img.parent().find('div').eq(0);
				this.wrap.append(this.img);
				this.wrap.append( $('<div class="mx-circles-wrap"><div') );
				this.cWrap = this.wrap.find('.mx-circles-wrap');
			},
			initCircle:function(){
				if(this.noCircle){
					return this.onNoCircle();
				};
				var _this = this;
				var initSelect = [0, 0, 100, 100];
				var minSize = [this.minWidth, this.minHeight];
				
				function selectAndChange(c){
					_this.friendSelect.setPos(c.x+c.w, c.y);
					_this.x = c.x;
					_this.y = c.y;
					_this.width = c.w;
					_this.height = c.h;
				}
				this.img.Jcrop({
					setSelect:initSelect,
					minSize:minSize,
					onSelect:function(c){//选中
						if( _this.friendSelect ){
							selectAndChange(c);
						}
					},
					onChange:function(c){//移动
						if( _this.friendSelect ){
							selectAndChange(c);
						}
					},
					onRelease:function(){//退出
						_this.release();
						if( _this.friendSelect ){
							_this.friendSelect.hide();
						}
					}
				}, function(){
					_this.jcrop_api = this;
					
					if(_this.friendSelect == null){
						_this.friendSelect = new FriendSelect(_this.wrap, _this);
						_this.friendSelect.init();
						_this.friendSelect.setPos(_this.x+_this.width, _this.y);
					}
				});
				if(_this.jcrop_api){
					_this.jcrop_api.enable();
					this.jcrop_api.ui.holder.show();
					this.img.css({
						display:"none"
					});
				}
			},
			onNoCircle:function(){},
			calculate:function(){//获取真实图片与当前的比例
				var _this = this;
				var img = new Image();
				
				var width = this.img.width();
				var height = this.img.height();
				_this.zload = false;
				img.onload = function(){
					_this.zWidth = this.width;
					_this.zHeight = this.height;

					_this.proportionX = parseInt(_this.zWidth / width * 100)/ 100 || 1;
					_this.proportionY = parseInt(_this.zHeight / height *100) /100 || 1;
					_this.zload = true;
				};
				img.src = this.img.attr('src');
			},
			getCircle:function(){
				var atInfo = this.friendSelect.getATinfo();
				return {x:Math.round(this.x*this.proportionX), y:Math.round(this.y*this.proportionX), width:this.width, height:this.height, v_mx_id:atInfo.mx_id, tag:atInfo.tag};
			},
			release:function(){
				//this.jcrop_api.disable();
				this.jcrop_api.ui.holder.hide();
				this.img.css({
					visibility:"visible",
					display:"block"
				});
			},
			onClose:function(){
				this.jcrop_api.release();
			},
			onsubmit:function(){//提交回调
				
			},
			close:function(){
				if(this.friendSelect){
					this.friendSelect.close();
				}
			},
			/**在图片上画圈的API*/
			addCircles:function( data ){
				var _this = this;
				if(this.zload){
					for(var i=0; i<data.length; i++){
						this.addCircle( data[i] );
					}
				}else{
					setTimeout(function(){
						_this.addCircles( data );
					});
				}
			},
			addCircle:function(data){
				if(!data){ return ;}
				data.x = parseInt(data.x);
				data.y = parseInt(data.y);
				data.width = parseInt(data.width);
				data.height = parseInt(data.height);
				var _this = this;
				var link, itemTextNode;
				//console.log(this.proportionY);
				var item = $('<div class="mx-circle-box out" id="cir_'+data.id+'">').css({
					width:data.width,
					height:data.height,
					top:(data.y / this.proportionY),
					left:data.x / this.proportionX
				});
				
				if(data.status){
					item.append('<p class="del" title="删除" data-id="'+data.id+'"></p>');
					item.find('.del').click(function(){
						_this.onDelCircle( $(this).attr('data-id') );
					});
				}
				
				item.mouseover(function(){
					$(this).addClass('over')
				});
				item.mouseout(function(){
					$(this).removeClass('over')
				});
				
				
				
				itemTextNode = $('<span class="mx-circle-text">').css({"margin-top":data.height+5+"px"});
				if(data.v_mx_id && data.v_mx_id !== "0"){
					link = $('<a href="/main/user.php?mx_id='+data.v_mx_id+'" target="_blank">').text( data.tag );
					itemTextNode.append( link );
				}else{
					itemTextNode.html('<span class="text">'+data.tag+'</span>');
				}
				
				item.append( itemTextNode );
				
				this.cWrap.append(item);
			},
			onDelCircle:function(){
				
			},
			onSearch:function(key){},
			delCircle:function(id){
				$('#cir_'+id).remove();
			},
			showFriendList:function(data){
				if(this.friendSelect){
					this.friendSelect.showSelectList(data);
				}
			}
		};
		
		
		/**
			功能
		*/
		
		;(function(){
			
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
						type:"post",
						data:data,
						dataType:"json",
						error:function(){
							//Common.tip(TipData["1002"]);
							//common_custom_msg('请求出现错误,请稍后再试。');
						},
						success:function(data){
							success && success(data);
						}
					});
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
	
	
			
			
			function mix(a, b){
				for(var i in b){
					if(b.hasOwnProperty(i)){
						a[i] = b[i];
					}
				}
				return a;
			};
			
			var  imagescircle = new ImagesCircle("#info_main_img");
			imagescircle.timeout(function(){
				imagescircle.init();//创建一个DIV包围img 为以下程序提供容器
				imagescircle.onNoCircle = function(){//图片为达到要求
					common_custom_msg("图片尺寸未达到要求");
					return false;
				};
				imagescircle.onsubmit = function(){//提交
					addCirle(imagescircle);
				};
				imagescircle.onDelCircle = function(id){//删除
					common_custom_msg("您是否要删除圈！", '确认','', true, function(){
						new MxPhotoModel().removeCirle(id);
						setTimeout(function(){
							common_custom_msg("删除成功");
						}, 500);
						imagescircle.delCircle(id);
					});
				};
				imagescircle.onSearch = function(key){//搜索好友
					loadFirends(imagescircle, key);
				};
				loadImageCircle( imagescircle );//加载已有的圈
				$('#circleImage').click(function(){
					imagescircle.initCircle();//开始画圈
					loadFirends( imagescircle );
				})
			});
			
			function MxPhotoModel(){};
			MxPhotoModel.prototype = new BaseModel();
			mix(MxPhotoModel.prototype, {
				searchFirend:function(key){//搜索好友
					this.get("search.php", {action:"search_each_fans", search_value:key}, this.ajaxResultFunction(arguments));
				},
				getFirends:function(){
					this.post("gateway_fans.php", {action:"fans_to_info"}, this.ajaxResultFunction(arguments));
				},
				getCirles:function(sub_id){//获取已有的圈圈
					this.post("gateway_cirle.php", {p:1, page_size:100, sub_id:sub_id, action:"index"}, this.ajaxResultFunction(arguments));
				},
				addCirle:function(sub_id, x, y, width, height, v_mx_id, tag){//添加圈圈
					this.post("gateway_cirle.php", {
						x:x,
						y:y,
						width:width,
						height:height,
						v_mx_id:v_mx_id,
						tag:tag,
						sub_id:sub_id, 
						action:"info_cirle"
					}, 
					this.ajaxResultFunction(arguments));
				},
				removeCirle:function(id){
					this.post("gateway_cirle.php", {id:id, action:"remove_cirle"}, this.ajaxResultFunction(arguments));
				}
			});
			
			//获取图片的圈
			function loadImageCircle( imagescircle ){
				var model = new MxPhotoModel();
				var ctrl = new BaseController(model);
				ctrl.update = function( data ){
					if(data){
						imagescircle.addCircles( data.data );
					}
				};
				model.addObserver(ctrl);
				model.getCirles(this_sub_id);//this_sub_id 本页的定义
			};
			
			//获取用户好友
			function loadFirends( imagescircle, key ){
				var model = new MxPhotoModel();
				var ctrl = new BaseController(model);
				ctrl.update = function( data ){
					imagescircle.showFriendList( data );
				};
				model.addObserver(ctrl);
				if(key){
					model.searchFirend(key);//this_sub_id 本页的定义
				}else{
					model.getFirends();//this_sub_id 本页的定义
				}
			};
			
			//添加一个圈
			function addCirle( imagescircle ){
				var circleInfo = imagescircle.getCircle();
				var model = new MxPhotoModel();
				var ctrl = new BaseController(model);
				ctrl.update = function( data ){
					if(data && data.result == 1){
						imagescircle.close( data );
						circleInfo.status = 1;//表示权限可以删除
						circleInfo.id = data.id;
						imagescircle.addCircle( circleInfo );
						common_custom_msg('添加圈子成功');
					}else{
						common_custom_msg(data.reason);
					}
				};
				model.addObserver(ctrl);
				if(circleInfo.tag){
					model.addCirle(this_sub_id, circleInfo.x, circleInfo.y, circleInfo.width, circleInfo.height, circleInfo.v_mx_id, circleInfo.tag);//this_sub_id 本页的定义
				}else{
					common_custom_msg('请输入标签');
				}
			};
	})();
		


	


		