/*
    依赖jquery库
    
    option
    {
        dragElements: //拖动的元素
        sizeElement: //移动的元素
        
    }
    
    API
        init();//开始
    
    event:
    
        onfocus();//鼠标按下准备拖动
        onblur();//鼠标抬起释放拖动
        //onmove();//移动中
        //onexit();//解除可移动状态
        //onready();// init 准备完成
*/

MX.extend(MX.kit, (function(){
    function Resize( option ){
        this.option = option;
        
        this.minWidth = 200;
        this.minHeight = 100;
        this.width = 0;
        this.height = 0;
        this.left = 0;
        this.top = 0;
        this.oldx = 0;
        this.oldy = 0;
        this.dir = 0;
        //this.init();
    }
    Resize.prototype = {
        init:function(){
            var _this = this;
            this.events = {
                r:function(e){
                    var width = _this.width + (e.x - _this.oldx);
                    _this.option.sizeElement.width( this.checkMinWidth(width) );
                },
                b:function(e){
                    var height = _this.height + (e.y - _this.oldy);
                    _this.option.sizeElement.height( this.checkMinHeight(height) );
                },
                br:function(e){
                    _this.events.r(e);
                    _this.events.b(e);
                },
                t:function(e){
                    var height = this.checkMinHeight(_this.height + (_this.oldy - e.y));
                    _this.option.sizeElement.height(height);
                    if(height != _this.minHeight){
                        _this.option.sizeElement.css('top', _this.top - ( _this.oldy - e.y) );
                    }
                    //_this.events.b(e);
                },
                l:function(e){
                    var width = this.checkMinWidth(_this.width+(_this.oldx-e.x));
                    _this.option.sizeElement.width(width);
                    //console.log(width, _this.width);
                    if(width != _this.minWidth){
                        _this.option.sizeElement.css("left", _this.left-(_this.oldx-e.x));
                    }
                },
                bl:function(e){
                    _this.events.l(e);
                    _this.events.b(e);
                },
                tr:function(e){
                    _this.events.t(e);
                    _this.events.r(e);
                },
                tl:function(e){
                    _this.events.t(e);
                    _this.events.l(e);
                },
                
                checkMinWidth:function(width){
                    return width < _this.minWidth ? _this.minWidth : width;
                },
                checkMinHeight:function(height){
                    return height < _this.minHeight ? _this.minHeight : height;
                },
                move:function(e){
                    _this.move(e);
                    return false;
                },
                up:function(e){
                    _this.up(e);
                    return false;
                }
            };
            this.setRangeWindow();//限定范围
            
            this.option.dragElements.show().bind('mousedown', function(e){
                
                var dir = $(this).attr('data-dir');
                _this.replaceProperty(e.screenX,  e.screenY, dir);
                
                _this.down();
                return false;
            });    
            
        },
        
        replaceProperty:function(x, y, dir){
            var sizeElement = this.option.sizeElement;
            var offset = sizeElement.offset();
            
            this.width = sizeElement.width();
            this.height = sizeElement.height();
            this.left = offset.left;
            this.top = offset.top;
            this.oldx = x;
            this.oldy = y;
            
            this.dir = dir;
        },
        down:function(){
            var _this = this;
            var doc = $(document);
            
            this.setRangeWindow();
            
            doc.bind('mousemove', this.events.move);
            doc.bind('mouseup', this.events.up);
            
            this.onfocus();//事件
        },
        move:function(e){
            if( this.checkBoundary(e.pageX, e.pageY) ){
                this.events[this.dir]( {x:e.screenX, y:e.screenY} );
            }
        },
        checkBoundary:function(x, y){
            var  range = this.option.range;
            
            if(x < range[0] || y < range[1] || x > range[2] || y > range[3]){
                return false;
            }
            return true;
            /**
            x = x<range[0] ? range[0] : x;
            y = y<range[1] ? range[1] : y;
            
            x = x>range[2] ? range[2] : x;
            y = y>range[2] ? range[3] : y;
            
            return {x:x, y:y};
            */
        },
        up:function(){
            var doc = $(document);
            
            doc.unbind('mousemove', this.events.move);
            doc.unbind('mouseup', this.events.up);
            
            var sizeElement = this.option.sizeElement;
            var offset = sizeElement.offset();
            
            this.width = sizeElement.width();
            this.height = sizeElement.height();
            this.left = offset.left;
            this.top = offset.top;
            this.onblur(this.width, this.height, this.left, this.top);//事件
        },
        
        setRangeWindow:function(){
            var st = $(window).scrollTop();
            var sl = $(window).scrollLeft();
            var w = $(window).width() + sl -5;
            var h = $(window).height() + st - 5;
            
            this.option.range = [sl+5, st+5, w, h];
        },
        
        onfocus:function(){},//鼠标按下准备拖动
        onblur:function(){}//鼠标抬起释放拖动
    };
    
	return {Resize:Resize};
 })());