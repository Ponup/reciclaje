
define(
	[ 'scullge/scene', 'scenes/picker', 'actors/phmeter', 'actors/actor3', 'actors/machine', 'scullge/engine', 'utils/arrays', 'game/context', 'text!templates/scenes/recyclingPlant.html' ],
	function( SceneBase, PickerScene, PhmeterActor, Actor3, MachineActor, GameEngine, ArraysUtils, gaco, tplHtml )
{
	function RecyclingPlantScene()
	{
		SceneBase.call( this );

		this.setId( 'recyclingPlant' );
	}

	RecyclingPlantScene.prototype = new SceneBase();
	RecyclingPlantScene.prototype.constructor = RecyclingPlantScene;

	RecyclingPlantScene.prototype.switchFrom = function( prevScene )
	{
		prevScene.hide();

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		$canvas.empty().append( tplHtml );

		gaco.machines = [
			{ code: 'a', name: 'reciclado_prop_agua' },
			{ code: 'g', name: 'reciclado_prop_guillotina' },
			{ code: 'h', name: 'reciclado_prop_horno' },
			{ code: 'p', name: 'reciclado_prop_prensa' },
			{ code: 't', name: 'reciclado_prop_trituradora' },
		];
		gaco.rightPositions = 'aghpt';
		gaco.userPositions = '     ';

		gaco.engine = new GameEngine();

		for( i = 0; i < gaco.machines.length; i++ )
		{
			var machine = new MachineActor();
			machine.setProperty( 'position', i );
			gaco.engine.addActor( machine );
		}

		$( '#startRecyclingButton' ).on( 'click', function()
			{
				if( gaco.userPositions == gaco.rightPositions )
				{
					alert( 'ganaste' );
				}
				else
				{
					alert( 'perdiste' );
				}
			}
		);

		gaco.engine.start();
	};

	return RecyclingPlantScene;
});

