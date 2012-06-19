/**
	Document
	
	继承关系
		Node->Docuemnt
*/

	function Document(){
		this.nodeType = Node.DOCUMENT_NODE; // 9
		this.nodeName = "#document";
		this.nodeValue = null;
		this.parentNode = null;
		/*
			子节点最多一个 DocuemntType(HTML) 
		*/
		
		/**
			指向文档唯一的 DocuemntType(HTML)节点
		*/
		this.documentElement;
		
		/**
			指向文档唯一的body节点
		*/
		this.body;
		
		/**
			指向文档的DTD
			差异：
				IE：如果存在文档类型声明，会错误地解析为一个注释并把它当作Comment节点，而document.doctype的值始终为null
				Firefox:如果存在文档类型声明，将视为文档的第一个子节点;document.doctype是一个DocuemntType节点，可以通过document.firstChild访问到
				Safari,Chrome,Opera:如果存在文档类型声明，则解析类型为DocuemntType。不作为文档的子节点，无法通过childNodes,firstChild访问。
		*/
		this.doctype;
		
		/**
			文档标题,可直接读写
		*/
		this.title;
		
		/**
			页面完整URL
		*/
		this.URL;
		
		/**
			取得域名,可写
			p.xxoo.com 设置为 xxoo.com 正确
			如果原本就是xxoo.com 设置为 p.xxoo.com 错误 >>P212
		*/
		this.domain;
		
		this.referrer;//取得来源页面的url
		
		/**
			特有的 HTMLColletion 集合，用于快速访问文档中特定的对象集合
		*/
		
		this.anchors;	// 包含文档中所有带有name特性的<a>元素
		this.applets;	// 包含文档中所有 <applet> 元素（applet不再推荐使用，这个集合建议不要使用了）
		this.images;	// 包含文档中所有的 <img /> 元素
		this.forms;		// 包含文档中所有的 <form> 元素
		this.links;		// 包含文档中所有带 href 特性的 <a> 元素
		
		/**
			IE6为文档添加一个区分当前处于哪种工作模式的标识
		*/
		this.compatMode = "CSS1Compat" || "BackCompat"; //CSS1Compat标准模式  BackCompat混杂模式
		
		/**
			IE8为文档添加一个 documentMode 用于区分IE8工作在那种模式中
			5 IE5模式
			7 IE7仿真模式
			8 IE8标准模式
		*/
		this.documentMode; //5, 7, 8
	};
	
	Document.prototype = {
		constructor:Document,
		/**
			返回文档第一个给定ID(区分大小写)的元素，没有找到则返回null
				IE:IE8以下或IE8兼容模式(document.documentModel值为7)ID不区分大小写
				IE：IE7的表单元素name可能会影响同名id属性的元素
		*/
		getElementById:function(id){
		
		}
		
		/**
			返回 HTMLColletion 对象它是一个动态集合，与NodeList类似
				-HTMLColletion对象有一个nameItem(),可以通过元素的name特性取得集合中的项
				-也可以通过[name]来访问集合项
			参数nodeName值为 * 将会放回所有文档元素
			标准规定nodeName是区分大小写的，但实际上不区分。但对于xml文档会严格区分大小写
		*/
		getElementsByTagName:function(nodeName){
			
		},
		
		
		/**
			HTMLDocument类型特有的方法
			同样返回一个 HTMLColletion 对象
		*/
		getElementsByName:function(name){
			
		},
		
		/**
			DOM一致性检测
		*/
		implementation:{
			/**
				参数:DOM功能名称，版本号
				得到支持返回true
				domFunName可参考 p215
				推荐使用特性能力检测可以保证功能可以正常使用。
			*/
			hasFeature:function(domFunName, v){
				
			}
		},
		
		write:function(){},
		wruteIn:function(){},
		open:function(){},//不知道这是搞神马的！
		close:function(){}//不知道这是搞神马的！
	}