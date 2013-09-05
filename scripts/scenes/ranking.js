
define( [ 'handlebars', 'data/context', 'scullge/scenes/base', 'data/scores', 'text!templates/scenes/ranking.html' ], function( Handlebars, gaco, BaseScene, Scores, tplHtml )
{
	function RankingScene()
	{
		BaseScene.call( this );

		this.setId( 'ranking' );
	}

	RankingScene.prototype = new BaseScene();

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
				$( this ).slideDown( 4000, function() { $( this ).remove(); } );
			}
		);

		var $hofEntries = $( '#hofEntries' );
		$hofEntries.html( '' );

		var source = $( '#hofEntry' ).html();
		var template = Handlebars.compile( source );

		var scores = Scores.list( 5 );
		for( var i = 0; i < scores.length; i++ )
		{
			var score = scores[0];
			score.position = i + 1;
			var html = template( score );
			$hofEntries.append( html );
		}

		prevScene.hide();
		$( '#rankingScene' ).fadeIn();
	};

	return RankingScene;
});

