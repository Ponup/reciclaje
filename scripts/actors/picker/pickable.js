
define( [ 'scullge/actor', 'scullge/utils/dom', 'actors/flashScore', 'data/context' ], function( BaseActor, DomUtils, FlashScoreActor, gaco )
	{
		var PickableState = {
			STANDING: 	0,
			CLICKED: 	1,
			DEAD:		2,
		};

		function Pickable()
		{
			BaseActor.call( this );

			this.state = PickableState.STANDING;
		}

		Pickable.prototype = new BaseActor();
		Pickable.prototype.constructor = Pickable;

		Pickable.prototype.setElement = function( element )
		{
			this.element = element;
		};

		Pickable.prototype.init = function()
		{
			BaseActor.prototype.init.call( this );

			var self = this;

			this.img = document.createElement( 'img' );
			this.img.className = 'Pickable';
			this.img.src = CONTEXT_PATH + '/images/items/' + this.properties.data.name + '.png';
			this.img.style.left = this.properties.x + 'px';
			this.img.style.top = this.properties.y + 'px';
			this.img.style.width = ( ( this.properties.y > 500 ? 1.5 : 0.7 ) * 60 ) + 'px'; 
			this.img.style.width = ( this.getProperty( 'scale' ) * 60 ) + 'px'; 
			this.img.style.position = 'absolute';
			this.img.onclick = function()
			{
				var score = self.properties.data.scoring.picker[ gaco.finalSceneName ];

				self.img.onclick = function() {};
				gaco.gameVars.score += score;
				self.state = PickableState.CLICKED;

				if( score > 0 )
					gaco.audioManager.play( 'tap' );
				else
					gaco.audioManager.play( 'tapWrong' );

				var actor = new FlashScoreActor( score );
				actor.setProperty( 'img', self.img );
				actor.init();
				gaco.engine.addActor( actor );
			};
		
			$( '.Scene' ).append( this.img );
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
					$( this.img ).animate({ opacity: 0 }, 300, function()
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

