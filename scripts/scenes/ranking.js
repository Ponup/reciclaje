
define( [ 'handlebars', 'data/context', 'scullge/scenes/base', 'data/scores', 'text!templates/scenes/ranking.html' ], function( Handlebars, gaco, BaseScene, Scores, tplHtml )
{
	function RankingScene()
	{
		BaseScene.call( this );

		this.setId( 'ranking' );
	}

	RankingScene.prototype = new BaseScene();
	RankingScene.prototype.constructor = RankingScene;

	RankingScene.prototype.switchFrom = function( prevScene )
	{
		document.title = 'Salón de la fama - El juego del reciclaje';
		document.body.style.backgroundColor = '#17bc99';

		$( '#canvas' ).empty().append( tplHtml );

		$( '#gotoIntro' ).on( 'click', function( ev )
			{
				gaco.sceneManager.switchTo( 'intro' );
			}
		);

		var $hofEntries = $( document.getElementById( 'hofEntries' ) );

		var scores = Scores.list( 5 );
		if( scores.length > 0 )
		{
			var $resetScores = $( document.getElementById( 'resetScores' ) );
			$resetScores.show();
			$resetScores.on( 'click', function( ev )
				{
					localStorage.removeItem( 'scores' );
					$( '#hofEntries' ).html( '' );
					$( this ).slideToggle( 240, function() { $( this ).remove(); } );
				}
			);

			$hofEntries.html( '' );

			var source = $( '#hofEntry' ).html();
			var template = Handlebars.compile( source );

			for( var i = 0; i < scores.length; i++ )
			{
				var score = scores[ i ];
				if( score.player.name == '' )
					score.player.name = 'Anónimo';
				score.position = i + 1;

				var html = template( score );
				$hofEntries.append( html );
			}
		}
		else
		{
			$hofEntries.append( '<tr><td colspan="3">No hay puntuaciones aún</td></tr>' );
		}

		prevScene.hide();
		$( '#rankingScene' ).fadeIn();
	};

	return RankingScene;
});

