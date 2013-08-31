
define( [ 'handlebars', 'game/context', 'scenes/base', 'game/scores', 'text!templates/halloffame.html' ], function( Handlebars, gaco, Scene, Scores, hofHtml )
{
	function HalloffameScene()
	{
		Scene.call( this );

		this.setId( 'halloffame' );
	}

	HalloffameScene.prototype = new Scene();

	HalloffameScene.prototype.switchFrom = function( prevScene )
	{
		prevScene.hide();

		$( '#canvas' ).empty();
		$( '#canvas' ).append( $( hofHtml ) );

		$( '#gotoIntro' ).on( 'click', function( ev )
			{
				gaco.sceneManager.switchTo( 'welcome' );
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

		$( '#halloffame' ).fadeIn();
	};

	return HalloffameScene;
});

