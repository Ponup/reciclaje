
define( [ 'scullge/engine', 'actors/bioDigester/phmeter', 'actors/bioDigester/disposable', 'actors/chronometer', 'actors/scoreboard', 'actors/bioDigester/bacterium', 'actors/quitButton', 'scullge/utils/arrays', 'data/items', 'data/context' ], function( BaseEngine, PhmeterActor, DisposableActor, ChronometerActor, ScoreboardActor, BacteriumActor, QuitButtonActor, ArraysUtils, itemsData, gaco )
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
			var randomItemsData = ArraysUtils.shuffle( itemsData );
			for( i = 0; i < randomItemsData.length; i++ )
			{
				var itemData = randomItemsData[ i ];
				itemData.position = i;
				this.addDisposableActor( itemData );
			}

			var initialPhmeterLevels = [ 0, 1, 2, 3, 4, 5, 9, 10, 11, 12, 13 ];
			gaco.gameVars.phLevel = ArraysUtils.randomItem( initialPhmeterLevels );

			this.addActor( new PhmeterActor() );
			this.addActor( new BacteriumActor() );
			this.addActor( new ChronometerActor() );
			this.addActor( new ScoreboardActor() );
			this.addActor( new QuitButtonActor() );

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
			itemData.position = 13;
			this.addDisposableActor( itemData );
		};

		BioDigesterEngine.prototype.addDisposableActor = function( itemData )
		{
			var actor = new DisposableActor();
			actor.setProperty( 'phDelta', itemData.scoring.ph );
			actor.setProperty( 'image', itemData.name );
			actor.setProperty( 'left', itemData.position * -BioDigesterEngine.DISTANCE_BETWEEN_ITEMS );
			actor.init();
			this.addActor( actor );
		};

		return BioDigesterEngine;
	}
);

