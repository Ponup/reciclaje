
define( [ 'scullge/actor', 'actors/flashScore', 'TweenMax', 'data/context' ], function( BaseActor, FlashScoreActor, TweenMax, gaco )
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
						self.state = DisposableActorState.DEAD;
						var phmeter = gaco.engine.findActorById( 'phmeter' );
						var phLevel = Math.min( 10, Math.max( 0, phmeter.getProperty( 'phLevel' ) + self.properties.phDelta ) );
						phmeter.setProperty( 'phLevel', phLevel );

						var score = self.properties.phDelta;
						var actor = new FlashScoreActor( score );
						actor.setProperty( 'img', { style: { top: '160px', left: '460px' } } );
						actor.init();
					},
				});
			};

			conveyorBelt.appendChild( this.node );
		};

		DisposableActor.prototype.update = function()
		{
			switch( this.state )
			{
				case DisposableActorState.MOVING:
					this.properties.left += 3;
					if( this.properties.left > 1024 )
					{
						this.state = DisposableActorState.DEAD;
						gaco.engine.addDisposable();
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
					$( this.node ).remove();
					break;
			}
		};

		return DisposableActor;
	}
);

