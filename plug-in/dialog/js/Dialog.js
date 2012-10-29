
/**
依赖 
    jquery.js
    Jun.template.js
    DragElement.js
    Resize.js
    
    
option
{
    isClose:true,关闭按钮
    isMaximize:false,最大化按钮
    isResize:false,伸缩
    isMove:true,移动
    title:"moxian"
    width:100,
    height:100,//高度不包含h1的高度
    top:100,
    left:100
    overflow: true //true溢出显示  false 溢出隐藏
    url:"",iframe默认加载地址
	html:"",
    skin:"default" | "classical",
	isMask:true //是否有遮罩层
	
}

api
    setRemove();//彻底删除dialog
    setClose();    
    setOpen();
    setRefresh();//刷新
    setGohome();//返回第一次打开的页面
    setMaximize();//最大化
    setDefimize();//还原窗口大小
    
    
event
    onclose();//当关闭dialog的时候调用
    onready();//dialog初始化完成调用
    onresize();//dialog尺寸发生变化
    
*/
MX.extend(MX.ui, (function(){
	
	//var DragElement = MX.ui.DragElement;
	//var Resize = MX.ui.Resize;
	
	var config = {
		"default":{
			plusWidth:2,
			patchWidth:2,//补丁宽度 会添加到 moveElement的宽度上
			patchHeight:3,
			patchTop:36,
			patchLeft:2
		},
		"classical":{
			plusWidth:2,
			patchWidth:8,//补丁宽度 会添加到 moveElement的宽度上
			patchHeight:8,
			patchTop:42,
			patchLeft:8
		}
	};
	
    function mxDialog( option ){
                
        this.isMax = false;        
        this.isClose = true;//关闭按钮
        this.isMaximize = false;//最大化按钮
        this.isResize = false;//伸缩
        this.isMove = true;//移动
		this.isMask = true;
        this.title = "MoXian.com";
        this.minWidth = 100;
        this.minHeight = 100;
        this.width = 100;
        this.height = 100;
        this.top = "auto";
        this.left = "auto";
		this.right = "auto";
		this.bottom = "auto";
		this.overflow = true;
        this.i = mxDialog.count++;
        this.index = mxDialog.index++;
		this.skin = "default";
		this.url = null;
		this.html = null;
		
        this.ui = {};
		
        $.extend(this, option);
		this.skinConfig = $.extend({patchWidth:0,patchHeight:0,patchLeft:0,patchRight:0}, config[this.skin] || {});
    };
    mxDialog.dialogList = [];
    mxDialog.count = 1;
    mxDialog.index = 100;
	mxDialog.lang = {
		cn:{
			"home":"主页",
			"maximize":"最大化",
			"restore":"还原",
			"close":"关闭"
		},
		en:{
			"home":"Home",
			"maximize":"Maximize",
			"restore":"Restore",
			"close":"Close"
		}
		
	};
	mxDialog.lang.currentLang = mxDialog.lang.cn;
    mxDialog.prototype = {
        getTpl:function(){
			/*mxDialog.lang.cn*/
			/*mxDialog.lang.en*/
			/*mxDialog.currentLang*/
			var lang = mxDialog.lang.currentLang;
			return '<div class="mx-dialog mx-dialog-<%=kind%> mx-dialog-<%=skin%>" id="mxDialog_<%=i%>" style="width:<%=__widthpx%>;height:<%=__heightpx%>;left:<%=left%>px;top:<%=top%>px;right:<%=right%>px;bottom:<%=bottom%>px;z-index:<%=index%>">\
				<div class="mx-dialog-skin-bg"></div>\
				<div class="mx-dialog-skin">\
					<div class="mx-dialog-t mx-dialog-change" style="display:none;" data-dir="t"></div>\
					<div class="mx-dialog-b mx-dialog-change" style="display:none;" data-dir="b"></div>\
					<div class="mx-dialog-r mx-dialog-change" style="display:none;" data-dir="r"></div>\
					<div class="mx-dialog-l mx-dialog-change"  style="display:none;" data-dir="l"></div>\
					<div class="mx-dialog-tr mx-dialog-change"  style="display:none;" data-dir="tr"></div>\
					<div class="mx-dialog-tl mx-dialog-change" style="display:none;" data-dir="tl"></div>\
					<div class="mx-dialog-br mx-dialog-change" style="display:none;" data-dir="br"></div>\
					<div class="mx-dialog-bl mx-dialog-change" style="display:none;" data-dir="bl"></div>\
					<div class="mx-dialog-title"><div class="mx-dialog-title-in">\
						<div class="mx-dialog-tool"><a href="###" class="mx-dialog-home" title="'+(lang.home)+'"></a></div>\
						<h1 class="mx-dialog-h1"><%=title%></h1>\
						<div class="mx-dialog-buttons">\
							<%if(isMaximize){%>\
								<a href="###" class="mx-dialog-maximize" title="'+(lang.maximize)+'"></a>\
								<a href="###" class="mx-dialog-restore" style="display:none;" title="'+(lang.restore)+'"></a>\
							<%}%>\
							<%if(isClose){%>\
								<a href="###" class="mx-dialog-close" title="'+(lang.close)+'"></a>\
							<%}%>\
						</div>\
					</div></div>\
					<div class="mx-dialog-content" style="height:100%;left:0;top:0;">\
						<%if(html != null){%>\
							<%=html%>\
						<%}else{%>\
							<iframe class="mx-dialog-iframe" src="<%=url%>" hidefocus frameborder="no" allowtransparency="true" height="100%" width="100%"></iframe>\
						<%}%>\
					</div>\
				</div>\
			</div>';
		},
      
        init:function(){
            //$(document.body).css('overflow', 'hidden');
            
			if(this.url){
				this.kind = "url";
				this.__widthpx = this.width + this.skinConfig.plusWidth + "px";
				this.__heightpx = this.height + "px";
			}else if(this.html){
				this.kind = "html";
				this.__widthpx = "auto";
				this.__heightpx = "auto";
			}

			
			this.updatePos();
			
			
            var dialogHTML = Common.tmpl(this.getTpl(), this);
            this.ui.dialogWarp = this.createDialogWarp();
            this.ui.dialogWarp.append(dialogHTML);
            
            this.ui.mxDialog = $('#mxDialog_'+this.i);
            
            $.extend(this.ui, {
                maximize:this.ui.mxDialog.find('.mx-dialog-maximize'),
                restore:this.ui.mxDialog.find('.mx-dialog-restore'),
                close:this.ui.mxDialog.find('.mx-dialog-close'),
				context:this.ui.mxDialog.find('.mx-dialog-content'),
                iframe:this.ui.mxDialog.find('.mx-dialog-iframe'),
                title:this.ui.mxDialog.find('.mx-dialog-title'),
                h1:this.ui.mxDialog.find('.mx-dialog-h1'),
                home:this.ui.mxDialog.find('.mx-dialog-home')
            });
			
            if(this.html){

				this.width = this.ui.context.width() + 2;
				this.height = this.ui.context.height();
				this.updatePos();
				console.log(this.top, this.left, this.width, this.height);
				this.setPos(this.top, this.left, this.width, this.height);
			}
			
            if(this.overflow == false){
				this.ui.iframe.attr('scrolling', 'no');	
			}
            
            if(this.isMove){
                this.drag();//拖动它
            }
            
            this.regEvents();
            this.mask();//遮罩
            
            mxDialog.dialogList.push(this);
            this.onready();
        },
        regEvents:function(){
            var _this = this;
            
            this.ui.maximize.click(function(){
                _this.setMaximize();
                return false;
            });
            
            this.ui.restore.click(function(){
                _this.setRestore();
                return false;
            });
            
            this.ui.close.click(function(){
                _this.setClose();
                return false;
            });
            
            this.ui.home.click(function(){
                //alert(1);
                _this.setGohome();
                return false;
            });
            
            /** 由于事件冲突这里的 dblclick 无法正常触发
            this.ui.h1.dblclick(function(){
                if( _this.isMax ){
                    _this.setRestore();
                }else{
                    _this.setMaximize();
                }
                return false;
            });
            */
            
            this.ui.h1.mousedown(function(){
                _this.setFocus();
                return false;
            });
            
			this.winresize = function(){
                if( _this.isMax ){
                    _this.setMaximize();
                }
            };
            $(window).resize( this.winresize );
        },
        updatePos:function(){
			
			if((this.right != "auto" || this.bottom != "auto") && this.html){
				return ;
			}
			
			//if(this.left == "auto" || this.top == "auto"){

				this.top = ($(window).height() - this.height) / 2;
				this.left = ($(window).width() - this.width) / 2;

				this.top = this.top < this.skinConfig.patchTop ? this.skinConfig.patchTop :  this.top;
				this.left = this.left < this.skinConfig.patchLeft ? this.skinConfig.patchLeft :  this.left;
            //}

        },
        drag:function(){
            var _this = this;
            this.drag = new MX.kit.DragElement($.extend({
                dragElement:this.ui.h1,
                moveElement:this.ui.mxDialog,
                isResize:this.isResize,
				isRange:this.isRange
            }, this.skinConfig));//skinConfig读取变换范围补丁
            
            this.drag.onready = function(){
                var _this = this;
                $(window).resize(function(){
                    _this.setRangeWindow();
                });
            };
            this.drag.onblur = function(){//拖动结束
                //console.log(111);
                _this.top = this.top;
                _this.left = this.left;
            };
            this.drag.onResize = function(){
                _this.width = this.width;
                _this.height = this.height;
                _this.top = this.top;
                _this.left = this.left;
            };
            this.drag.init();
            
        },
        createDialogWarp:function(){
            var mxDialogWarp = $('#mxDialogWarp');//mx-dialog-warp
            if( $('#mxDialogWarp').size() ){
                return mxDialogWarp;
            }
            mxDialogWarp = $('<div class="mx-dialog-warp" id="mxDialogWarp"></div>');
            $(document.body).append(mxDialogWarp);
            return mxDialogWarp;
        },
        mask:function(){

			if(!this.isMask){ //是否有遮罩
				this.ui.maskElement = $('#mxDialogMask');                                                                                                                            
				return ;
			}

            if($('#mxDialogMask').size()){
                this.ui.maskElement = $('#mxDialogMask');
                return ;
            }
            var hegiht = $(document.body).height();
            var mask = $('<div style="background:black;width:100%;height:100%;position:fixed;z-index:99;opacity:.5;top:0;left:0;filter:alpha(opacity=50);-moz-opacity:.5;" id="mxDialogMask"></div>');
            this.ui.dialogWarp.append(mask);
            this.ui.maskElement = mask;
            
        },
        removeMask:function(){
            this.ui.maskElement.remove();
        },
        setPos:function(top, left, width, height){
            this.ui.mxDialog.css({
                width:width+"px",
                height:height+"px",
                top:top+"px",
                left:left+"px"
            });
            this.onresize();
        },
        setRemove:function(){
            this.ui.mxDialog.remove();
        },
        setClose:function(){
            //$(document.body).css('overflow', 'auto');
            this.ui.mxDialog.hide();
            this.setRemove();
            this.drag && this.drag.stop();
			var j = 0;
			
            for(var i=0; i<mxDialog.dialogList.length; i++){
                if(mxDialog.dialogList[i] == this){
                    mxDialog.dialogList.splice(i, 1);
                    break;
                };
            }
			
			for(var i=0; i<mxDialog.dialogList.length; i++){
				if(mxDialog.dialogList[i].isMask == true){
					j = 1; //有实例需要遮罩层
					break
				}
			}

            if(j == 0){
                this.removeMask();
            }
			
			$(window).unbind('resize', this.winresize);
			
            this.onclose( mxDialog.dialogList );
            //this.setRemove();
        },
        setOpen:function(){
            this.ui.mxDialog.show();
        },
        setRefresh:function(){},
        setGohome:function(){
            this.ui.iframe[0].src = this.url+"?"+new Date().getTime();
        },
        setRestore:function(){
            //$(document.body).css('overflow', 'auto');
			
            this.isMax = false;
            this.setPos(this.top,this.left,this.width,this.height); // -1配合Chrome 浏览器的BUG
            this.ui.restore.hide();
            this.ui.maximize.show();
			var _this = this;
			
			//Chrome 浏览器的一个bug iframe刚好不会出现滚动条的高宽需要刷新下UI
			//setTimeout(function(){
			//	console.log(1);
				//_this.setPos(_this.top,_this.left,_this.width+2,_this.height+2);
			//}, 200);
        },
        setMaximize:function(){
            //$(document.body).css('overflow', 'hidden');
            //var st = $(window).scrollTop();
            //var sl = $(window).scrollLeft();
            var w = $(window).width();
            var h = $(window).height();
            
            this.isMax = true;
            this.setPos(this.skinConfig.patchTop, this.skinConfig.patchLeft, w-this.skinConfig.patchWidth, h-this.skinConfig.patchHeight-36);
            this.ui.maximize.hide();
            this.ui.restore.show();
            
        },
        setFocus:function(){
            this.ui.mxDialog.css('z-index', mxDialog.index++);
            this.drag && this.drag.setMaskIndex(mxDialog.index);
        },
        
        onclose:function(){},//未提供任何参数
        onready:function(){},//未提供任何参数
        onresize:function(){}//
    };

	return {Dialog:mxDialog};
})());
