/**
    {
      "player": {
        "money": 9216.99644665828,
        "golden": 0.0,
        "employStatus": 2,
        "salary": 0.0,
        "energy": 980,
        "grade": 1,
        "titleNo": 1,
        "title": "小学生",
        "exp": 0,
        "nextExp": 50,
        "grossExp": 0,
        "house": 0,
        "employerId": 0,
        "miniCompanyId": 0
      },
      "msgCount": 3,
      "tasks": 0,
      "amts": [
        {
          "id": 1439052232528896,
          "time": 1332751363589,
          "subject": "货币政策委员会公告"
        },
        {
          "id": 1348705602180096,
          "time": 1329994203239,
          "subject": "《财富征途》官方Q群，5群218543064"
        },
        {
          "id": 31,
          "time": 1328289181448,
          "subject": "官方投资学习交流群"
        }
      ],
      "prompts": [1,2,3]
    }
*/

    /*
        把格式化数据src 根据format 格式转换成JSON正常数据
    **/
    
    /**
        var src1 = [[1,2],[1,2],[5,6]];
        var format1 = [["a","b","c"],["b",true,[]],["c","d","f"]];
        var data1 = {a:{b:1,c:2},b:[1,2],c:{d:5,f:6}};
    */

   function formatData(src, format, isArray){
        var json = {};

        if(typeof format == "string"){//直接字面量
            json[format] = src;
            return json;
        }
        
        if( typeof format == "number"){
            return src;
        }
        
        if( typeof format == "undefined"){
            return src;
        }

        if( isArray ){//数组
            json = [];
            for(var i=0; i<src.length; i++){
                json[i] = formatData(src[i], format[i]);//数字
            }
            return json;
        }

        for(var i=0; i<format.length; i++){//Object
            
            if(format[i] instanceof Array){
                if(format[i][0] == true){
                    json = formatData(src[i], format[i].slice(2), true);
                }else if(format[i][1] == true){
                    //console.log(src[i]);
                    json[format[i][0]] = formatData(src[i], format[i].slice(2), true);
                }else{
                    json[format[i][0]] = formatData(src[i], format[i].slice(1));
                }
                
            }
            if(typeof format[i] == 'string'){
                json[format[i]] = src[i];
            }
        }

        return json;
   }

   

   /*
    原始数据
    {
        amts:[
            {id:1,time:2,subject:4},
            {id:1,time:2,subject:3}
        ],
        player:{
            money:123,
            golden:456
        },
        msgCount:4,
        msg:5
    }
    
    简化数据
        多层嵌套的数组
    [[123,456],4,[[1,2,4],[1,2,3]],5]
    
    格式化规则
        压缩以后的数据和压缩格式均为多层嵌套的数组
        json的直接字面量，提取为压缩格式的一项，字面量值提取为压缩数据的一项{a:1,b:2} == > [1,2] AND ["a","b"]
        嵌套在内部的ObjectArray "{a:[1,2]}" 压缩数据为：[[1,2]] 压缩格式为：[["a", true, undefined, undefined]]
            原则：字面量值为数组的形式，压缩数据也添加一层数组并记录数组中的每一项， 压缩格式添加一层数组，数组第一项为字面量，第2项表示为true,其余项和原数组长度一样使用占位符undefined
        嵌套在内部的Object "{a:{a:1}}" 压缩数据为：[[1]] 压缩格式为：[["a","a"]]
            原则：字面量值为对象的形式，压缩数据添加一层数组并顺序记录对象中的所有值， 压缩格式添加一层数组，数组第一项为字面量，其余项顺序记录所有字面量
            
        特殊情况
            以
            formatData 格式化一个ObjectArray的时候，需要传递第3个参数为true
            compressionData 压缩一个ObjectArray的时候，[1,2,3] {json:[1,2,3], format:[undefined,undefined,undefined]}  format[0]不会有key, format[2] 也不会出现true 直接表现为只
            
    反格式化数据
        formatData(src, format);//src 需要处理的数据， format 格式化规则
    格式化数据
        compressionData(src);//src源数据，format压缩规则  
        返回格式化数据，和格式化规则
        {json:json, format:format}

        

   */
   /** 测试数据
   var ajaxData = {
        amts:[
            {id:1,time:2,subject:4},
            {id:1,time:2,subject:3}
        ],
        player:{
            money:123,
            golden:456
        },
        msgCount:4,
        msg:5
    };
    */
    
    /**
        对给出的数据(src)进行压缩
        返回{json:[],format:[]} json压缩后的数据 压缩方式
    */
    
    /**
        var src1 = {a:1,b:1,c:[1,2,3]};
    */

    function  compressionData(src, key){
        var json = [];
        var format = [];
        
        if(typeof src == "string"){
            return {json:[src], format:[key]};
        }
        
        if(typeof src == "number"){
            return {json:[src], format:[key]};
        }
        
        if(Object.prototype.toString.call(src) == "[object Array]"){
            for(var i=0; i<src.length; i++){
                var item = compressionData(src[i], undefined);
                if(Object.prototype.toString.call(src[i]) == "[object Array]"){
                    json.push(item.json);
                    format.push(item.format);
                }else if(Object.prototype.toString.call(src[i]) == "[object Object]"){
                
                    json.push(item.json);
                    format.push(item.format);
                    
                }else{
                    
                    json = json.concat(item.json);
                    format = format.concat(item.format); 
                }
            }
        }
        
        if(Object.prototype.toString.call(src) == "[object Object]"){
            
            for(var i in src){
                var item = compressionData(src[i], i);
                if(Object.prototype.toString.call(src[i]) == "[object Array]"){
                    
                    json.push(item.json);
                    format.push([i,true].concat(item.format));
                }else if(Object.prototype.toString.call(src[i]) == "[object Object]"){
                    
                    json.push(item.json);
                    format.push([i].concat(item.format));
                   
                }else{
                     json = json.concat(item.json);
                    format = format.concat(item.format);
                }
                
                
            }
            
        }

        return {json:json, format:format};
    }
   /**
   function compressionData(src){
        
        var json = []
        var format = [];
       
        if(src instanceof Array){

            for(var i=0; i<src.length; i++){
                 if(typeof src[i] == "string" || typeof src[i] == "number"){
                    json.push(src[i]);
                    format.length++;
                }else{
                    var data = compressionData(src[i]) ;
                    json.push(data.json);
                    format.push(data.format);
                }
            }
            return {json:json, format:format};
        }
        
        if(src instanceof Object){
           
            for(var i in src){
                if( src[i] instanceof Array ){
                   var data = compressionData(src[i]);
                   json.push( data.json ); 
                   format.push([i, true].concat(data.format));
                }
                if( Object.prototype.toString.call(src[i]) == "[object Object]" ){
                    var data = compressionData( src[i] );
                    json.push(data.json);
                    format.push([i].concat(data.format));
                }
                if(typeof src[i] == "string" || typeof src[i] == "number"){
                    json.push(src[i]);
                    format.push(i);
                }
            }
        }
        
        return {json:json, format:format};
   }
   
   1：导航充值按钮
   2：过滤包
   3：礼包说明文字删除
   4：添加游戏用户ID，客服空间（收听微博按钮后）
   */
   
   /**
    {a:1,b:2,c:[{a:1,b:2}]} // {1,2,[{1,2}]}   [a,b,c,a,b]
   */
    function formatData2(src, format){
        var a = format();
    }
    formatData2('{1,2,[{1,2}]}', [a,b,c,a,b]);
   
   
   