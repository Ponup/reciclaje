
define( [ 'game/context', 'scullge/actor' ], function( gaco, Actor )
	{
		function StatsPanel()
		{
			Actor.call( this );
		}

		StatsPanel.prototype = new Actor();

		StatsPanel.prototype.redraw = function()
		{
			var seconds = parseInt( ( Date.now() - gaco.gameVars.startTime ) / 1000 );
			$( '#elapsedTime' ).html( seconds + ' segundos' );
			$( '#correctMovements' ).html( gaco.gameVars.score );
			$( '#pendingElements' ).html( gaco.gameVars.elementsAvailable.length );
			$( '#level' ).html( gaco.gameVars.currentLevel + 1 );	
		};

		return StatsPanel;
	}
);

