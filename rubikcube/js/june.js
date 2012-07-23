
	function extend(a, b){
		for(var i in b){
			a[i] = b[i];
		}
		return a;
	};
	
	June = {
		createPoint3D: function (ctx, options) {
            var _vpx = 0,
				_vpy = 0,
				_cx = 0,
				_cy = 0,
				_cz = 0,
				opt = {
                    x: 0,
                    y: 0,
					xpos: 0,
					ypos: 0,
					zpos: 0,
					focalLength: 250,
					width: 0,
					height: 0,
					draw: function () {},
                    // 设定旋转中心
                    setVanishPoint: function (vpx, vpy) {
                        _vpx = vpx;
                        _vpy = vpy;
                    },
                    // 设定坐标中心点
                    setCenterPoint: function (x, y, z) {
                        _cx = x;
                        _cy = y;
                        _cz = z;
                    },
                    // 绕x轴旋转
                    rotateX: function (angleX) {
                        var cosx = Math.cos(angleX),
                            sinx = Math.sin(angleX),
                            y1 = this.ypos * cosx - this.zpos * sinx,
                            z1 = this.zpos * cosx + this.ypos * sinx;
                        this.ypos = y1;
                        this.zpos = z1;
                    },
                    // 绕y轴旋转
                    rotateY: function (angleY) {
                        var cosy = Math.cos(angleY),
                            siny = Math.sin(angleY),
                            x1 = this.xpos * cosy - this.zpos * siny,
                            z1 = this.zpos * cosy + this.xpos * siny;
                        this.xpos = x1;
                        this.zpos = z1;
                    },
                    // 绕z轴旋转
                    rotateZ: function (angleZ) {
                        var cosz = Math.cos(angleZ),
                            sinz = Math.sin(angleZ),
                            x1 = this.xpos * cosz - this.ypos * sinz,
                            y1 = this.ypos * cosz + this.xpos * sinz;
                        this.xpos = x1;
                        this.ypos = y1;
                    },
                    // 获取缩放scale
                    getScale: function () {
                        return (this.focalLength / (this.focalLength + this.zpos + _cz));		  
                    },
                    // 获取z轴扁平化的 x，y值
                    getScreenXY: function () {
                        var scale = this.getScale();
                        return {
                            x: _vpx + (_cx + this.xpos) * scale,
                            y: _vpy + (_cy + this.ypos) * scale
                        };
                    }
				};
                
			typeof options == 'function' ? options.call(opt) : extend(opt, options || {});
			Object.defineProperties(opt, {
				'screenX': {
				  get: function () {
					return this.getScreenXY().x
				  }
				},
				'screenY': {
				  get: function () {
					return this.getScreenXY().y
				  }
				}
			  });
			//return new Sprite(ctx, opt);
			//var point3d = new Sprite(ctx, opt);
			  
			return opt;
        },
		createTriangle: function (ctx, a, b, c, d, color, isStroke) {
			isStroke = isStroke == undefined ? true : isStroke;
		  var pointA = a,
			  pointB = b,
			  pointC = c,
			  pointD = d,
			  triangle = {
				color : color,
				light : null,
				draw : function(){
				 // console.log(pointC.screenX, pointC.screenY);
				  g = ctx;
				  //Depth example doesn't set a light, use flat color.
				  g.beginPath();
				  g.moveTo(pointA.screenX, pointA.screenY);
				  g.lineTo(pointB.screenX, pointB.screenY);
				  g.lineTo(pointC.screenX, pointC.screenY);
				  g.lineTo(pointD.screenX, pointD.screenY);
				  g.lineTo(pointA.screenX, pointA.screenY);
				  g.closePath();

				  var color = (this.light ? getAdjustedColor.call(this) : this.color);

				  if (typeof color == 'number') {
					color = 'rgb('+(color >> 16)+', '+ (color >> 8 & 0xff) +', '+ (color & 0xff) +')'
				  }

				  g.fillStyle = color;
				  g.fill();
				  if (!isStroke) {
					g.strokeStyle = color;
					g.stroke();
				  }
				}
				
			  };

		  Object.defineProperties(triangle, {
			'depth': {
			  get: function () {
				var zpos = Math.min(pointA.z, pointB.z, pointC.z, pointD.z);
				return zpos;
			  }
			}
		  });

		  function getAdjustedColor () {
			var red = this.color >> 16,
				green = this.color >> 8 & 0xff,
				blue = this.color & 0xff,
				lightFactor = getLightFactor.call(this);
			
			red *= lightFactor;
			green *= lightFactor;
			blue *= lightFactor;

			return red << 16 | green << 8 | blue;
		  }

		  function getLightFactor () {
			var ab = {
				  x: pointA.xpos - pointB.xpos,
				  y: pointA.ypos - pointB.ypos,
				  z: pointA.zpos - pointB.zpos
				},
				bc = {
				  x: pointB.xpos - pointC.xpos,
				  y: pointB.ypos - pointC.ypos,
				  z: pointB.zpos - pointC.zpos
				},
				norm = {
				  x: (ab.y * bc.z) - (ab.z * bc.y),
				  y: -((ab.x * bc.z) - (ab.z * bc.x)),
				  z: (ab.x * bc.y) - (ab.y * bc.x)
				},
				dotProd = norm.x * this.light.x +
						  norm.y * this.light.y +
						  norm.z * this.light.z,
				normMag = Math.sqrt(norm.x * norm.x +
									norm.y * norm.y +
									norm.z * norm.z),
				lightMag = Math.sqrt(this.light.x * this.light.x +
									 this.light.y * this.light.y +
									 this.light.z * this.light.z);
			
			return (Math.acos(dotProd / (normMag * lightMag)) / Math.PI) * this.light.brightness;
		  }
		  
		  function isBackface () {
			//see http://www.jurjans.lv/flash/shape.html
			var cax = pointC.screenX - pointA.screenX,
				cay = pointC.screenY - pointA.screenY,
				bcx = pointB.screenX - pointC.screenX,
				bcy = pointB.screenY - pointC.screenY;
			return cax * bcy > cay * bcx;
		  }
		  
		  return triangle;
		}
	}