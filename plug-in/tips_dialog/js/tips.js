
/**
	#lujun
	#2012-08-08
	
	需求
		Jquery.js
		DragElement.js
	
	MX.ui.ok(context, timeout);
	MX.ui.alert(context, callback);
	MX.ui.confirm(context, callback);
	MX.ui.tip(option);
		option
			title:"tip",
			context:"hello world",
			callback:function(){}, "close" | "ok" | "cancel" | "auto"
			type: "notice" | "success" | "none"
			timeout:0,
			okbtn:true,
			cancelbtn:true,
			closebtn:true,
*/
MX.extend(MX.ui, {
	ok:function(context, timeout){
		timeout  = timeout || 3000;
		var tip = this.tip({
			context:context,
			okbtn:false,
			cancelbtn:false,
			//closebtn:true,
			type:"success",
			timeout:timeout,
			title:base_lang.tip
		});
		tip.ui.close.focus();
	},
	alert:function(context, callback){
		var tip = this.tip({
			context:context,
			cancelbtn:false,
			//closebtn:false,
			type:"notice",
			callback:callback,
			title:base_lang.tip
		});
		tip.ui.ok.focus();
	},
	confirm:function(context, callback){
		var tip = this.tip({
			context:context,
			closebtn:false,
			type:"notice",
			callback:function(action){
				action = action == "ok" ? true : false;
				callback && callback(action);
			},
			title:base_lang.tip
		});
		
		tip.ui.ok.focus();
	},
	tip:(function(){
	
		var lang = {
			title:base_lang.tip,
			close:base_lang.close,
			ok:base_lang.ok,
			cancel:base_lang.cancel
		};

		var HTMLTMPL = '<div class="moxian-ui-tip">\
				<div class="ui-tip-wrapper">\
					<div class="ui-tip-main">\
						<div class="ui-tip-title">\
							<h1><%=title%></h1>\
							<%if(closebtn){%>\
							<input type="button" class="ui-btn-close" title="'+lang.close+'" />\
							<%}%>\
						</div>\
						<div class="ui-tip-context">\
							<p class="p">\
								<span class="ui-tip-icon ui-tip-<%=type%>"></span><span><%=context%></span>\
							</p>\
						</div>\
						<div class="ui-tip-btn">\
							<%if(okbtn){%>\
								<input type="button" title="'+lang.ok+'" class="ui-btn-ok" value="'+lang.ok+'" />\
							<%}%>\
							<%if(cancelbtn){%>\
								<input type="button" title="'+lang.cancel+'" class="ui-btn-cancel" value="'+lang.cancel+'" />\
							<%}%>\
						</div>\
					</div>\
				</div>\
				<div class="ui-tip-bg"></div>\
			</div>';
		
		function tip( option ){
			
			this.option = {
				title:base_lang.tip,
				context:"hello world",
				callback:function(){},
				timeout:0,
				okbtn:true,
				cancelbtn:true,
				closebtn:true,
				type:"notice"
			};
			
			$.extend(this.option, option)
			console.log( this.option );
			this.init();
		}
		tip.prototype = {
			
			init:function(){
				//console.log(HTMLTMPL);
				var html = Common.tmpl(HTMLTMPL, this.option);
				var div = $('<div></div>').append( html );
				
				this.ui = {
					wrapper:div.find('.moxian-ui-tip'),
					title:div.find('.ui-tip-title'),
					close:div.find('.ui-btn-close'),
					ok:div.find('.ui-btn-ok'),
					cancel:div.find('.ui-btn-cancel')
				};
				
				$(document.body).append( div.find('.moxian-ui-tip') );
				
				this.regEvent();
				
				if(this.option.timeout){
					this.setTimeout(this.option.timeout);
				};

				new MX.kit.DragElement({
					dragElement:this.ui.title,
					moveElement:this.ui.wrapper,
					isRange:false,
					isResize:false,
					offsetTop:0
				}).init();
				
				
				this.updatePos();
			},
			regEvent:function(){
				var _this = this;
				
				this.ui.close.click(function(){
					_this.close( "close" );
				});
				
				this.ui.ok.click(function(){
					_this.close( "ok" );
				});
				
				this.ui.cancel.click(function(){
					_this.close( "cancel" );
				});
				
				function esc(e){
					if(e.keyCode == 27){// esc
						_this.close("close");
						$(window).unbind("keyup", esc);
					}
				};
				
				$(document).keyup(esc);
				
			},
			close:function(action){
				this.ui.wrapper.remove();
				this.option.callback(action);
			},
			updatePos:function(){
				var height = $(window).height();
				var width = $(window).width();
				this.setPos((height-this.ui.wrapper.height()) / 2, (width-this.ui.wrapper.width()) / 2);
			},
			"setTimeout":function( time ){
				var _this = this;
				setTimeout(function(){
					_this.close("auto");
				}, time);
			},
			setPos:function(top, left){
				this.ui.wrapper.css({
					top:top+"px",
					left:left+"px"
				})
			}
			
		};
		
		return function(option){
			return new tip(option);
		}
		
	})()
});