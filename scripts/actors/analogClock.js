
define( [ 'scullge/actor' ], function( Actor )
	{
		function AnalogClock()
		{
			Actor.call( this );
		}

		AnalogClock.prototype = new Actor();
		AnalogClock.prototype.constructor = AnalogClock;

		AnalogClock.prototype.init = function()
		{
			this.node = document.createElement( 'img' );
			this.node.src = CONTEXT_PATH + '/images/sprites/clock.gif';
			this.node.style.position = 'absolute';
			this.node.style.top = '10px';
			this.node.style.left = '10px';
			
			$( '#gameplay' ).append( this.node );
		};

		AnalogClock.prototype.redraw = function()
		{
		};

		return AnalogClock;
	}
);

