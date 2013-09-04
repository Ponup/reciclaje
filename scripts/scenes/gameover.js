
define( [ 'data/context', 'scullge/scenes/base', 'text!templates/gameover.html' ], function( gaco, BaseScene, gameoverHtml )
{
	function GameoverScene( hasWin )
	{
		BaseScene.call( this );

		this.hasWin = hasWin;
		this.setId( 'gameover' );
	}

	GameoverScene.prototype = new BaseScene();

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

