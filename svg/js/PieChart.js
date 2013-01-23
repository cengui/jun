/**
	画一个饼图
	Pie chart

	datalist = [
		{
			number:10				
			name:
			des:
		},
		{
			number:10				
			name:
			des:
		}
	];

	options = {
		
		r://半径
		centerPoint://中心点位置

		
	}
*/

function PieChart( datalist, options ){

	var options = options || {};
	
	this.svg = options.svg;
	this.r = options.r || 100;
	this.centerPoint = options.centerPoint || {
			x:((this.svg.getAttribute('width') || this.svg.clientWidth)-this.r*2)/2, 
			y:((this.svg.getAttribute('height') || this.svg.clientHeight)-this.r*2)/2
	};
	this.datalist = datalist;

	this.startPoint = {x:0, y:this.r};
	this.originPoint = {x:0, y:0};
	this.pieData = [];
	this.init();
}

PieChart.prototype = {

	constructor:PieChart,

	init:function(){
		//datalist
		/**
			pieData = [
				{
					number:
					name:
					des:

					angle:
					color:
					p1:
					p2:
					p3:	
				}
			]
		*/
		var centerPoint = this.originPoint;//this.centerPoint;
		var i=0;
		var s=0; 
		var data=this.datalist;
		var pieData = this.pieData;
		var angle = 0;
		var p3 = null;
		var json = null;

		for(; i< data.length; i++){
			s += data[i].number;
		}

		for(i=0; i<data.length; i++){
			//到下一点需要旋转的角度
			angle = 2 * Math.PI * data[i].number/s;

			//第3点的位置
			p3 = this.rotatingPoint(this.startPoint.x, this.startPoint.y, angle);
			
			//添加数据
			pieData.push({

				number:data[i].number,
				name:data[i].name,
				des:data[i].des,
				angle:angle,
				p1:this.getScreenSystem( centerPoint ),
				p2:this.getScreenSystem(this.startPoint),
				p3:this.getScreenSystem(p3)
			});

			this.startPoint = p3;
			//
			this.createPie( pieData[i] );	
		}

		this.regEvent();

	},

	//旋转一个点
	rotatingPoint:function(x, y, angle){
		return {
			x:x*Math.cos(-angle) - y*Math.sin(-angle),
			y:y*Math.cos(-angle) + x*Math.sin(-angle)
		}
	},
	// 获取屏幕坐标系
	getScreenSystem:function( p ){

		return { 
			x: p.x + this.centerPoint.x,
			y: p.y + this.centerPoint.y
		};

	},

	// 获取坐标系坐标
	getCartesianCoordinates:function( p ){
 
		return {

			x:p.x - this.centerPoint.x,
			y:p.y - this.centerPoint.y
		}	

	},

	//创建弧度
	createPie:function( data ){
		var path = new SVGPath(data.p1, data.p2, data.p3);

		data.node = path;
		if(data.angle > Math.PI){

			path.setLarge( 1 );

		}

		path.setStrokeWidth(1);
		path.setStroke("#ff5400");
		path.setFill("#0fb3b1");
		this.svg.appendChild( path.node );
	},
	regEvent:function(){

		var _this = this;
		var prive = null;
		var timeout = null;
		var pieData = this.pieData;

		for(var i=0; i<pieData.length; i++){
			bind( pieData[i].node );
			
		}

		function bind( piePath ){

			piePath.bind('mouseover', function(e){
				clearTimeout( timeout );
				prive && _this.reduction( prive );
				_this.prominent( piePath);
				prive = piePath;
			});

			piePath.bind('mouseout', function(e){
				timeout = setTimeout(function(){
					_this.reduction( prive );
				}, 500);
			});

		}

	},
    reduction:function( piePath ){
        piePath.setP1( piePath.src.p1 );
        piePath.setP2( piePath.src.p2 );
        piePath.setP3( piePath.src.p3 );
    },
	/**
		突出一个弧度

		计算方式
			1：首先计算底边的中点，
			2：用中点减去定点得到向量，把向量化为单位向量
			3：单位向量乘以一个偏移量（目前偏移量是使用弧形半径的0.1）
			4： 弧形的3个定点分别 加 第3步的结果。
				特别注意如果弧度大于 Math.PI 定点于偏移量用减法
	*/
    prominent:function( piePath ){

        //保存原始值

        if( !piePath.src ){
            piePath.src = {
                p1:piePath.p1,
                p2:piePath.p2,
                p3:piePath.p3
            };
        }

        if( !piePath.newPos ){
            piePath.newPos = {};
            var p1 = piePath.p1;
            var p2 = piePath.p2;
            var p3 = piePath.p3;
            //首先计算底边中点
            var centerPoint = {x:(p2.x+p3.x) / 2, y:(p2.y+p3.y)/2};
            //用中点减去定点得到向量
            var v = {x:centerPoint.x - p1.x, y:centerPoint.y - p1.y};
            //把向量化为单位向量
            var v0 = {x: v.x / Math.sqrt(v.x*v.x + v.y*v.y), y: v.y/Math.sqrt(v.x*v.x + v.y*v.y)};
            //弧形的3个定点分别 加 第3步的结果
            var v2 = {x:v0.x*10, y:v0.y*10};
            /**辅助代码
             var handles = piePath.createHandle( 1 );
             var p1node = $(handles[0]);

             p1node.css({
                top:centerPoint.y,
                left:centerPoint.x
            });

             p1node.init();
             */

            // 特别注意如果弧度大于 Math.PI 定点于偏移量用减法
            if(piePath.largeFlag == 0){
                piePath.newPos.p1 = addSelf(p1, v2);
                piePath.newPos.p2 = addSelf(p2, v2);
                piePath.newPos.p3 = addSelf(p3, v2);
            }else{
                piePath.newPos.p1 = subSelf(p1, v2);
                piePath.newPos.p2 = subSelf(p2, v2);
                piePath.newPos.p3 = subSelf(p3, v2);
            }
        }

        piePath.setP1( piePath.newPos.p1 );
        piePath.setP2( piePath.newPos.p2 );
        piePath.setP3( piePath.newPos.p3 );

        function addSelf(v, v2){

            return {

                x:v.x + v2.x,
                y:v.y + v2.y

            }
        }

        function subSelf(v, v2){
            return {

                x:v.x - v2.x,
                y:v.y - v2.y

            }
        }

    }

};