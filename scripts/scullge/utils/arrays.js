
define( function()
	{
		function Arrays()
		{
		}

		Arrays.shuffle = function( o )
		{
			for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		};

		Arrays.randomItem = function( array )
		{
			if( array.length == 0 )
			{
				return null;
			}

			var randomIndex = parseInt( Math.random() * array.length, 10 );
			return array[ randomIndex ];
		};
	
		return Arrays;
	}
);

