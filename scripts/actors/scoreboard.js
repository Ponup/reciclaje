
define( [ 'scullge/actor', 'data/context' ], function( BaseActor, gaco )
	{
		function ScoreBoardActor()
		{
			BaseActor.call( this );

			this.node = null;
		}

		ScoreBoardActor.prototype = new BaseActor();
		ScoreBoardActor.prototype.constructor = ScoreBoardActor;

		ScoreBoardActor.prototype.init = function()
		{
			BaseActor.prototype.init.call( this );

			this.node = document.createElement( 'div' );
			this.node.className = 'ScoreBoard';

			var style = this.node.style;
			style.fontFamily = 'GameFont';
			style.fontSize = '60px';
			style.color = '#58aee5';
			style.textShadow = '0px 5px 0px rgba(0, 0, 0, .1)';
			style.position = 'absolute';
			style.right = '60px';
			style.top = '680px';
			style.zIndex = 12;

			this.update();
			this.redraw();

			$( '.Scene' ).append( this.node );
		};

		ScoreBoardActor.prototype.update = function()
		{
			this.score = gaco.gameVars.score;
		};

		ScoreBoardActor.prototype.redraw = function()
		{
			this.node.innerHTML = this.score + ' <span style="color: #17bc99; font-size: .6em;">puntos</span>';
		};

		return ScoreBoardActor;
	}
);

