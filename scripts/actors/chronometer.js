
define( [ 'scullge/actor', 'data/context' ], function( BaseActor, gaco )
	{
		function Chronometer()
		{
			BaseActor.call( this );
		}

		Chronometer.prototype = new BaseActor();
		Chronometer.prototype.constructor = Chronometer;

		Chronometer.prototype.init = function()
		{
			BaseActor.prototype.init.call( this );

			this.node = document.createElement( 'div' );
			this.node.className = 'Chronometer';
			this.node.innerHTML = '0 <span style="color:#17bc99;font-size:.6em;">segundos</span>';

			var nodeStyle = this.node.style;
			nodeStyle.fontFamily = 'GameFont';
			nodeStyle.fontSize = '60px';
			nodeStyle.color = '#e94c3d';
			nodeStyle.textShadow = '0px 5px 0px rgba(0, 0, 0, .1)';
			nodeStyle.position = 'absolute';
			nodeStyle.left = '60px';
			nodeStyle.top = '680px';

			$( '.Scene' ).append( this.node );
		};

		Chronometer.prototype.redraw = function()
		{
			var html = parseInt( gaco.engine.getElapsedTime( true ), 10 ) + ' <span style="color:#17bc99;font-size:.6em;">segundos</span>';
			if( html.length < 11 )
			{
				html = ' ' + html;
			}
			this.node.innerHTML = html;
		};

		return Chronometer;
	}
);

