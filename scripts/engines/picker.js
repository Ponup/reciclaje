
define( [ 'scullge/engine', 'actors/pickable', 'actors/scoreboard', 'actors/chronometer', 'utils/arrays' ], function( Engine, PickableActor, ScoreBoardActor, ChronometerActor, ArraysUtils )
	{
		function PickerEngine()
		{
			this.context.currentLevel = 1;
		}

		PickerEngine.prototype = new Engine();
		PickerEngine.prototype.constructor = PickerEngine;

		PickerEngine.prototype.init = function()
		{
			$( '#currentLevel' ).html( this.context.currentLevel );

			var elements = [
				{ name: 'bolsa', correct: true },
				{ name: 'botella_plastico', correct: true},
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

			var places = [
				{
					code: 'park',
					elements: [
						{ x: 780, y: 340, scale: .4 },
						{ x: 145, y: 420, scale: .8 },
						{ x: 300, y: 430, scale: .9 },
						{ x: 745, y: 480, scale: 1 },
						{ x: 110, y: 550, scale: 1.2 },
						{ x: 445, y: 570, scale: 1.4 },
						{ x: 840, y: 600, scale: 1.6  },
					],
				},
				{
					code: 'room',
					elements: [
						{ x: 780, y: 340, scale: .4 },
						{ x: 145, y: 420, scale: .8 },
						{ x: 300, y: 430, scale: .9 },
						{ x: 745, y: 480, scale: 1 },
						{ x: 110, y: 550, scale: 1.2 },
						{ x: 445, y: 570, scale: 1.4 },
						{ x: 840, y: 600, scale: 1.6  },
					],
				},
			];

			var availableElements = elements.slice();
			availableElements = ArraysUtils.shuffle( availableElements );

			var place = ArraysUtils.randomItem( places );
			document.getElementById( 'picker' ).style.backgroundImage = "url('images/scenes/picker/" + place.code + ".png')";

			var numElements = 20;
			var numBadElements = 5;
			for( i = 0; i < place.elements.length; i++ )
			{
				var element = place.elements[ i ];
				element.data = availableElements.pop();

				var actor = new PickableActor();
				actor.setProperties( element );

				this.addActor( actor );
			}

			this.addActor( new ChronometerActor() );
			this.addActor( new ScoreBoardActor() );
		};

		return PickerEngine;
	}
);

