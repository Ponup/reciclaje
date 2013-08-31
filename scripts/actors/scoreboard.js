
define(
	[ 'scullge/actor', 'game/context' ],
	function( BaseActor, gaco )
	{
		function ScoreBoard()
		{
			BaseActor.call( this );
		}

		ScoreBoard.prototype = new BaseActor();
		ScoreBoard.prototype.constructor = ScoreBoard;

		ScoreBoard.prototype.init = function()
		{
			this.node = document.createElement( 'div' );
			this.node.className = 'ScoreBoard';

			var style = this.node.style;
			style.fontFamily = 'GameFont';
			style.fontSize = '40px';
			style.color = '#fce94f';
			style.textShadow = '1px 1px 1px rgba(0, 0, 0, 0.3)';
			style.position = 'absolute';
			style.right = '40px';
			style.top = '680px';

			picker.appendChild( this.node );
		};

		ScoreBoard.prototype.update = function()
		{

		};

		ScoreBoard.prototype.redraw = function()
		{
			this.node.innerHTML = gaco.score + '/100 puntos';
		};

		return ScoreBoard;
	}
);

