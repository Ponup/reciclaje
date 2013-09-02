
define( [ 'scullge/engine', 'actors/phmeter', 'actors/actor3' ], function( Engine, PhmeterActor, Actor3 )
	{
		function ConveyorBeltEngine()
		{
		}

		ConveyorBeltEngine.prototype = new Engine();
		ConveyorBeltEngine.prototype.constructor = ConveyorBeltEngine;

		ConveyorBeltEngine.prototype.init = function()
		{
			var elements = [
				{ name: 'bolsa', correct: true },
				{ name: 'botella_plastico' , correct: true},
				{ name: 'botella_vidrio', correct: false },
				{ name: 'botella_vidrio_rota', correct: true },
				{ name: 'caja_carton', correct: true },
				{ name: 'carta', correct: false },
				{ name: 'cd', correct: true },
				{ name: 'copa', correct: true },
				{ name: 'detergente', correct: false },
				{ name: 'jarra_vidrio', correct: false },
				{ name: 'libro', correct: true },
				{ name: 'papel', correct: true },
				{ name: 'revista', correct: false },
				{ name: 'tupper', correct: false },
				{ name: 'vaso', correct: true },
			];

			for( i = 0; i < elements.length; i++ )
			{
				var el = elements[ i ];
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

