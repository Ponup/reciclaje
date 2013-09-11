
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
				
				var lightbulb = document.createElement( 'img' );
					lightbulb.className = 'LightBulb';
					lightbulb.src = 'images/scenes/recyclingPlant/lightbulb.png';
					lightbulb.style.position = 'absolute';
					lightbulb.style.left  = '200px';
					lightbulb.style.top = '32px';
					lightbulb.style.width = '27px';
					lightbulb.style.height = '153px';
					sceneDiv.appendChild( lightbulb );
				
				var lightbulb2 = document.createElement( 'img' );
					lightbulb2.className = 'LightBulb';
					lightbulb2.src = 'images/scenes/recyclingPlant/lightbulb.png';
					lightbulb2.style.position = 'absolute';
					lightbulb2.style.left  = '800px';
					lightbulb2.style.top = '32px';
					lightbulb2.style.width = '27px';
					lightbulb2.style.height = '153px';
					sceneDiv.appendChild( lightbulb2 );

				$canvas.empty().append( sceneDiv );
		
				gaco.engine = new RecyclingPlantEngine();
				gaco.engine.init();
				gaco.engine.start();
			}
		);
	};

	return RecyclingPlantScene;
});

