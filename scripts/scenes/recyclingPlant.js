
define(
	[ 'scullge/scenes/base', 'scenes/picker', 'actors/phmeter', 'actors/machine', 'scullge/engine', 'scullge/utils/arrays', 'data/context', 'text!templates/scenes/recyclingPlant.html' ],
	function( BaseScene, PickerScene, PhmeterActor, MachineActor, GameEngine, ArraysUtils, gaco, tplHtml )
{
	function RecyclingPlantScene()
	{
		BaseScene.call( this );

		this.setId( 'recyclingPlant' );
	}

	RecyclingPlantScene.prototype = new BaseScene();
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

