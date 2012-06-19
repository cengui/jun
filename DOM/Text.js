/**
	Text文本节点
		文本节点没有子节点
	继承关系
		Node->CharacterData->Text
	
	CharacterData 类型包含了操作nodeValue字符串的一些方法
	
	合并多个相邻的文本节点Node类中以有 normalize 方法实现，在某些情况下 normalize 方法可能导致IE6奔溃。IE7并不存在该问题
*/

	function Text(){
		
		this.nodeType = Node.TEXT_NODE;// 3
		this.nodeName = "#text";
		
		this.nodeValue;//值为节点所包含的文本
		
		this.parentNode;// 是一个Element
		
	}
	
	/**
		Text 直接继承了 CharacterData
	*/
	Text.prototype = new CharacterData();