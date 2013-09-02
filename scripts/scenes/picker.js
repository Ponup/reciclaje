
define(
	[ 'engines/picker', 'scullge/scene', 'text!templates/scenes/picker.html' ],
	function( PickerEngine, Scene, tplHtml )
{
	function PickerScene()
	{
		Scene.call( this );

		this.setId( 'picker' );
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

		var gameEngine = new PickerEngine();
		gameEngine.init();
		gameEngine.start();
	};

	return PickerScene;
});

