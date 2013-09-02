
define( [ 'scullge/actor', 'game/context' ], function( BaseActor, gaco )
	{
		var Actor3State = {
			MOVING: 0,
			ANIMATING: 1,
			DEAD: 2,
		};
		function Actor3()
		{
			BaseActor.call( this );

			this.properties.left = -60;
			this.state = Actor3State.MOVING;
		}

		Actor3.prototype = new BaseActor();
		Actor3.prototype.constructor = Actor3;

		Actor3.prototype.init = function()
		{
			var self = this;
			this.node = document.createElement( 'img' );
			this.node.className = 'Actor3';
			this.node.style.position = 'absolute';
			this.node.style.width = '100px';
			this.node.style.height = '100px';
			this.node.style.top = '480px';
			this.node.style.left = '-60px';
			this.node.src = CONTEXT_PATH + '/images/items/' + this.properties.image + '.png';
			this.node.onclick = function()
			{
				self.state = Actor3State.ANIMATING;
				$( this ).animate({ top: 0, left: 410 }, 450 ).delay( 300 )
					.animate({ top: 230, left: 460, width: 0, height: 0, opacity: 30 }, 300, function()
						{
							self.state = Actor3State.DEAD;
							var phmeter = gaco.engine.findActorById( 'phmeter' );
							phmeter.setProperty( 'phLevel', phmeter.getProperty( 'phLevel' ) + 1 );
						}
					);
			};
			conveyorBelt.appendChild( this.node );
		};

		Actor3.prototype.update = function()
		{
			switch( this.state )
			{
				case Actor3State.MOVING:
					this.properties.left += 3;
					break;
			}
		};

		Actor3.prototype.redraw = function()
		{
			switch( this.state )
			{
				case Actor3State.MOVING:
					this.node.style.left = this.properties.left + 'px';
					break;
				case Actor3State.DEAD:
					this.node.style.display = 'none';
					break;
			}
		};

		return Actor3;
	}
);

