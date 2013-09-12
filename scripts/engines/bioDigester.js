
define( [ 'scullge/engine', 'actors/bioDigester/phmeter', 'actors/bioDigester/disposable', 'actors/chronometer', 'actors/scoreboard', 'actors/bioDigester/bacterium', 'actors/quitButton', 'scullge/utils/arrays', 'data/items', 'data/context' ], function( BaseEngine, PhmeterActor, DisposableActor, ChronometerActor, ScoreboardActor, BacteriumActor, QuitButtonActor, ArraysUtils, itemsData, gaco )
	{
		function BioDigesterEngine()
		{
			BaseEngine.call( this );

			this.positionOffset = -BioDigesterEngine.DISTANCE_BETWEEN_ITEMS;
		}

		BioDigesterEngine.prototype = new BaseEngine();
		BioDigesterEngine.prototype.constructor = BioDigesterEngine;

		BioDigesterEngine.DISTANCE_BETWEEN_ITEMS = 100;
		BioDigesterEngine.MAX_SECONDS = BioDigesterEngine.prototype.MAX_SECONDS = 60;

		BioDigesterEngine.prototype.preInit = function()
		{
			this.initScene();

			var initialPhmeterLevels = [ 6, 7 ];
			gaco.gameVars.phLevel = ArraysUtils.randomItem( initialPhmeterLevels );

			this.addActor( new ChronometerActor() );
			this.addActor( new ScoreboardActor() );

			this.initActors();
		};

		BioDigesterEngine.prototype.init = function()
		{
			var randomItemsData = ArraysUtils.shuffle( itemsData );
			for( i = 0; i < randomItemsData.length; i++ )
			{
				var itemData = randomItemsData[ i ];
				this.addDisposableActor( itemData );
			}

			this.addActor( new PhmeterActor() );
			this.addActor( new BacteriumActor() );
			this.addActor( new QuitButtonActor() );

			this.initActors();

			this.addUpdateListener( $.proxy( this.onUpdate, this ) );
		};

		BioDigesterEngine.prototype.initScene = function()
		{
			var sceneDiv = document.createElement( 'div' ),
			    $canvas = $( document.getElementById( 'canvas' ) );

			sceneDiv.id = 'conveyorBelt';
			sceneDiv.className = 'Scene';
			sceneDiv.style.overflow = 'hidden';
			sceneDiv.style.display = 'none';
			sceneDiv.style.background = "url('images/scenes/conveyorBelt.png') no-repeat";

			$canvas.empty().append( sceneDiv );
		};

		BioDigesterEngine.prototype.onUpdate = function()
		{
			if( this.getElapsedTime( true ) > BioDigesterEngine.MAX_SECONDS )
			{
				this.stop()

				$( '.Disposable' ).remove();

				gaco.hasWin = ( gaco.gameVars.phLevel >= 6 && gaco.gameVars.phLevel <= 7 );
				gaco.sceneManager.switchTo( 'gameover' );
			}

			if( $( '.Disposable' ).length < 10 )
			{
				this.addDisposable();
			}

			this.positionOffset += 2;
		};
		
		BioDigesterEngine.prototype.addDisposable = function()
		{
			var itemData = ArraysUtils.randomItem( itemsData );
			this.addDisposableActor( itemData );
		};

		BioDigesterEngine.prototype.addDisposableActor = function( itemData )
		{
			var actor = new DisposableActor();
			actor.setProperty( 'phDelta', itemData.scoring.ph );
			actor.setProperty( 'image', itemData.name );
			actor.setProperty( 'data', itemData );
			actor.setProperty( 'left', this.positionOffset );
			actor.init();

			this.addActor( actor );

			this.positionOffset -= BioDigesterEngine.DISTANCE_BETWEEN_ITEMS;
		};

		return BioDigesterEngine;
	}
);

