/**
	Node DOM基本节点类型
	
	参考书籍：《javascript高级程序设计3》 第10章 DOM
*/

	function Node(){
		/**
			1:永远是节点的大写标签名
			2:没有标签名的节点会返回当前“#+节点类型” 小写
				例：document的nodeName 是 "#document" 
				例:	Text节点是"#text"
			3:document.doctype.nodeName 是 html 小写
		*/
		this.nodeName;
		
		
		/**
			1：值必定为Node所定义的常量
			2：IE无法直接访问这些常量，在JS代码中使用nodeType比较节点直接使用直接量好
		*/
		this.nodeType;
		
		
		/**
			1:元素节点(Node.ELEMENT_NODE) 该值始终为null
		*/
		this.nodeValue;
		
		/**
			1:保存一个NodeList对象
				-不是一个数组，但是可以使用数组的一些方法
				-NodelList是动态的
				-IE中NodeList对象实现为COM
					故：Array.prototype.slice.call(document.childNodes, 0); 错误的
						仅可以遍历到一个数组中去。
						《javascript高级程序设计3》p207
				-IE中childNodes不会记录空白节点，其他浏览器会记录
		*/
		this.childNodes;
		
		
		this.firstChild = null;//第一个子节点，可能为null
		
		this.lastChild = null;//最后一个子节点，可能为null
		
		/**
			1：父节点
			2：不在文档中的元素可能为null
		*/
		this.parentNode = null;
		
		this.previousSibling = null;//前一个兄弟节点，可能为null
		this.nextSibling = null;
		//节点关系图 https://lh4.googleusercontent.com/-X_4PcpAPMwE/TwLsX0adMyI/AAAAAAAAAdI/DJ1X04_1_5Q/s962/dom.jpg
		
	};

	Node.ELEMENT_NODE:1, // HTML元素类型
	Node.ATTRIBUTE_NODE:2, // 元素属性
	Node.TEXT_NODE:3, //文本节点类型
	Node.CADTA_SECTION_NODE:4,
	Node.ENTITY_REFERENCE_NODE:5,
	Node.ENTITY_NODE:6,
	Node.PROCESSING_INSTRUCTION_NODE:7,
	Node.COMMENT_NODE:8,
	Node.DOCUMENT_NODE:9, //docuemnt节点
	Node.DOCUMENT_TYPE_NODE:10, //document.doctype.nodeType   HTML标签
	Node.DOCUMENT_FRAGMENT_NODE:11,
	Node.NOTATION_NODE:12

	Node.prototype = {
		constructor:Node,
		
		/**
			节点包含一个或多个子节点返回true否则返回false
		*/
		hasChildNodes:function(){
			throw "Unrealized";
		},
		
		/**
			1：向childNodes结尾插入节点，返回插入的节点
			2：不能拥有子节点的节点调用该方法会抛出异常（HIERARCHY_REQUEST_ERR: DOM Exception 3--Chrome）
			3：如果节点已经是文档的一部分将会直接移动元素到新插入的位置
		*/
		appendChild:function(node){
			throw "Unrealized";
		},
		
		/**
			1:参数插入的节点、参考的节点 ，返回newNode
			2:refNode为null的时候相当于调用appendChild方法
		*/
		insertBefore:function(newNode, refNode){
			throw "Unrealized";
		},
		
		/**
			1:参数 插入的节点，要删除的节点，返回delNode 并把delNode移除文档
		*/
		replaceChild:function(newNode, delNode){
			throw "Unrealized";
		},
		
		/**
			删除节点
			父节点删除子节点
			返回delNode
		*/
		removeChild:function(delNode){
			throw "Unrealized";
		},
		
		/**
			参数：Boolean 表示是否深度复制（true将会克隆子所有子节点）
			ie可能会克隆节点的已注册事件
		*/
		cloneNode:function(bl){
			throw "Unrealized";
		},
		
		/**
			查找后代元素 合并两个连续的文本节点，删除空白的文本节点
		*/
		normalize:function(){
			throw "Unrealized";
		}
	}
