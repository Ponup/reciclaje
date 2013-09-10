
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
		gaco.audioManager.play( 'bgmusicGameplay', true );

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		var sceneDiv = document.createElement( 'div' ),
		    	$sceneDiv = $( sceneDiv );

		sceneDiv.id = 'picker';
		sceneDiv.className = 'Scene';
		sceneDiv.style.display = 'none';
		sceneDiv.style.backgroundRepeat = 'no-repeat';

		$canvas.empty().append( sceneDiv );

		//revisar estas lineas , no llevan a ningun lado
		var btSalir = document.createElement( 'img' );
		btSalir.id = 'goHome'; //revisar esto, el link no anda
		btSalir.src = 'images/bt_salir.png';
		btSalir.style.cssText = 'position: absolute; top: 20px; left: 12px;';
		sceneDiv.appendChild( btSalir );

		if( 'bioDigester' == gaco.finalSceneName )
			$sceneDiv.append( bioDigesterBriefHtml );
		else
			$sceneDiv.append( recyclingPlantBriefHtml );

		var picker = document.getElementById( 'picker' );
		$( picker ).fadeIn();

		gaco.engine = new PickerEngine( this.nextScene );
		gaco.engine.init();

		$( '#pickerBrief' ).on( 'click', function()
			{
				$( this ).remove();

				// Init the remaining actors.
				gaco.engine.initActors();

				gaco.engine.start();
			}
		);
	};

	return PickerScene;
});

