
define( [ 'scullge/actor', 'actors/flashScore', 'TweenMax', 'data/containerType', 'data/context' ], function( BaseActor, FlashScoreActor, TweenMax, ContainerType, gaco )
	{
		var DisposableActorState = {
			MOVING: 0,
			ANIMATING: 1,
			DEAD: 2,
		};

		function DisposableActor()
		{
			BaseActor.call( this );

			this.properties.left = -60;
			this.state = DisposableActorState.MOVING;
		}

		DisposableActor.prototype = new BaseActor();
		DisposableActor.prototype.constructor = DisposableActor;

		DisposableActor.prototype.init = function()
		{
			BaseActor.prototype.init.call( this );

			var self = this;
			this.node = document.createElement( 'img' );
			this.node.className = 'Disposable';
			this.node.style.position = 'absolute';
			this.node.style.width = '100px';
			this.node.style.height = '100px';
			this.node.style.bottom = '180px';
			this.node.style.left = '-60px';
			this.node.src = CONTEXT_PATH + '/images/items/' + this.properties.image + '.png';
			this.node.onclick = function()
			{
				self.state = DisposableActorState.ANIMATING;

				TweenMax.to( this, 1, {
					css:
					{
						bezier:
						{
							type: "soft",
							values:
							[
								{ top: 0, left: parseInt( this.style.left ), alpha: 1 },
								{ top: 120, left: 460, alpha: 0.3 },
							], autoRotate: false
						}
					},
					ease: Power1.easeInOut,
					onComplete: function()
					{
						var phDelta = self.properties.phDelta,
							score = null;
						if( self.properties.data.container === ContainerType.ORGANIC )
						{
							gaco.gameVars.phLevel += phDelta;
							score = Math.abs( phDelta ); // Organic items always add up.

							if( gaco.gameVars.phLevel < 0 )
								gaco.gameVars.phLevel = 0;
							else if( gaco.gameVars.phLevel > 13 )
								gaco.gameVars.phLevel = 13;
						}
						else
						{
							score = -1;
						}

						gaco.gameVars.score += score;

						gaco.audioManager.play( score > 0 ? 'tap' : 'tapWrong' );

						self.state = DisposableActorState.DEAD;

						var actor = new FlashScoreActor( score );
						actor.setProperty( 'img', { style: { top: '160px', left: '460px' } } );
						actor.init();
					},
				});
			};

			$( '.Scene' ).append( this.node );
		};

		DisposableActor.prototype.update = function()
		{
			switch( this.state )
			{
				case DisposableActorState.MOVING:
					this.properties.left += 2;
					if( this.properties.left > 1024 )
					{
						this.state = DisposableActorState.DEAD;
					}
					break;
			}
		};

		DisposableActor.prototype.redraw = function()
		{
			switch( this.state )
			{
				case DisposableActorState.MOVING:
					this.node.style.left = this.properties.left + 'px';
					break;
				case DisposableActorState.DEAD:
					this.active = false;
					$( this.node ).remove();
					break;
			}
		};

		return DisposableActor;
	}
);

