
define( [ 'scullge/engine', 'actors/phmeter', 'actors/actor3', 'data/items' ], function( Engine, PhmeterActor, Actor3, itemsData )
	{
		function ConveyorBeltEngine()
		{
		}

		ConveyorBeltEngine.prototype = new Engine();
		ConveyorBeltEngine.prototype.constructor = ConveyorBeltEngine;

		ConveyorBeltEngine.prototype.init = function()
		{
			for( i = 0; i < itemsData.length; i++ )
			{
				var el = itemsData[ i ];
				var actor = new Actor3();
				actor.setProperty( 'image', el.name );
				actor.setProperty( 'left', i * -85 );
				this.addActor( actor );
			}
			this.addActor( new PhmeterActor() );
		};

		return ConveyorBeltEngine;
	}
);

