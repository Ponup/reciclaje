
define( [ 'scullge/actor', 'data/context' ], function( BaseActor, gaco )
	{
		function ChronometerActor()
		{
			BaseActor.call( this );

			this.seconds = null;
		}

		ChronometerActor.prototype = new BaseActor();
		ChronometerActor.prototype.constructor = ChronometerActor;

		ChronometerActor.prototype.init = function()
		{
			BaseActor.prototype.init.call( this );

			this.node = document.createElement( 'div' );

			this.update();
			this.redraw();

			var nodeStyle = this.node.style;
			nodeStyle.fontFamily = 'GameFont';
			nodeStyle.fontSize = '60px';
			nodeStyle.color = '#e94c3d';
			nodeStyle.textShadow = '0px 5px 0px rgba(0, 0, 0, .1)';
			nodeStyle.position = 'absolute';
			nodeStyle.left = '60px';
			nodeStyle.top = '680px';
			nodeStyle.zIndex = 12;

			$( '.Scene' ).append( this.node );
		};

		ChronometerActor.prototype.update = function()
		{
			this.seconds = gaco.engine.MAX_SECONDS - parseInt( gaco.engine.getElapsedTime( true ), 10 );
		};

		ChronometerActor.prototype.redraw = function()
		{
			var html = this.seconds + ' <span style="color: #17bc99; font-size: .6em;">segundos</span>';
			if( this.seconds < 10 )
			{
				html = ' ' + html;
			}
			this.node.innerHTML = html;
		};

		return ChronometerActor;
	}
);

