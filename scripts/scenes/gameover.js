
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
			},
		};
		Scores.save( score );

		$( '#canvas' ).empty().append( gameoverHtml );

		$( '#gotoRanking' ).on( 'click', function()
			{
				gaco.sceneManager.switchTo( 'ranking' );
			}
		);
		$( '#gotoIntro' ).on( 'click', function()
			{
				gaco.sceneManager.switchTo( 'intro' );
			}
		);

		gaco.audioManager.stopAll();

		var $scene = $( document.getElementById( 'gameoverScene' ) );

		if( gaco.hasWin ) 
		{
			
			gaco.audioManager.load( 'felicitaciones', CONTEXT_PATH + '/sounds/voces/gameover_felicitaciones.mp3' );
			setTimeout( function() { gaco.audioManager.play( 'felicitaciones' );	}, 1000 );		
		
			gaco.audioManager.play( 'gameoverWon' );
			$scene.addClass( 'Winner' );
			$( 'div.Winner' ).removeClass( 'Hidden' );
			document.body.style.backgroundColor = '#17bc99';
		}
		else
		{
			
			gaco.audioManager.load( 'gracias', CONTEXT_PATH + '/sounds/voces/gameover_gracias.mp3' );
			setTimeout( function() { gaco.audioManager.play( 'gracias' );	}, 1000 );		
			
			gaco.audioManager.play( 'gameoverLost' );
			$scene.addClass( 'Loser' );
			$( 'div.Loser' ).removeClass( 'Hidden' );
			document.body.style.backgroundColor = '#e94c3d';
		}

		$( '.Puntos' ).html( gaco.gameVars.score );
		$( '.Segundos' ).html( parseInt( gaco.engine.getElapsedTime( true ), 10 ) );

		$scene.fadeIn();
	};

	return GameoverScene;
});

