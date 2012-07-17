
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
    
        var html = ['var html = "";'];
        var tmpl = this.tmpl;
        var openTag = this.openTag;
        var openTagLength = openTag.length;
        var closeTag = this.closeTag;
        var closeTagLength = closeTag.length;
        var index = 0;
        var error = null;
        
        while( (index = tmpl.indexOf(openTag)) != -1  ){
            html.push( 'html+="'+tmpl.slice(0, index)+'";' );
            tmpl = tmpl.slice(index+openTagLength);
            
            if( (index = tmpl.indexOf(closeTag)) != -1){
                if(tmpl.slice(0, 1) == "="){
                    html.push( 'html+= '+ tmpl.slice(1, index)+';');
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
        
        html.push('html+="'+ tmpl +'";return html;');
        
        try{
			return new Function("data", html.join(""));
        }catch(e){
            this.onerror(e);
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

