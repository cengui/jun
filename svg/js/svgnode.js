
	/**
		SVGnode
	*/
	
	function SVGNode( tagName ){
		
		this.svgns = "http://www.w3.org/2000/svg";
		
		this.tagName = tagName;
		//�ڵ�
		this.node = null;
		
		//�߿���ɫ
		this.stroke = "none";
		
		//�����ɫ
		this.fill = "none";
		
		//�߿���
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