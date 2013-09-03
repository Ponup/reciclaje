
define(
	[ 'scullge/scene', 'engines/conveyorBelt', 'game/context', 'text!templates/scenes/conveyorBelt.html' ],
	function( SceneBase, ConveyorBeltEngine, gaco, tplHtml )
{
	function ConveyorBeltScene()
	{
		SceneBase.call( this );

		this.setId( 'conveyorBelt' );
	}

	ConveyorBeltScene.prototype = new SceneBase();
	ConveyorBeltScene.prototype.constructor = ConveyorBeltScene;

	ConveyorBeltScene.prototype.switchFrom = function( prevScene )
	{
		prevScene.hide();

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		$canvas.empty().append( tplHtml );

		gaco.engine = new ConveyorBeltEngine();
		gaco.engine.init();
		gaco.engine.start();
	};

	return ConveyorBeltScene;
});

