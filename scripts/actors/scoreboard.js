
define(
	[ 'actors/base', 'game/context' ],
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

