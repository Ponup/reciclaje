
define(
	[ 'engines/picker', 'scullge/scenes/base', 'game/context', 'text!templates/scenes/picker.html' ],
	function( PickerEngine, BaseScene, gaco, tplHtml )
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

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		$canvas.empty().append( tplHtml );

		var picker = document.getElementById( 'picker' );
		$( picker ).fadeIn();

		gaco.engine = new PickerEngine();
		gaco.engine.nextScene = this.nextScene;
		gaco.engine.init();

		$( '#pickerBrief' ).on( 'click', function()
			{
				$( this ).remove();

				gaco.engine.start();
			}
		);
	};

	return PickerScene;
});

