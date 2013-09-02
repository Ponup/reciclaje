
define( [ 'scullge/actor', 'utils/dom', 'game/context' ], function( Actor, DomUtils, gaco )
	{
		var PickableState = {
			STANDING: 	0,
			CLICKED: 	1,
			DEAD:		2,
		};

		function Pickable()
		{
			Actor.call( this );

			this.state = PickableState.STANDING;
		}

		Pickable.prototype = new Actor();
		Pickable.prototype.constructor = Pickable;

		Pickable.prototype.setElement = function( element )
		{
			this.element = element;
		};

		Pickable.prototype.init = function()
		{
			var self = this;

			this.img = document.createElement( 'img' );
			this.img.className = 'Element';
			this.img.src = CONTEXT_PATH + '/images/items/' + this.properties.data.name + '.png';
			this.img.style.left = this.properties.x + 'px';
			this.img.style.top = this.properties.y + 'px';
			this.img.style.width = ( ( this.properties.y > 500 ? 1.5 : 0.7 ) * 60 ) + 'px'; 
			this.img.style.width = ( this.getProperty( 'scale' ) * 60 ) + 'px'; 
			this.img.style.position = 'absolute';

			this.img.onclick = function()
			{
				self.img.onclick = function() {};
				gaco.score += ( self.properties.data.correct ? +10 : -5 );
				self.state = PickableState.CLICKED;
			};
			picker.appendChild( this.img );
		};
		
		Pickable.prototype.setPosition = function( position )
		{
			this.position = position;
		};

		Pickable.prototype.redraw = function()
		{
			var self = this;

			switch( this.state )
			{
				case PickableState.STANDING:
					this.img.style.left = this.properties.x + 'px';
					this.img.style.top = this.properties.y + 'px';
					break;
				case PickableState.CLICKED:
					$( this.img ).animate({ opacity: 0 }, 100, function()
						{
							self.state = PickableState.DEAD;
					});
					break;
				case PickableState.DEAD:
					DomUtils.removeNode( this.img );
					break;
			}
		};

		return Pickable;
	}
);

