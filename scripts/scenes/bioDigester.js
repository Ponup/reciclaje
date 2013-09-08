
define(
	[ 'scullge/scenes/base', 'engines/bioDigester', 'data/context' ],
	function( BaseScene, BioDigesterEngine, gaco )
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

		var sceneDiv = document.createElement( 'div' );
		sceneDiv.id = 'conveyorBelt';
		sceneDiv.className = 'Scene';
		sceneDiv.style.background = "url('images/scenes/conveyorBelt.png') no-repeat";

		$canvas.empty().append( sceneDiv );

		gaco.engine = new BioDigesterEngine();
		gaco.engine.init();
		gaco.engine.start();
	};

	return BioDigesterScene;
});

