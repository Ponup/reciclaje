
define(
	[ 'scullge/scenes/base', 'engines/recyclingPlant', 'data/context', 'text!templates/scenes/brief/recyclingPlant.html', 'jqueryui' ],
	function( BaseScene, RecyclingPlantEngine, gaco, briefHtml )
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
		document.title = 'Reciclar papel - El juego del reciclaje';
		document.body.style.backgroundColor = '#2d3e50';

		prevScene.hide();

		var $canvas = $( document.getElementById( 'canvas' ) );

		$canvas.empty().append( briefHtml );

		$( '#brief' ).on( 'click', function()
			{
				var sceneDiv = document.createElement( 'div' );
				sceneDiv.id = 'recyclingPlant';
				sceneDiv.className = 'Scene';
				sceneDiv.style.background = "url('images/scenes/recyclingPlant.png') no-repeat";
				
				$canvas.empty().append( sceneDiv );

				gaco.engine = new RecyclingPlantEngine();
				gaco.engine.init();
				gaco.engine.start();
			}
		);
	};

	return RecyclingPlantScene;
});

