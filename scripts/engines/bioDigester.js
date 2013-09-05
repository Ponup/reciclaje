
define( [ 'scullge/engine', 'actors/phmeter', 'actors/disposable', 'actors/chronometer', 'actors/bacterium', 'scullge/utils/arrays', 'data/items' ], function( BaseEngine, PhmeterActor, DisposableActor, ChronometerActor, BacteriumActor, ArraysUtils, itemsData )
	{
		function BioDigesterEngine()
		{
			BaseEngine.call( this );
		}

		BioDigesterEngine.prototype = new BaseEngine();
		BioDigesterEngine.prototype.constructor = BioDigesterEngine;

		BioDigesterEngine.prototype.init = function()
		{
			for( i = 0; i < itemsData.length; i++ )
			{
				var el = itemsData[ i ];
				var actor = new DisposableActor();
				actor.setProperty( 'phDelta', el.scoring.ph );
				actor.setProperty( 'image', el.name );
				actor.setProperty( 'left', i * -85 );
				this.addActor( actor );
			}

			this.addActor( new PhmeterActor() );
			this.addActor( new ChronometerActor() );
			this.addActor( new BacteriumActor() );

			this.initActors();
		};
		
		BioDigesterEngine.prototype.addDisposable = function()
		{
			var itemData = ArraysUtils.randomItem( itemsData );
			var actor = new DisposableActor();
			actor.setProperty( 'phDelta', itemData.scoring.ph );
			actor.setProperty( 'image', itemData.name );
			actor.setProperty( 'left', 13 * -85 );
			actor.init();
			this.addActor( actor );
		};

		return BioDigesterEngine;
	}
);

