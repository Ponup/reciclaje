
define( function()
{
	function AudioManager()
	{
		this.audios = {};
	}

	AudioManager.prototype.load = function( name, path )
	{
		var audio = new Audio( path );
		audio.load();

		this.audios[ name ] = audio;
	};

	AudioManager.prototype.play = function( name )
	{
		if( 'undefined' === typeof( this.audios[ name ] ) )
		{
			throw 'Audio was not loaded: ' + name;
		}

		this.audios[ name ].play();
		return this.audios[ name ];
	};

	return AudioManager;
});

