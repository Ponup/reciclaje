
define(
	[ 'scenes/base', 'scenes/conveyorbelt', 'scenes/pickerbrief', 'scenes/recyclingPlant', 'scenes/intro', 'game/context', 'text!templates/scenes/welcome.html' ],
	function( SceneBase, ConveyorBeltScene, PickerBriefScene, RecyclingPlantScene, IntroScene, gaco, tplHtml )
	{
		function WelcomeScene()
		{
			SceneBase.call( this );

			this.setId( 'welcome' );
		}

		WelcomeScene.prototype = new SceneBase();
		WelcomeScene.prototype.constructor = WelcomeScene;

		WelcomeScene.prototype.switchFrom = function( prevScene )
		{
			var canvas = document.getElementById( 'canvas' ),
				$canvas = $( canvas );
			
			$canvas.empty().append( tplHtml );

			$( '#conveyorBeltLink' ).on( 'click', function()
				{
					var scene = new ConveyorBeltScene();
					gaco.sceneManager.add( scene );
					gaco.sceneManager.switchTo( scene );
				}
			);
			$( '#pickerLink' ).on( 'click', function()
				{
					var scene = new PickerBriefScene();
					gaco.sceneManager.add( scene );
					gaco.sceneManager.switchTo( scene );
				}
			);
			$( '#recyclingPlantLink ' ).on( 'click', function()
				{
					var scene = new RecyclingPlantScene();
					gaco.sceneManager.add( scene );
					gaco.sceneManager.switchTo( scene );
				}
			);
			$( '#splitLink' ).on( 'click', function()
				{
					var scene = new IntroScene();
					gaco.sceneManager.add( scene );
					gaco.sceneManager.switchTo( scene );
				}
			);

		};

		return WelcomeScene;
	}
);

