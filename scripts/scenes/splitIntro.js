
define( [ 'data/context', 'scullge/scenes/base', 'text!templates/scenes/splitIntro.html', 'scenes/split' ], function( gaco, BaseScene, tplHtml, SplitScene )
{
	function SplitIntroScene()
	{
		BaseScene.call( this );

		this.setId( 'splitIntro' );
	}

	SplitIntroScene.prototype = new BaseScene();

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

