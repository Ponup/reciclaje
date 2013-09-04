
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
			this.node = document.createElement( 'img' );
			this.node.src = CONTEXT_PATH + '/images/sprites/clock.gif';
			this.node.style.position = 'absolute';
			this.node.style.top = '10px';
			this.node.style.left = '10px';
			
			$( '#gameplay' ).append( this.node );
		};

		AnalogClockActor.prototype.redraw = function()
		{
		};

		return AnalogClockActor;
	}
);

