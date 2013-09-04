
define( [ 'scullge/engine', 'actors/phmeter', 'actors/actor3', 'data/items' ], function( BaseEngine, PhmeterActor, Actor3, itemsData )
	{
		function BioDigesterEngine()
		{
		}

		BioDigesterEngine.prototype = new BaseEngine();
		BioDigesterEngine.prototype.constructor = BioDigesterEngine;

		BioDigesterEngine.prototype.init = function()
		{
			for( i = 0; i < itemsData.length; i++ )
			{
				var el = itemsData[ i ];
				var actor = new Actor3();
				actor.setProperty( 'phDelta', el.scoring.ph );
				actor.setProperty( 'image', el.name );
				actor.setProperty( 'left', i * -85 );
				this.addActor( actor );
			}

			this.addActor( new PhmeterActor() );

			this.initActors();
		};

		return BioDigesterEngine;
	}
);

