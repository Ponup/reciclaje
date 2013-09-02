
define( [ 'handlebars', 'game/context', 'scullge/scene', 'game/scores', 'text!templates/scenes/ranking.html' ], function( Handlebars, gaco, Scene, Scores, tplHtml )
{
	function RankingScene()
	{
		Scene.call( this );

		this.setId( 'ranking' );
	}

	RankingScene.prototype = new Scene();

	RankingScene.prototype.switchFrom = function( prevScene )
	{
		$( '#canvas' ).empty().append( $( tplHtml ) );

		$( '#gotoIntro' ).on( 'click', function( ev )
			{
				gaco.sceneManager.switchTo( 'intro' );
			}
		);
		$( '#resetScores' ).on( 'click', function( ev )
			{
				localStorage.removeItem( 'scores' );
				$( '#hofEntries' ).html( '' );
			}
		);

		var $hofEntries = $( '#hofEntries' );
		$hofEntries.html( '' );

		var source = $( '#hofEntry' ).html();
		var template = Handlebars.compile( source );

		var scores = Scores.list();
		for( var i = 0; i < scores.length; i++ )
		{
			var score = scores[i];
			score.position = i + 1;
			var html = template( score );
			$hofEntries.append( html );
		}

		prevScene.hide();
		$( '#rankingScene' ).fadeIn();
	};

	return RankingScene;
});

