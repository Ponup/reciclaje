
define(
	[ 'scullge/scenes/base', 'engines/bioDigester', 'data/context', 'text!templates/scenes/brief/bioDigester.html' ], function( BaseScene, BioDigesterEngine, gaco, briefHtml )
{
	function BioDigesterScene()
	{
		BaseScene.call( this );

		this.setId( 'bioDigester' );
	}

	BioDigesterScene.prototype = new BaseScene();
	BioDigesterScene.prototype.constructor = BioDigesterScene;

	BioDigesterScene.prototype.switchFrom = function( prevScene )
	{
		document.title = 'Biodigestor - El juego del reciclaje';
		document.body.style.backgroundColor = '#2d3e50';

		prevScene.hide();

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		$canvas.empty().append( briefHtml );

		$( '#brief' ).on( 'click', function()
			{
				var sceneDiv = document.createElement( 'div' );
				sceneDiv.id = 'conveyorBelt';
				sceneDiv.className = 'Scene';
				sceneDiv.style.background = "url('images/scenes/conveyorBelt.png') no-repeat";

				$canvas.empty().append( sceneDiv );
				
				var btSalir = document.createElement( 'img' );
				btSalir.src = 'images/bt_salir.png';
				btSalir.style.cssText = 'position: absolute; top: 20px; left: 12px;';
				$( btSalir ).on( 'click', function()
					{
						gaco.engine.stop();
						gaco.sceneManager.switchTo( 'intro' );
					}
				);
				sceneDiv.appendChild( btSalir );

				gaco.engine = new BioDigesterEngine();
				gaco.engine.init();
				gaco.engine.start();
			}
		);
	};

	return BioDigesterScene;
});

