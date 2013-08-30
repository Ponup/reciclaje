
define( [ 'actors/base' ], function( BaseActor )
	{
		function Chronometer()
		{
			BaseActor.call( this );

			this.seconds = 0;
		}

		Chronometer.prototype = new BaseActor();
		Chronometer.prototype.constructor = Chronometer;

		Chronometer.prototype.init = function()
		{
			this.node = document.createElement( 'div' );
			this.node.className = 'Chronometer';
			picker.appendChild( this.node );

			this.initTime = Date.now();
		};

		Chronometer.prototype.update = function()
		{
			this.seconds = ( Date.now() - this.initTime ) / 1000;
		};

		Chronometer.prototype.redraw = function()
		{
			var html = parseInt( this.seconds, 10 ) + ' segundos';
			if( html.length < 11 )
			{
				html = ' ' + html;
			}
			this.node.innerHTML = html;
		};

		return Chronometer;
	}
);

