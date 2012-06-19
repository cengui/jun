
	/**
		CharacterData
			处理文档中的文本节点
		继承关系
		Node->CharacterData
		
			文本节点和注释节点都继承它
		
	*/
	function CharacterData(){
	
	};
	
	CharacterData.prototype = new Node();
	mix(CharacterData.prototype, {
		appendData:function(text){//把text添加到结尾
		
		},
		deleteData:function(offset, count){ //从offset指定的位置开始删除count个字符
		
		},
		insertData:function(offset, text){//
		
		},
		replaceData:function(offset, count, text){
		
		},
		splitText:function(offset){//从指定位置分割文本节点，返回一个新节点
			
		},
		substringData(offset, count){//从offset位置开始提取count个字符
		
		}
		length:0,//保存字符串的长度
	});