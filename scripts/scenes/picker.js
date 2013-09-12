
define(
	[ 'engines/picker', 'scullge/scenes/base', 'data/context', 'text!templates/scenes/brief/picker/bioDigester.html', 'text!templates/scenes/brief/picker/recyclingPlant.html' ], function( PickerEngine, BaseScene, gaco, bioDigesterBriefHtml, recyclingPlantBriefHtml  )
{
	function PickerScene( nextScene )
	{
		BaseScene.call( this );

		this.setId( 'picker' );

		this.nextScene = nextScene;
	}

	PickerScene.prototype = new BaseScene();

	PickerScene.prototype.switchFrom = function( prevScene )
	{
		prevScene.hide();

		document.title = 'Recoje elementos - El juego del reciclaje';
		document.body.style.backgroundColor = '#2d3e50';

		gaco.audioManager.stopAll();

		gaco.engine = new PickerEngine( this.nextScene );
		gaco.engine.preInit();

		var $sceneDiv = $( document.getElementById( 'picker' ) );

		if( 'bioDigester' == gaco.finalSceneName )
		{
			$sceneDiv.append( bioDigesterBriefHtml );

			gaco.audioManager.load( 'encotra_bio', CONTEXT_PATH + '/sounds/voces/brief_picker_encontra_biodigestor.mp3' );
			gaco.audioManager.load( 'brief_puntos', CONTEXT_PATH + '/sounds/voces/brief_puntos.mp3' );
			gaco.audioManager.load( 'brief_tiempo', CONTEXT_PATH + '/sounds/voces/brief_tiempo.mp3' );

			setTimeout( function() { gaco.audioManager.play( 'encotra_bio' );	}, 100 );
			setTimeout( function() { gaco.audioManager.play( 'brief_puntos' );	}, 4000 );
			setTimeout( function() { gaco.audioManager.play( 'brief_tiempo' );	}, 8000 );		
		}
		else
		{
			$sceneDiv.append( recyclingPlantBriefHtml );

			gaco.audioManager.load( 'encotra_papel', CONTEXT_PATH + '/sounds/voces/brief_picker_encontra_reciclador.mp3' );
			gaco.audioManager.load( 'brief_puntos', CONTEXT_PATH + '/sounds/voces/brief_puntos.mp3' );
			gaco.audioManager.load( 'brief_tiempo', CONTEXT_PATH + '/sounds/voces/brief_tiempo.mp3' );

			setTimeout( function() { gaco.audioManager.play( 'encotra_papel' );	}, 100 );
			setTimeout( function() { gaco.audioManager.play( 'brief_puntos' );	}, 4000 );
			setTimeout( function() { gaco.audioManager.play( 'brief_tiempo' );	}, 8000 );
		}
		
		$sceneDiv.fadeIn();

		setTimeout( function()
			{
				$( '#pickerBrief' ).on( 'click', function()
					{
						$( this ).remove();

						gaco.engine.init();
						gaco.engine.start();
					}
				);
			}, 11000
		);
	};

	return PickerScene;
});

