
define(
	[ 'scullge/scene', 'scenes/picker', 'game/context', 'text!templates/scenes/pickerbrief.html' ],
	function( SceneBase, PickerScene, gaco, tplHtml )
{
	function PickerBriefScene( nextScene )
	{
		SceneBase.call( this );

		this.setId( 'pickerbrief' );

		this.nextScene = nextScene;
	}

	PickerBriefScene.prototype = new SceneBase();
	PickerBriefScene.prototype.constructor = PickerBriefScene;

	PickerBriefScene.prototype.switchFrom = function( prevScene )
	{
		var self = this;
		prevScene.hide();

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		$canvas.empty().append( tplHtml );

		canvas.onclick = function()
		{
			canvas.onclick = function() {};
			gaco.sceneManager.add( new PickerScene( self.nextScene ) );
			gaco.sceneManager.switchTo( 'picker' );
		};
	};

	return PickerBriefScene;
});

