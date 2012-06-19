/**
	Attr 描述元素特性
	
	继承关系
	Node->Attr
*/

	function Attr(){
		this.nodeType = DOCUMENT_FRAGMENT_NODE;// 11
		this.nodeName;//值为特性的名称
		this.nodeValue;//值为特性的值
		
		
		this.name;
		this.value;
		/**
			区别特新是否在代码中指定
			在	FF 中模拟 outHTML方法中使用到。
			
		*/
		this.specified;// 布尔值
		
		this.parentNode = null;//没有父节点，也没有子节点
	}
	
	Attr.prototype = new Node();