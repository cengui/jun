
/**
  
  JUNE
    //-- class
    .Vector2(x, y),
        .setXY(x, y);
        .length();
		.addSelf( v );
		.subSelf( v );
		.multiplyScalar( s )
		.clone();
		
    .Vector3(x, y, z),
		.setXYZ(x, y, z)
		.addSelf();
    .Stage(canvas, width, height);
    
        .addChild( child );
        .removeChild( child );
        .removeChindIndex( index );
    
    //--interface
    .Event
        addEvent(type, handle)
        removeEvent(type, headle)
        
*/

/**
	Scene 舞台对象
		
	PerspectiveCamera 摄像机
		
	CanvasRenderer 渲染
	
	CanvasRenderer.reader(Scene, PerspectiveCamera)
 */
June = {};


( function () {

	var lastTime = 0;
	var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

	for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {

		window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
		window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];

	}

	if ( window.requestAnimationFrame === undefined ) {

		window.requestAnimationFrame = function ( callback, element ) {

			var currTime = Date.now(), timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
			var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
			lastTime = currTime + timeToCall;
			return id;

		};

	}


	if ( window.cancelAnimationFrame === undefined ) {

		window.cancelAnimationFrame = function ( id ) { clearTimeout( id ); };

	}

}() );

