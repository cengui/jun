function Parabola(a,b,c){//抛物线对象
			//ax^2*bx+c
			// a>0 开头向上 a<0开口向下 
			//b 
			//c >0 原点在y正半轴
			// c <0 原点在y负半轴
			this.a = a == undefined ? 0 : a;
			this.b = b == undefined ? 0 : b;
			this.c = c == undefined ? 0 : c;
		};
		Parabola.prototype = {
			constructor:Parabola,
			getfx:function(x){//抛物线方程
				//ax^2 + bx + c
				//return this.a*(x*x)+this.b*x+this.c;
				//return Math.tan(x)*1000;
				return 0.00005*(x*x) - 0.1*x;
				
			},
			getpx:function(){//顶点坐标
				// [-b/2a, (4ac-b)/4a]
				return {x:-this.b/(2*this.a), y:(4*this.a*this.c-this.b)/(4*this.a)};
			},
			symmetryx:function(){//对称轴
				// [-b/2*a]
				return -this.b/(2*this.a);
			},
			min:function(){
				return (4*this.a*this.c-this.b*this.b)/(4*this.a);
				//多了一个*this.b
			},
			draw:function(context){// context printPoint //必要绘制点的方法
				context.build();
				for(var i=-10000; i<10000; i+=1){
					context.printPoint(i,this.getfx(i));
				}
				context.setStrokeColor("#ff0000");
				context.printLine(this.symmetryx(), this.min(), this.symmetryx(), this.getfx(300));
			}
		};