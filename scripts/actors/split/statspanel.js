
define( [ 'data/context', 'scullge/actor' ], function( gaco, BaseActor )
	{
		function StatsPanel()
		{
			BaseActor.call( this );
		}

		StatsPanel.prototype = new BaseActor();

		StatsPanel.prototype.redraw = function()
		{
			$( '#elapsedTime' ).html( parseInt( gaco.engine.getElapsedTime( true ), 10 ) + ' segundos' );
			$( '#points' ).html( gaco.gameVars.score );
			$( '#pendingElements' ).html( gaco.gameVars.elementsAvailable.length );
			$( '#level' ).html( gaco.gameVars.currentLevel + 1 );	
		};

		return StatsPanel;
	}
);

