
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


		var $canvas = $( document.getElementById( 'canvas' ) );
		$canvas.empty();

		gaco.engine = new RecyclingPlantEngine();
		gaco.engine.preInit();

		prevScene.hide();
		$( '.Scene' ).append( briefHtml );
		$( '.Scene' ).fadeIn();

		gaco.audioManager.load( 'brief_reci_h1', CONTEXT_PATH + '/sounds/voces/brief_reci_h1.mp3' );
		gaco.audioManager.load( 'brief_reci_enchufe', CONTEXT_PATH + '/sounds/voces/brief_reci_enchufe.mp3' );

		setTimeout( function() { gaco.audioManager.play( 'brief_reci_h1' ); }, 100 );
		setTimeout( function() { gaco.audioManager.play( 'brief_reci_enchufe' ); }, 6000 );
		setTimeout( function() { gaco.audioManager.play( 'brief_tiempo' ); }, 13000 );	

		setTimeout( function()
			{
				$( '#brief' ).on( 'click', function()
					{
						$( this ).remove();

						gaco.audioManager.stopAll(); // stop all sounds

						gaco.engine.init();
						gaco.engine.start();
					}
				);
			}, 15500
		);
	};

	return RecyclingPlantScene;
});

