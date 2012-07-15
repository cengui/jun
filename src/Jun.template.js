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
        var html2 = this.tmpl;
        var openTag = this.openTag;
        var openTagLength = openTag.length;
        var closeTag = this.closeTag;
        var closeTagLength = closeTag.length;
        var index = 0;
        
        while( (index = html2.indexOf(openTag)) != -1  ){
            html.push( 'html+="'+html2.slice(0, index)+'";' );
            html2 = html2.slice(index+openTagLength);

            while((index = html2.indexOf(closeTag)) != -1){
                if(html2.slice(0, 1) == "="){
                    html.push( 'html+= '+ html2.slice(1, index)+';');
                }else{
                    html.push( html2.slice(0, index)+";" );
                }
                
                html2 = html2.slice(index+closeTagLength);
                break;
            }
        }
        
        html.push('html+="'+ html2 +'";return html;');
		try{
			return new Function("data", html.join(""));
        }catch(e){
			console.log(e);
		}
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
        try{
			return new Function("data", html.join(""));
        }catch(e){
			return function(){};
		}
        
    },
    
    
    read:function(){
        return this.func(this.data);
    },
    onerror:function(){
        
    }
};