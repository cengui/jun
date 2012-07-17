function Template(tmpl, data){
    this.tmpl = tmpl.replace(/[\s\t\n]+/g, " ");
    this.data = data;
    this.openTag = "<\%";
    this.closeTag = "%>";
    this.func = null;
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
            
                throw "lost %>";
                
            }
            
        }
        
        html.push('html+="'+ tmpl +'";return html;');
        return new Function("data", html.join(""));
        
    },
    
    
    read:function(){
        return this.func(this.data);
    },
    onerror:function(){
        
    }
};