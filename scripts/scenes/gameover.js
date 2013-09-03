
define( [ 'game/context', 'scullge/scene', 'text!templates/gameover.html' ], function( gaco, Scene, gameoverHtml )
{
	function GameoverScene( hasWin )
	{
		Scene.call( this );

		this.hasWin = hasWin;
		this.setId( 'gameover' );
	}

	GameoverScene.prototype = new Scene();

	GameoverScene.prototype.switchFrom = function( prevScene )
	{
		$( '#canvas' ).empty().append( $( gameoverHtml ) );

		$( '#viewHalloffame2' ).on( 'click', function( ev )
			{
				gaco.sceneManager.switchTo( 'ranking' );
			}
		);

		if( this.hasWin ) 
		{
			gaco.audioManager.play( 'gameWin' );
			$( '#gameoverScene' ).addClass( 'Winner' ).fadeIn();
			$( 'div.Winner' ).removeClass( 'Hidden' );
		}
		else
		{
			gaco.audioManager.play( 'gameLose' );
			$( '#gameoverScene' ).addClass( 'Loser' ).fadeIn();
			$( 'div.Loser' ).removeClass( 'Hidden' );
		}

		$( '.Puntos' ).html( gaco.gameVars.score );
		$( '.Segundos' ).html( gaco.gameVars.elapsedSeconds );

		$( '#gameover' ).fadeIn();
	};

	return GameoverScene;
});

