
define( [ 'game/context', 'scenes/base', 'text!templates/help.html' ], function( gaco, Scene, helpHtml )
{
	function HelpScene()
	{
		Scene.call( this );

		this.setId( 'help' );
	}

	HelpScene.prototype = new Scene();

	HelpScene.prototype.switchFrom = function( prevScene )
	{
		prevScene.hide();

		$( '#canvas' ).empty();
		$( '#canvas' ).append( $( helpHtml ) );

		gaco.audioManager.play( 'helpMusic' );

		var currentLevel = 1;

		$( '#currentLevel' ).html( currentLevel );

		$( '#help' ).fadeIn();
		setTimeout( function()
			{
				$( '#help' ).hide();
				gaco.sceneManager.switchTo( 'gameplay' );
			},
			1000
		);
	};

	return HelpScene;
});

