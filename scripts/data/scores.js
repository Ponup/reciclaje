
define( function()
	{
		function Scores()
		{
		}

		Scores.list = function( limit )
		{
			var jsonScores = localStorage.getItem( 'scores' );
			if( null === jsonScores )
			{
				return [];
			}

			var scores = JSON.parse( jsonScores );
			if( 'number' == typeof limit )
			{
				return scores.slice( 0, limit );
			}

			return scores;
		};

		Scores.save = function( score )
		{
			var scores = localStorage.getItem( 'scores' );
			scores = ( null === scores ? [] : JSON.parse( scores ) );
			scores.push( score );
			scores.sort( function( a, b )
				{

					if( a.game.score > b.game.score )
						return -1;
					if( a.game.score < b.game.score )
						return 1;
					return 0;
				}
			);
			localStorage.setItem( 'scores', JSON.stringify( scores ) );
		};

		return Scores;
	}
);

