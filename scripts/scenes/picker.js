
define(
	[ 'utils/arrays', 'game/context', 'game/engine', 'scenes/base', 'actors/pickable', 'actors/scoreboard', 'actors/chronometer', 'text!templates/scenes/picker.html' ],
	function( ArraysUtils, gaco, GameEngine, Scene, PickableActor, ScoreBoardActor, ChronometerActor, tplHtml )
{
	function PickerScene()
	{
		Scene.call( this );

		this.setId( 'picker' );
	}

	PickerScene.prototype = new Scene();

	PickerScene.prototype.switchFrom = function( prevScene )
	{
		prevScene.hide();

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		$canvas.empty().append( tplHtml );

		var currentLevel = 1;

		$( '#currentLevel' ).html( currentLevel );

		var picker = document.getElementById( 'picker' );
		$( picker ).fadeIn();

		var canvasWidth = 640,
		    canvasHeight = 480;

		var elements = [
			{ name: 'bolsa', containerType: gaco.ContainerType.PLASTIC, correct: true },
			{ name: 'botella_plastico', containerType: gaco.ContainerType.PLASTIC , correct: true},
			{ name: 'botella_vidrio', containerType: gaco.ContainerType.GLASS, correct: false },
			{ name: 'botella_vidrio_rota', containerType: gaco.ContainerType.GLASS, correct: true },
			{ name: 'caja_carton', containerType: gaco.ContainerType.PAPER, correct: true },
			{ name: 'carta', containerType: gaco.ContainerType.PAPER, correct: false },
			{ name: 'cd', containerType: gaco.ContainerType.PLASTICO, correct: true },
			{ name: 'copa', containerType: gaco.ContainerType.GLASS, correct: true },
			{ name: 'detergente', containerType: gaco.ContainerType.PLASTIC, correct: false },
			{ name: 'jarra_vidrio', containerType: gaco.ContainerType.GLASS, correct: false },
			{ name: 'libro', containerType: gaco.ContainerType.PAPER, correct: true },
			{ name: 'papel', containerType: gaco.ContainerType.PAPER, correct: true },
			{ name: 'revista', containerType: gaco.ContainerType.PAPER, correct: false },
			{ name: 'tupper', containerType: gaco.ContainerType.PLASTIC, correct: false },
			{ name: 'vaso', containerType: gaco.ContainerType.GLASS, correct: true },
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

		gaco.gameEngine = new GameEngine();

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

			gaco.gameEngine.addActor( actor );
		}

		gaco.gameEngine.addActor( new ChronometerActor() );
		gaco.gameEngine.addActor( new ScoreBoardActor() );

		gaco.gameEngine.start();
	};

	return PickerScene;
});

