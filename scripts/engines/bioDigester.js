
define( [ 'scullge/engine', 'actors/phmeter', 'actors/disposable', 'actors/chronometer', 'actors/bacterium', 'scullge/utils/arrays', 'data/items', 'data/context' ], function( BaseEngine, PhmeterActor, DisposableActor, ChronometerActor, BacteriumActor, ArraysUtils, itemsData, gaco )
	{
		function BioDigesterEngine()
		{
			BaseEngine.call( this );
		}

		BioDigesterEngine.prototype = new BaseEngine();
		BioDigesterEngine.prototype.constructor = BioDigesterEngine;

		BioDigesterEngine.DISTANCE_BETWEEN_ITEMS = 100;

		BioDigesterEngine.prototype.init = function()
		{
			for( i = 0; i < itemsData.length; i++ )
			{
				var el = itemsData[ i ];
				var actor = new DisposableActor();
				actor.setProperty( 'phDelta', el.scoring.ph );
				actor.setProperty( 'image', el.name );
				actor.setProperty( 'left', i * -BioDigesterEngine.DISTANCE_BETWEEN_ITEMS );
				this.addActor( actor );
			}

			var initialPhmeterLevels = [ 0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13 ];
			gaco.gameVars.phLevel = ArraysUtils.randomItem( initialPhmeterLevels );

			this.addActor( new PhmeterActor() );
			this.addActor( new ChronometerActor() );
			this.addActor( new BacteriumActor() );

			this.initActors();

			this.addUpdateListener( $.proxy( this.onUpdate, this ) );
		};

		BioDigesterEngine.prototype.onUpdate = function()
		{
			if( this.getElapsedTime( true ) > 20 )
			{
				this.stop()

				gaco.hasWin = ( gaco.gameVars.phLevel >= 5 && gaco.gameVars.phLevel <= 7 );
				gaco.sceneManager.switchTo( 'gameover' );
			}
		};
		
		BioDigesterEngine.prototype.addDisposable = function()
		{
			var itemData = ArraysUtils.randomItem( itemsData );
			var actor = new DisposableActor();
			actor.setProperty( 'phDelta', itemData.scoring.ph );
			actor.setProperty( 'image', itemData.name );
			actor.setProperty( 'left', 13 * -BioDigesterEngine.DISTANCE_BETWEEN_ITEMS );
			actor.init();
			this.addActor( actor );
		};

		return BioDigesterEngine;
	}
);

