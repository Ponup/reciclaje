
define( [ 'data/context', 'scullge/actor' ], function( gaco, BaseActor )
	{
		function StatsPanel()
		{
			BaseActor.call( this );
		}

		StatsPanel.prototype = new BaseActor();

		StatsPanel.prototype.redraw = function()
		{
			$( '#elapsedTime' ).html( parseInt( gaco.gameEngine.getElapsedTime( true ), 10 ) + ' segundos' );
			$( '#correctMovements' ).html( gaco.gameVars.score );
			$( '#pendingElements' ).html( gaco.gameVars.elementsAvailable.length );
			$( '#level' ).html( gaco.gameVars.currentLevel + 1 );	
		};

		return StatsPanel;
	}
);

