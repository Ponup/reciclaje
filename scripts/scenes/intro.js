
define(
	[ 'scullge/scene', 'scenes/conveyorbelt', 'scenes/pickerbrief', 'scenes/recyclingPlant', 'scenes/splitIntro', 'game/context', 'text!templates/scenes/intro.html' ],
	function( BaseScene, ConveyorBeltScene, PickerBriefScene, RecyclingPlantScene, SplitIntroScene, gaco, tplHtml )
	{
		function IntroScene()
		{
			BaseScene.call( this );

			this.setId( 'intro' );
		}

		IntroScene.prototype = new BaseScene();
		IntroScene.prototype.constructor = IntroScene;

		IntroScene.prototype.switchFrom = function( prevScene )
		{
			var canvas = document.getElementById( 'canvas' ),
				$canvas = $( canvas );
			
			$canvas.empty().append( tplHtml );
			$( '#introScene' ).fadeIn();

			$( '#introBtnRanking' ).on( 'click', function()
				{
					gaco.sceneManager.switchTo( 'ranking' );
				}
			);
			$( '#introBtnBonus' ).on( 'click', function()
				{
					var scene = new SplitIntroScene();
					gaco.sceneManager.add( scene );
					gaco.sceneManager.switchTo( scene );
				}
			);
			$( '#introBtnProcess' ).on( 'click', function()
				{
					var scene = new RecyclingPlantScene();
					gaco.sceneManager.add( scene );

					var picker = new PickerBriefScene( scene );
					gaco.sceneManager.add( picker );
					gaco.sceneManager.switchTo( picker );
				}
			);
			$( '#introBtnConveyorBelt' ).on( 'click', function()
				{
					var scene = new ConveyorBeltScene();
					gaco.sceneManager.add( scene );

					var picker = new PickerBriefScene( scene );
					gaco.sceneManager.add( picker );
					gaco.sceneManager.switchTo( picker );
				}
			);
			$( '#splitLink' ).on( 'click', function()
				{
					var scene = new IntroScene();
					gaco.sceneManager.add( scene );
					gaco.sceneManager.switchTo( scene );
				}
			);

			$( '#viewHalloffame' ).on( 'click', function( ev )
				{
					var scene = new HalloffameScene();
                                	gaco.sceneManager.add( scene );
					gaco.sceneManager.switchTo( scene );
				}
			);
		};

		return IntroScene;
	}
);

