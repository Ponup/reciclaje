
define(
	[ 'scullge/scene', 'engines/conveyorBelt', 'text!templates/scenes/conveyorBelt.html' ],
	function( SceneBase, ConveyorBeltEngine, tplHtml )
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

		var engine = new ConveyorBeltEngine();
		engine.init();
		engine.start();
	};

	return ConveyorBeltScene;
});

