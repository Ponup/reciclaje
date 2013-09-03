
define( [ 'game/context', 'scullge/scene', 'game/audiomanager', 'text!templates/scenes/splitIntro.html',
        'scenes/split',
        'utils/cssloader'

 ], function( gaco, Scene, AudioManager, tplHtml, SplitScene, CssLoader )
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

		$( '#canvas' ).empty();
		$( '#canvas' ).append( $( tplHtml ) );

		var bgMusic = gaco.audioManager.play( 'introMusic' );
		bgMusic.pause();

		var playerName = localStorage.getItem( 'playerName' );
		if( null !== playerName ) $( '#playerName' ).val( playerName );

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
			1000
		);

		$( 'img.Button' ).hover(
			function()
			{
				$( this ).animate({ zoom: 1.1 }, { duration: 120 });
			},
			function()
			{
				$( this ).animate({ zoom: 1 }, { duration: 120 });
			}
		);
	};

	SplitIntroScene.prototype.hide = function()
	{
		$( '#intro' ).hide();
	};

	return SplitIntroScene;
});

