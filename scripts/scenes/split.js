
define( [ 'data/context', 'scullge/scenes/base', 'actors/split/element', 'actors/split/container', 'engines/split', 'text!templates/scenes/split.html', 'actors/split/analogClock', 'scullge/utils/arrays', 'data/items', 'data/containerType', 'data/containers', 'text!templates/scenes/brief/split.html' ], function( gaco, BaseScene, Element, Container, SplitEngine, tplHtml, AnalogClockActor, ArraysUtils, dataItems, ContainerType, containersData, briefHtml )
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

				self.start();
			}
		);

		prevScene.hide();
		$brief.fadeIn();
	};

	SplitScene.prototype.start = function()
	{
		gaco.gameVars = {
			score: 0,
			state: gaco.GameState.NEW_GAME,
			runId: null,
			speed: 3,
			remainingTime: 60,
			correctMovements: 0,
			currentLevel: 0,
			elementsAvailable: ArraysUtils.shuffle( this.nonOrganicItems.slice() ),
		};

		gaco.activeElement = null;

		$( '.Element' ).remove();

		gaco.engine.addUpdateListener( $.proxy( this.updateElements, this ) );
		gaco.engine.start();
	};

	SplitScene.prototype.updateElements = function()
	{
		gaco.gameVars.remainingTime++;

		switch( gaco.gameVars.state )
		{
			case gaco.GameState.NEW_GAME:
				this.setupContainers();
				var containers = gaco.engine.findActorsByType( 'Container' );
				for( var i = 0; i < containers.length; i++ )
				{
					containers[i].setFull( false );
					containers[i].properties.numElements = 0;
				}

				gaco.gameVars.state = gaco.GameState.WAITING_ELEMENT;
				break;
			case gaco.GameState.NEW_LEVEL:
				gaco.gameVars.currentLevel += 1;
				gaco.gameVars.remainingTime += 20;
				gaco.gameVars.speed *= 1.3;

				var containers = gaco.engine.findActorsByType( 'Container' );
				for( var i = 0; i < containers.length; i++ )
				{
					containers[ i ].setFull( false );
					containers[ i ].properties.numElements = 0;
				}

				gaco.gameVars.correctMovements = 0;
				gaco.gameVars.elementsAvailable = ArraysUtils.shuffle( this.nonOrganicItems.slice() );
				
				gaco.gameVars.state = gaco.GameState.WAITING_ELEMENT;
				break;
			case gaco.GameState.WAITING_ELEMENT:
				if( gaco.gameVars.elementsAvailable.length == 0 )
				{
					if( gaco.engine.canPassLevel() )
					{
						gaco.gameVars.state = gaco.GameState.NEW_LEVEL;
						return;
					}
					gaco.gameVars.state = gaco.GameState.GAME_OVER;
					return;
				}

				var elementId = 'element' + gaco.uniqueIndex++;
				var properties = gaco.gameVars.elementsAvailable.pop();
				var actor = new Element( elementId, properties );
				actor.init();
				gaco.engine.addActor( actor );
				gaco.activeElement = actor;

				gaco.gameVars.state = gaco.GameState.ELEMENT_MOVING;
				break;
			case gaco.GameState.GAME_OVER:
				gaco.engine.stop();
				gaco.sceneManager.switchTo( 'gameover' );
				break;
		}
	};

	SplitScene.prototype.setupContainers = function()
	{
		$( '.Container' ).remove();

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

			var elementId = 'container_' + container.name;
			var properties = {
				name: container.name,
				type: container.type,
				position: i,
				capacity: capacity,
			};

			var actor = new Container( elementId, properties );
			actor.init();
			gaco.engine.addActor( actor );
		}
	};

	return SplitScene;
});

