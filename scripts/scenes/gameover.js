
define( [ 'data/context', 'scullge/scenes/base', 'data/scores', 'text!templates/gameover.html' ], function( gaco, BaseScene, Scores, gameoverHtml )
{
	function GameoverScene()
	{
		BaseScene.call( this );

		this.setId( 'gameover' );
	}

	GameoverScene.prototype = new BaseScene();

	GameoverScene.prototype.switchFrom = function( prevScene )
	{
		document.title = 'Juego terminado - El juego del reciclaje';

		var score = {
			player: {
				name: localStorage.getItem( 'playerName' ),
			},
			game: {
				score: gaco.gameVars.score,
				datetime: new Date(),
			},
		};
		Scores.save( score );

		$( '#canvas' ).empty().append( $( gameoverHtml ) );

		$( '#viewHalloffame2' ).on( 'click', function( ev )
			{
				gaco.sceneManager.switchTo( 'ranking' );
			}
		);
		$( '#gotoIntro' ).on( 'click', function( ev )
			{
				gaco.sceneManager.switchTo( 'intro' );
			}
		);

		if( gaco.hasWin ) 
		{
			gaco.audioManager.play( 'gameWin' );
			$( '#gameoverScene' ).addClass( 'Winner' ).fadeIn();
			$( 'div.Winner' ).removeClass( 'Hidden' );
			document.body.style.backgroundColor = '#17bc99';
		}
		else
		{
			gaco.audioManager.play( 'gameLose' );
			$( '#gameoverScene' ).addClass( 'Loser' ).fadeIn();
			$( 'div.Loser' ).removeClass( 'Hidden' );
			document.body.style.backgroundColor = '#e94c3d';
		}

		$( '.Puntos' ).html( gaco.gameVars.score );
		$( '.Segundos' ).html( gaco.engine.getElapsedTime( true ) );

		$( '#gameover' ).fadeIn();
	};

	return GameoverScene;
});

