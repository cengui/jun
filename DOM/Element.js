/**
	DOM中最常用节点类型
	Element
	
	继承关系
		Node->Element
		
	Element被作为所有HTML元素的父类。
		
*/

	function Element(){
		this.nodeType = Node.ELEMENT_NODE;// 1
		/**
			在HTML中标签名会被转换大写，但是在XML中会与文档中保持一直。
			如果在比较标签名统一转换小写（.toLowerCase）可能更好
			
			在实例化的时候会赋值，nodeName 一直是元素的标签名
			具有nodeName相同的值
		*/
		this.nodeName;
		this.tagName;
		this.nodeValue = null;
		
	}
	
	Element.prototype = new Node();