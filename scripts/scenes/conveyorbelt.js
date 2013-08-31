
define(
	[ 'scullge/scene', 'scenes/picker', 'actors/phmeter', 'actors/actor3', 'game/engine', 'game/context', 'text!templates/scenes/conveyorBelt.html' ],
	function( SceneBase, PickerScene, PhmeterActor, Actor3, GameEngine, gaco, tplHtml )
{
	function ConveyorBeltScene()
	{
		SceneBase.call( this );

		this.setId( 'conveyorBelt' );
	}

	ConveyorBeltScene.prototype = new SceneBase();
	ConveyorBeltScene.prototype.constructor = ConveyorBeltScene;

	ConveyorBeltScene.prototype.switchFrom = function( prevScene )
	{
		prevScene.hide();

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		$canvas.empty().append( tplHtml );

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

		gaco.engine = new GameEngine();
		for( i = 0; i < elements.length; i++ )
		{
			var el = elements[ i ];
			var actor = new Actor3();
			actor.setProperty( 'image', el.name );
			actor.setProperty( 'left', i * -60 );
			gaco.engine.addActor( actor );
		}
		gaco.engine.addActor( new PhmeterActor() );
		gaco.engine.start();
	};

	return ConveyorBeltScene;
});

