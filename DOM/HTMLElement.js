/**
	HTMLElement
	
	继承关系
		Node->Element->HTMLElement
	
	所有HTML节点都来至HTMLElement或者它的子类
*/

	function HTMLElement(){
		this.id;//元素在文档中的唯一标识
		this.title;//有关元素的附加说明信息，一般通过工具提示条显示出来
		this.lang;//元素类容的语言代码，很少使用
		/**
			语言方向
			取值范围[ltr(左->右),rtl(右->左)]
		*/
		this.dir;//
		
		
		/**
			值为一个NameNodeMap的集合，类似于NodeList
			NameNodeMap 以数组放方式存放了元素的每一个Attr(特性)
			并有一些列操作方法
				getNamedItem(name) 返回nodeName属性等于name的节点
				removeNamedItem(name) 移除nodeName属性等于name的节点
				setNamedItem(node)
				item(pos) 返回pos位置的特性
				
			IE7及更早版本会返回HTML元素中所有可能的特性。可以通过判断 Attr.specified属性值为true,则特性是通过某种方式特别指定的。否则就是默认的空值特性列表而已
			
		*/
		this.attributes;
	}
	
	HTMLElement.prototype = new Element();
	
	mix(HTMLElement.prototype, {
		/**
			特性的操作
		*/
		getAttribute:function(){
		
		},
		setAttribute:function(){
		
		},
		/**
			IE6及以前版本不支持该方法
		*/
		removeAttribute:function(){
		
		}
	});