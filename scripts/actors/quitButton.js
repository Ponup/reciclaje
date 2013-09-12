
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

			node.src = CONTEXT_PATH + '/images/bt_salir.png';
			node.style.position = 'absolute';
			node.style.top = '20px';
			node.style.left = '12px';
			node.style.cursor = 'pointer';

			$( node ).on( 'click', function()
				{
					gaco.engine.stop();
					gaco.sceneManager.switchTo( 'intro' );
				}
			);
			$( '.Scene' ).append( node );
		};

		return QuitButtonActor;
	}
);

