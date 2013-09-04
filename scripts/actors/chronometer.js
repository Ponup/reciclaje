
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
			this.node.innerHTML = '0 segundos';

			var nodeStyle = this.node.style;
			nodeStyle.fontFamily = 'GameFont';
			nodeStyle.fontSize = '40px';
			nodeStyle.color = '#fce94f';
			nodeStyle.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.3)';
			nodeStyle.position = 'absolute';
			nodeStyle.left = '40px';
			nodeStyle.top = '680px';

			picker.appendChild( this.node );
		};

		Chronometer.prototype.redraw = function()
		{
			var html = parseInt( gaco.engine.context.seconds, 10 ) + ' segundos';
			if( html.length < 11 )
			{
				html = ' ' + html;
			}
			this.node.innerHTML = html;
		};

		return Chronometer;
	}
);

