
define( [ 'game/context', 'scullge/scenes/base', 'game/audiomanager', 'text!templates/scenes/splitIntro.html', 'scenes/split' ], function( gaco, Scene, AudioManager, tplHtml, SplitScene )
{
	function SplitIntroScene()
	{
		Scene.call( this );

		this.setId( 'splitIntro' );
	}

	SplitIntroScene.prototype = new Scene();

	SplitIntroScene.prototype.switchFrom = function( prevScene )
	{
		if( null !== prevScene )
		{
			prevScene.hide();
		}

		$( '#canvas' ).empty().append( $( tplHtml ) );

		var bgMusic = gaco.audioManager.play( 'introMusic' );
		bgMusic.pause();

		gaco.sceneManager.add( new SplitScene() );

		gaco.audioManager.play( 'helpMusic' );

		var currentLevel = 1;

		$( '#currentLevel' ).html( currentLevel );

		$( '#help' ).fadeIn();
		setTimeout( function()
			{
				$( '#help' ).hide();
				gaco.sceneManager.switchTo( 'split' );
			},
			2300
		);
	};

	SplitIntroScene.prototype.hide = function()
	{
		$( '#intro' ).hide();
	};

	return SplitIntroScene;
});

