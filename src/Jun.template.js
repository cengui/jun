
function Template(tmpl, data){
    this.tmpl = tmpl.replace(/[\s\t\n]+/g, " ");
    this.data = data;
    this.openTag = "<%";
    this.closeTag = "%>";
    this.func = function(){throw "undefined function"};
    this.init();
};
Template.prototype = {
    init:function(){
        this.func = this.buildFuncBody();
    },
    buildFuncBody:function(){
    
        var html = ["var html = '';"];
        var tmpl = this.tmpl;
        var openTag = this.openTag;
        var openTagLength = openTag.length;
        var closeTag = this.closeTag;
        var closeTagLength = closeTag.length;
        var index = 0;
        var error = null;
        
        while( (index = tmpl.indexOf(openTag)) != -1  ){
            html.push( "html+='"+tmpl.slice(0, index)+"';" );
            tmpl = tmpl.slice(index+openTagLength);
            
            if( (index = tmpl.indexOf(closeTag)) != -1){
                if(tmpl.slice(0, 1) == "="){
                    html.push( "html+= "+ tmpl.slice(1, index)+";");
                }else{
                    html.push( tmpl.slice(0, index)+";" );
                }
                tmpl = tmpl.slice(index+closeTagLength);
                
            }else{
                error = new SyntaxError("Lose %> , str:"+ tmpl);
                this.onerror(error);
                throw error;
            }
        }
        html.push("html+='"+ tmpl +"';return html;");
        
        try{
			return new Function("data", "with(data){"+html.join("")+"}");
        }catch(e){
            //this.onerror(e);
			window.console && window.console.log(e);
		}
        
    },
    read:function(){
        return this.func(this.data);
    },
    setDataFormat:function(data){
        
    },
    onerror:function(error){
        //console.log(error);
        //throw error;
    }
};


//var html = "";html+='<div class="mx-dialog" id="mxDialog_';html+= i;html+='" style="width:';html+= width;html+='px;height:';html+= height;html+='px;left:';html+= left;html+='px;top:';html+= top;html+='px;z-index:';html+= index;html+='"> <div class="mx-dialog-t mx-dialog-change" style="display:none;" data-dir="t"></div> <div class="mx-dialog-b mx-dialog-change" style="display:none;" data-dir="b"></div> <div class="mx-dialog-r mx-dialog-change" style="display:none;" data-dir="r"></div> <div class="mx-dialog-l mx-dialog-change" style="display:none;" data-dir="l"></div> <div class="mx-dialog-tr mx-dialog-change" style="display:none;" data-dir="tr"></div> <div class="mx-dialog-tl mx-dialog-change" style="display:none;" data-dir="tl"></div> <div class="mx-dialog-br mx-dialog-change" style="display:none;" data-dir="br"></div> <div class="mx-dialog-bl mx-dialog-change" style="display:none;" data-dir="bl"></div> <div class="mx-dialog-title"><div class="mx-dialog-title-in"> <div class="mx-dialog-tool"><a href="###" class="mx-dialog-home" title="主页"></a></div> <h1 class="mx-dialog-h1">';html+= title;html+='</h1> <div class="mx-dialog-buttons"> ';if(isMaximize){;html+=' <a href="###" class="mx-dialog-maximize" title="最大化"></a> <a href="###" class="mx-dialog-restore" style="display:none;" title="还原"></a> ';};html+=' ';if(isClose){;html+=' <a href="###" class="mx-dialog-close" title="关闭"></a> ';};html+=' </div> </div></div> <div class="mx-dialog-content" style="width:100%;height:100%;left:0;top:0;"> <iframe class="mx-dialog-iframe" src="';html+= url;html+="" hidefocus frameborder="no" allowtransparency="true" height="100%" width="100%"></iframe> </div> </div>";return html
/**

var tmpl = '<ul>\
    <% for (var i = 0, l = data.list.length; i < l; i ++) { %>\
        <li><%=data.list[i].index%>. 用户: <%=data.list[i].user%>/ 网站：<%=data.list[i].site%></li>\
    <% } %>\
</ul>';

var data = {
    list:[
        {
            index: 1,
            user: '<strong style="color:red">糖饼</strong>',
            site: 'http://www.planeart.cn',
            weibo: 'http://weibo.com/planeart',
            QQweibo: 'http://t.qq.com/tangbin'
        }
    ]
}

var a = new Template(tmpl, data);
a.read();//返回html代码

*/

