/**
	Comment 文本节点
		文本节点没有子节点
	继承关系
		Node->CharacterData->Comment //在Chrome浏览器中 Comment 同样继承了CharacterData
	
	CharacterData 类型包含了操作nodeValue字符串的一些方法

*/

	function Comment(){
		
		this.nodeType = Node.COMMENT_NODE;// 3
		this.nodeName = "#comment";
		
		this.nodeValue;//注释的文本类容
		
		this.parentNode;// 可能是Document 或 Element
		
	}
	
	/**
		Comment 直接继承了 CharacterData
	*/
	
	Comment.prototype = new CharacterData();