
define( [ 'scullge/actor', 'data/context' ], function( BaseActor, gaco )
	{
		function ScoreBoard()
		{
			BaseActor.call( this );
		}

		ScoreBoard.prototype = new BaseActor();
		ScoreBoard.prototype.constructor = ScoreBoard;

		ScoreBoard.prototype.init = function()
		{
			BaseActor.prototype.init.call( this );

			this.node = document.createElement( 'div' );
			this.node.className = 'ScoreBoard';
			this.node.innerHTML = '0 <span style="color:#17bc99;font-size:.6em;">puntos</span>';

			var style = this.node.style;
			style.fontFamily = 'GameFont';
			style.fontSize = '60px';
			style.color = '#58aee5';
			style.textShadow = '0px 5px 0px rgba(0, 0, 0, .1)';
			style.position = 'absolute';
			style.right = '60px';
			style.top = '680px';
			style.zIndex = 10;

			$( '.Scene' ).append( this.node );
		};

		ScoreBoard.prototype.update = function()
		{
		};

		ScoreBoard.prototype.redraw = function()
		{
			this.node.innerHTML = gaco.gameVars.score + ' <span style="color:#17bc99;font-size:.6em;">puntos</span>';
		};

		return ScoreBoard;
	}
);

