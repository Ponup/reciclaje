
define( [ 'scullge/scenes/base', 'scenes/picker', 'data/context', 'text!templates/scenes/intro.html' ], function( BaseScene, PickerScene, gaco, tplHtml )
	{
		function IntroScene()
		{
			BaseScene.call( this );

			this.setId( 'intro' );
		}

		IntroScene.prototype = new BaseScene();
		IntroScene.prototype.constructor = IntroScene;

		IntroScene.prototype.savePlayerName = function()
		{
			localStorage.setItem( 'playerName', $( '#playerName' ).val() );
		};

		IntroScene.prototype.switchFrom = function( prevScene )
		{
			document.title = 'El juego del reciclaje';
			document.body.style.backgroundColor = '#17bc99';

			if( null !== prevScene && 'ranking' !== prevScene.getId() )
			{
				gaco.audioManager.stopAll();
			}
			gaco.audioManager.play( 'bgmusicMenu', true );

			gaco.audioManager.play( 'menu_a_reciclar' ); // revisar esta linea no se donde iria el audio.

			var $canvas = $( document.getElementById( 'canvas' ) ),
				self = this;
			
			$canvas.empty().append( tplHtml );

			var playerName = localStorage.getItem( 'playerName' );
			if( null !== playerName ) $( '#playerName' ).val( playerName );

			$( '#introScene' ).fadeIn();
			
			
			$( '#introBtnRanking' ).on( 'click', function()
				{
					self.savePlayerName();

					gaco.sceneManager.switchTo( 'ranking' );
				}
			);
			$( '#introBtnBonus' ).on( 'click', function()
				{
					self.savePlayerName();

					require( [ 'scenes/split' ], function( SplitScene )
						{
							var scene = new SplitScene();
							gaco.sceneManager.add( scene );
							gaco.sceneManager.switchTo( scene );
						}
					);
				}
			);
			$( '#introBtnProcess' ).on( 'click', function()
				{
					self.savePlayerName();

					require( [ 'scenes/recyclingPlant' ], function( RecyclingPlantScene )
						{
							var scene = new RecyclingPlantScene();
							gaco.finalSceneName = scene.getId();
							gaco.sceneManager.add( scene );

							var picker = new PickerScene( scene );
							gaco.sceneManager.add( picker );
							gaco.sceneManager.switchTo( picker );
						}
					);
				}
			);
			$( '#introBtnConveyorBelt' ).on( 'click', function()
				{
					self.savePlayerName();

					require( [ 'scenes/bioDigester' ], function( BioDigesterScene )
						{
							var scene = new BioDigesterScene();
							gaco.finalSceneName = scene.getId();
							gaco.sceneManager.add( scene );

							var picker = new PickerScene( scene );
							gaco.sceneManager.add( picker );
							gaco.sceneManager.switchTo( picker );
						}
					);
				}
			);
		};

		return IntroScene;
	}
);

