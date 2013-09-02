
define( [ 'game/context', 'scullge/scene', 'text!templates/gameover.html' ], function( gaco, Scene, gameoverHtml )
{
	function GameoverScene()
	{
		Scene.call( this );

		this.setId( 'gameover' );
	}

	GameoverScene.prototype = new Scene();

	GameoverScene.prototype.switchFrom = function( prevScene )
	{
		$( '#canvas' ).empty();
		$( '#canvas' ).append( $( gameoverHtml ) );

		$( '#replayButton' ).unbind( 'click' );
		$( '#replayButton' ).on( 'click', function( ev )
			{
				$( '#gameover' ).hide();
				gaco.sceneManager.switchTo( 'help' );
			}
		);

		$( '#viewHalloffame2' ).on( 'click', function( ev )
			{
				gaco.sceneManager.switchTo( 'halloffame' );
			}
		);

		var hasWin = gaco.canPassLevel();
		if( hasWin ) 
		{
			gaco.audioManager.play( 'gameWin' );
			$( '#gameOver' ).addClass( 'Winner' );
		}
		else
		{
			gaco.audioManager.play( 'gameLose' );
			$( '#gameOver' ).addClass( 'Loser' );
		}

		$( '#outcome' ).attr( 'src', CONTEXT_PATH + imgSrc );
		$( '#gameover' ).fadeIn();
	};

	return GameoverScene;
});
