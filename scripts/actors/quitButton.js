
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
			var node = document.createElement( 'img' );
			node.src = 'images/bt_salir.png';
			node.style.cssText = 'position: absolute; top: 20px; left: 12px;';
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

