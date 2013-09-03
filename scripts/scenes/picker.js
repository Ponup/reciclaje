
define(
	[ 'engines/picker', 'scullge/scene', 'game/context', 'text!templates/scenes/picker.html' ],
	function( PickerEngine, Scene, gaco, tplHtml )
{
	function PickerScene( nextScene )
	{
		Scene.call( this );

		this.setId( 'picker' );

		this.nextScene = nextScene;
	}

	PickerScene.prototype = new Scene();

	PickerScene.prototype.switchFrom = function( prevScene )
	{
		prevScene.hide();

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		$canvas.empty().append( tplHtml );

		var picker = document.getElementById( 'picker' );
		$( picker ).fadeIn();

		gaco.engine = new PickerEngine();
		gaco.engine.nextScene = this.nextScene;
		gaco.engine.init();
		gaco.engine.start();
	};

	return PickerScene;
});

