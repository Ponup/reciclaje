
define( [ 'data/context', 'scullge/scenes/base', 'actors/split/element', 'actors/split/container', 'engines/split', 'text!templates/scenes/split.html', 'data/items', 'data/containerType', 'data/containers', 'text!templates/scenes/brief/split.html' ], function( gaco, BaseScene, Element, Container, SplitEngine, tplHtml, dataItems, ContainerType, containersData, briefHtml )
{
	function SplitScene()
	{
		BaseScene.call( this );

		this.nonOrganicItems = dataItems.filter( function( item )
			{
				return ( item.container != ContainerType.ORGANIC );
			}
		);

		this.setId( 'split' );
	};

	SplitScene.prototype = new BaseScene();
	SplitScene.prototype.constructor = SplitScene;

	SplitScene.prototype.switchFrom = function( prevScene )
	{
		var self = this;

		document.title = 'Separá la basura - El juego del reciclaje';
		document.body.style.backgroundColor = '#2d3e50';

		gaco.audioManager.stopAll();
		gaco.audioManager.play( 'bgmusicGameplay', true );

		var $canvas = $( document.getElementById( 'canvas' ) );

		$canvas.empty().append( briefHtml );

		var $brief = $( document.getElementById( 'brief' ) );
		$brief.on( 'click', function()
			{
				$( this ).remove();

				$canvas.empty().append( tplHtml );
				
				gaco.engine = new SplitEngine();
				gaco.engine.init();

				self.setupContainers();

				gaco.engine.start();
			}
		);

		prevScene.hide();
		$brief.fadeIn();
	};

	SplitScene.prototype.setupContainers = function()
	{
		for( var i = 0; i < containersData.length; i++ )
		{
			var container = containersData[ i ];

			// Organic bin is not included in the bonus game.
			if( container.type == ContainerType.ORGANIC ) continue;

			var capacity = 0;
			for( var c = 0; c < this.nonOrganicItems.length; c++ )
			{
				capacity += ( this.nonOrganicItems[ c ].container == container.type ? 1 : 0 );
			}

			var properties = {
				name: container.name,
				type: container.type,
				position: i,
				capacity: capacity,
			};
			var actor = new Container( properties );
			actor.init();
			gaco.engine.addActor( actor );
		}
	};

	return SplitScene;
});

