
define( [ 'scullge/actor', 'data/context' ], function( BaseActor, gaco )
	{
		function Phmeter()
		{
			BaseActor.call( this );

			this.setId( 'phmeter' );
		}

		Phmeter.prototype = new BaseActor();
		Phmeter.prototype.constructor = Phmeter;

		Phmeter.prototype.init = function()
		{
			this.node = document.createElement( 'div' );
			this.node.className = 'Phmeter';
			this.node.style.position = 'absolute';
			this.node.style.left = '25px';
			this.node.style.top = '90px';
			this.node.style.width = '200px';
			this.node.style.height = '400px';
			this.node.style.background = 'url(images/actors/phmeter.png) no-repeat';
			conveyorBelt.appendChild( this.node );
		};

		Phmeter.prototype.update = function()
		{
		};

		Phmeter.prototype.redraw = function()
		{
			this.node.style.backgroundPosition = -( gaco.gameVars.phLevel * 207 ) + 'px 0px';
		};

		return Phmeter;
	}
);

