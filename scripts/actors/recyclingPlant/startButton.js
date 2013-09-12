
define( [ 'scullge/actor', 'data/context' ], function( BaseActor, gaco )
	{
		function QuitButtonActor()
		{
			BaseActor.call( this );
		}

		QuitButtonActor.prototype = new BaseActor();
		QuitButtonActor.prototype.constructor = QuitButtonActor;

		QuitButtonActor.prototype.init = function()
		{
			BaseActor.prototype.init.call( this );

			var node = document.createElement( 'img' );

			node.src = CONTEXT_PATH + '/images/actors/recyclingPlant/start.png';
			node.id = 'startRecyclingButton';
			node.style.position = 'absolute';
			node.style.bottom = '0px';
			node.style.cursor = 'pointer';
			node.style.zIndex = 10;

			$( node ).on( 'click', function()
				{
					gaco.numTries++;
					gaco.engine.updateGameStatus();

					var img = this;
					this.src = CONTEXT_PATH + '/images/actors/recyclingPlant/processing.png';
					$( node ).effect( 'shake','left', 5, 5,1000);
					setTimeout( function() {
						if( gaco.hasWin )
						{
							gaco.engine.stop();
							img.src = CONTEXT_PATH + '/images/actors/recyclingPlant/ok.png';

							setTimeout( function() {
								gaco.sceneManager.switchTo( 'gameover' );
							}, 1000 );
						}
						else
						{
							img.src = CONTEXT_PATH + '/images/actors/recyclingPlant/ko.png';
							$( node ).effect( 'shake', 100);
							setTimeout( function() {
								if( gaco.numTries > 2 )
								{
									gaco.engine.stop();
									gaco.sceneManager.switchTo( 'gameover' );
								}
								else
								{
									img.src = CONTEXT_PATH + '/images/actors/recyclingPlant/start.png';
								}
							}, 2000 );
						}
					}, 2000 );
				}
			);

			$( '.Scene' ).append( node );
		};

		return QuitButtonActor;
	}
);

