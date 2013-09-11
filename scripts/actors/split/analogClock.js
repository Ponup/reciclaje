
define( [ 'scullge/actor' ], function( BaseActor )
	{
		function AnalogClockActor()
		{
			BaseActor.call( this );
		}

		AnalogClockActor.prototype = new BaseActor();
		AnalogClockActor.prototype.constructor = AnalogClockActor;

		AnalogClockActor.prototype.init = function()
		{
			BaseActor.prototype.init.call( this );

			var node = document.createElement( 'img' );
			node.src = CONTEXT_PATH + '/images/sprites/clock.gif';
			node.style.position = 'absolute';
			node.style.top = '60px';
			node.style.left = '60px';
			
			$( '.Scene' ).append( node );
		};

		return AnalogClockActor;
	}
);

