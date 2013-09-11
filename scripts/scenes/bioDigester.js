
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

		var $canvas = $( document.getElementById( 'canvas' ) );
		$canvas.empty().append( briefHtml );

		gaco.audioManager.load( 'brief_bio_h1', CONTEXT_PATH + '/sounds/voces/brief_bio_h1.mp3' );
		gaco.audioManager.load( 'brief_bio_bacterias', CONTEXT_PATH + '/sounds/voces/brief_bio_bacterias.mp3' );
		gaco.audioManager.load( 'brief_bio_phmeter', CONTEXT_PATH + '/sounds/voces/brief_bio_phmeter.mp3' );

		setTimeout( function() { gaco.audioManager.play( 'brief_bio_h1' );	}, 100 );
		setTimeout( function() { gaco.audioManager.play( 'brief_bio_bacterias' );	}, 5000 );
		setTimeout( function() { gaco.audioManager.play( 'brief_bio_phmeter' );	}, 8000 );	
		setTimeout( function() { gaco.audioManager.play( 'brief_puntos' );	}, 12500 );
		setTimeout( function() { gaco.audioManager.play( 'brief_tiempo' );	}, 16500 );	

		$( '#brief' ).on( 'click', function()
			{
				gaco.audioManager.stopAll(); // stop all sounds
				
				var sceneDiv = document.createElement( 'div' );
				sceneDiv.id = 'conveyorBelt';
				sceneDiv.className = 'Scene';
				sceneDiv.style.overflow = 'hidden';
				sceneDiv.style.background = "url('images/scenes/conveyorBelt.png') no-repeat";
				$canvas.empty().append( sceneDiv );
				
				gaco.engine = new BioDigesterEngine();
				gaco.engine.init();
				gaco.engine.start();
			}
		);
	};

	return BioDigesterScene;
});

