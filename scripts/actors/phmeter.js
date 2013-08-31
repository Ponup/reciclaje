
define( [ 'scullge/actor' ], function( BaseActor )
	{
		function Phmeter()
		{
			BaseActor.call( this );

			this.setId( 'phmeter' );
			this.setProperty( 'phLevel', 0 );
		}

		Phmeter.prototype = new BaseActor();
		Phmeter.prototype.constructor = Phmeter;

		Phmeter.prototype.init = function()
		{
			this.node = document.createElement( 'div' );
			this.node.className = 'Phmeter';
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
			this.node.style.backgroundPosition = -( this.properties.phLevel * 207 ) + 'px 0px';
		};

		return Phmeter;
	}
);

