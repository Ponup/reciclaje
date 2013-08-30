
define( [ 'actors/base' ], function( Actor )
	{
		function Clock()
		{
			Actor.call( this );
		}

		Clock.prototype = new Actor();

		Clock.prototype.redraw = function()
		{
			$( '.AnimatedClock' ).remove();

			var clockImage = new Image();
			clockImage.className = 'AnimatedClock';
			clockImage.src = CONTEXT_PATH + '/images/sprites/clock.gif';
			$( '#gameplay' ).append( clockImage );
		};

		return Clock;
	}
);
