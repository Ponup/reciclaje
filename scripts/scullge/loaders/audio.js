
define( function()
{
	function AudioLoader()
	{
		this.audios = {};
	}

	AudioLoader.prototype.load = function( name, path )
	{
		var audio = new Audio( path );
		audio.load();

		this.audios[ name ] = audio;
	};

	AudioLoader.prototype.play = function( name, inLoop )
	{
		if( 'undefined' === typeof( this.audios[ name ] ) )
		{
			throw 'Audio was not loaded: ' + name;
		}

		var audio = this.audios[ name ];

		if( 'undefined' !== typeof( inLoop ) )
		{
			if( 'boolean' === typeof( audio.loop ) )
			{
				    audio.loop = inLoop;
			}
			else
			{
				audio.addEventListener( 'ended', function()
					{
						this.currentTime = 0;
						this.play();
					}, false
				);
			}
		}

		audio.play();

		return audio;
	};

	return AudioLoader;
});

