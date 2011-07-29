/*
 * Jun.dom 
 * Jun Lu 
 * 2011-02-08 20:42
 */
 
 ;(function(){
	 
	 // var DOM = (function(){
	 	 // var Methods = "g,find,first,last,hasChilds,parent,next,prev,html,attr,removeAttr,css,isElement,isText,htmlForElem,append,before,after,animate";
		 // var MethodList = Methods.split(',');
		 // var i = 0;
		 // var d = {};
		 // for(i; i<MethodList.length; i++){
			// d[MethodList[i]] = (function(key){
				// return function(){
					// var elem = Jun.dom[key].apply(this, [this].concat([].slice.call(arguments)));
					// if(Jun.dom.isElement(elem)){
						// return Jun.mix(elem, DOM);
					// }
					// return elem;
				// }
			// })(MethodList[i])
		 // }
		// return d;
	 // })();
	 
	 
	 Jun.dom = {
		
		/* query */
		
		get:function(id){
			return document.getElementById(id);
		},
		
		getTG:function(elem, tagName){
			//elem = getElem(elem, this);
			return elem.getElementsByTagName(tagName);
		},
		
		query:function(string){
			return document.querySelector(string);
		},
		create:function(tagName){
			return document.createElement(tagName);
		},
		
		
		/* DOM Three find*/
		first:function(elem){
			//elem = getElem(elem, this);
			return elem.firstElementChild;//.firstChild;
		},
		
		last:function(elem){
			//elem = getElem(elem, this);
			return elem.lastElementChild;//.lastChild;
		},
		
		hasChilds:function(elem){
			//elem = getElem(elem, this);
			return elem.hasChildNodes();
		},
		
		parent:function(elem){
			//elem = getElem(elem, this);
			return elem.parentNode;
		},
		
		next:function(elem){
			//elem = getElem(elem, this);
			return elem.nextElementSibling//.nextSibling;
			// ie 6 测试只有  nextSibling
		},
		
		prev:function(elem){
			//elem = getElem(elem, this);
			return elem.previousElementSibling;//.previousSibling;
		},
		find:function(elem, string){
			throw 'Jun.dom.find Error';
			//return document.querySelector(string);
		},
				
		/* dom 写入 */
		
		html:function(elem, html){
			if(html){
				elem.innerHTML = html;
				return elem;
			}else{
				return elem.innerHTML;
			}
		},
		
		attr:function(elem, key, value){
			if(value){
				elem.setAttribute(key, value);
				return elem;
			}else{
				elem.getAttribute(key);
			}
		},
		
		removeAttr:function(elem, key){
			elem.removeAttribute(key);
			return elem;
		},
		
		css:function(elem, key, value){
			if(value === undefined){
				key = key.replace(/([A-Z])/g, "-$1");
				key = key.toLowerCase();
				return parseFloat(window.getComputedStyle(elem, null).getPropertyValue(key));
			}else{
				elem.style[key] = value;
				return elem;
			}
		},
		
		
		// 文档判断
		isElement:function(elem){
			//标准dom节点
			//elem = getElem(elem, this);
			return elem.nodeType == 1;
		},
		
		isText:function(elem){
			// 文本节点
			//elem = getElem(elem, this);
			return elem.nodeType == 3;
		},
		
		// 文档处理
		
		htmlForElem:function(html){
			if(typeof html == 'string'){
				var dom = Jun.dom;
				var div = document.createDocumentFragment("DIV");// 04-18 lujun
				return dom.html(div, html);
			}
			return html;
		},
		
		append:function(elem, html){
			elem.appendChild( Jun.dom.htmlForElem(html) );
			return elem;
		},
		
		before:function(elem, html){
			elem.parentNode.insertBefore(Jun.dom.htmlForElem(html), elem);
			return elem;
		},
		after:function(elem, html){
			var parent = elem.parentNode;
			parent.lastChild == elem ? parent.appendChild(Jun.dom.htmlForElem(html)) : parent.insertBefore(Jun.dom.htmlForElem(html), elem.nextSibling);
		},
		
		//文档动画
		
		animate:function(elem, style, val, callBack, time, px){
			px = px || 'px'; //---   这里还需要进一步判断
			time = time || 300;
			var b = parseFloat(Jun.dom.css(elem, style));
			val = val - b;
			var st = new Date().getTime();
			var a = setInterval(function(){
				var t = new Date().getTime() - st;
				if( t > time){t = time;clearInterval(a);callBack&&callBack();}
				elem.style[style] = parseFloat(tween.eain(t, b, val, time));// + px;
			}, 10);
			return a;
		}
	 };
	 
	 
	 var tween = {
	 	eain:function(t, b, c, d){ return - c * (t /= d) * (t - 2) + b}
	 }


	 // ie6 特殊处理
 	 Jun.mix(Jun.dom, {
	 	
	 })
	
 	
  })()
 // 这里必须正对ie 6做一些优化
 