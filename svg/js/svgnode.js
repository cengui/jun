
	/**
		SVGnode
	*/
	
	function SVGNode( tagName ){
		
		this.svgns = "http://www.w3.org/2000/svg";
		
		this.tagName = tagName;
		//节点
		this.node = null;
		
		//边框颜色
		this.stroke = "none";
		
		//填充颜色
		this.fill = "none";
		
		//边框宽度
		this.strockWidth = 0;
		
	}
	
	SVGNode.prototype = {
		constructor:SVGNode,
		initialize:function(){
			this.node = document.createElementNS(this.svgns, this.tagName);
		},
		setFill:function(color){
			this.fill = color;
			this.node.setAttribute("fill", color);
		},
		setStrokeWidth:function(px){
			this.strokeWidth = px;
			this.node.setAttribute("stroke-width", px);
		},
		setStroke:function(color){
			this.stroke = color;
			this.node.setAttribute("stroke", color);
		},
		
		bind:function(type, handle){
			this.node.addEventListener(type, handle, false);	
		},
		createHandle:function( number ){
			var handles = [];
			var node = null;
			
			for(var i=0; i<number; i++){
				node = document.createElement("DIV");
				node.className = "handle";
				handles.push( node );
				document.body.appendChild( node );
			}
			
			return handles;
		}
		
	}