
define(
	[ 'scenes/base', 'scenes/picker', 'game/context', 'text!templates/scenes/pickerbrief.html' ],
	function( SceneBase, PickerScene, gaco, tplHtml )
{
	function PickerBriefScene()
	{
		SceneBase.call( this );

		this.setId( 'pickerbrief' );
	}

	PickerBriefScene.prototype = new SceneBase();
	PickerBriefScene.prototype.constructor = PickerBriefScene;

	PickerBriefScene.prototype.switchFrom = function( prevScene )
	{
		prevScene.hide();

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		$canvas.empty().append( tplHtml );

		canvas.onclick = function()
		{
			canvas.onclick = function() {};
			gaco.sceneManager.add( new PickerScene() );
			gaco.sceneManager.switchTo( 'picker' );
		};
	};

	return PickerBriefScene;
});

