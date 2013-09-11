
define(
	[ 'scullge/scenes/base', 'engines/recyclingPlant', 'data/context', 'text!templates/scenes/brief/recyclingPlant.html', 'jqueryui' ],
	function( BaseScene, RecyclingPlantEngine, gaco, briefHtml )
{
	function RecyclingPlantScene()
	{
		BaseScene.call( this );
		
		gaco.audioManager.load( 'encotra_papel', CONTEXT_PATH + '/sounds/voces/brief_picker_encontra_reciclador.mp3' );
		gaco.audioManager.load( 'brief_puntos', CONTEXT_PATH + '/sounds/voces/brief_puntos.mp3' );
		gaco.audioManager.load( 'brief_tiempo', CONTEXT_PATH + '/sounds/voces/brief_tiempo.mp3' );

		setTimeout( function() { gaco.audioManager.play( 'encotra_papel' );	}, 100 );
		setTimeout( function() { gaco.audioManager.play( 'brief_puntos' );	}, 4000 );
		setTimeout( function() { gaco.audioManager.play( 'brief_tiempo' );	}, 8000 );
		
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

		gaco.audioManager.load( 'brief_reci_h1', CONTEXT_PATH + '/sounds/voces/brief_reci_h1.mp3' );
		gaco.audioManager.load( 'brief_reci_enchufe', CONTEXT_PATH + '/sounds/voces/brief_reci_enchufe.mp3' );

		setTimeout( function() { gaco.audioManager.play( 'brief_reci_h1' );	}, 100 );
		setTimeout( function() { gaco.audioManager.play( 'brief_reci_enchufe' );	}, 6000 );
		setTimeout( function() { gaco.audioManager.play( 'brief_tiempo' );	}, 13000 );	

		$( '#brief' ).on( 'click', function()
			{
				gaco.audioManager.stopAll(); // stop all sounds
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

