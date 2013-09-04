
define(
	[ 'scullge/scenes/base', 'engines/bioDigester', 'data/context', 'text!templates/scenes/conveyorBelt.html' ],
	function( BaseScene, BioDigesterEngine, gaco, tplHtml )
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
		prevScene.hide();

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		$canvas.empty().append( tplHtml );

		gaco.engine = new BioDigesterEngine();
		gaco.engine.init();
		gaco.engine.start();
	};

	return BioDigesterScene;
});

