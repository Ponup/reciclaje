
define( [ 'data/context', 'scullge/scenes/base', 'actors/element', 'actors/container', 'engines/split', 'text!templates/scenes/split.html', 'actors/analogClock', 'scullge/utils/arrays', 'data/items' ], function( gaco, BaseScene, Element, Container, SplitEngine, tplHtml, AnalogClockActor, ArraysUtils, dataItems )
{
	function SplitScene()
	{
		BaseScene.call( this );

		this.setId( 'split' );
	};

	SplitScene.prototype = new BaseScene();

	SplitScene.prototype.switchFrom = function( prevScene )
	{
		var self = this;

		document.title = 'Separá la basura - El juego del reciclaje';
		document.body.style.backgroundColor = '#2d3e50';

		prevScene.hide();

		var introImg = document.createElement( 'img' );
		introImg.src = CONTEXT_PATH + '/images/scenes/brief/brief_bonus_titulo.png';
		var style = introImg.style;
		style.position = 'absolute';
		style.top = style.left = '0px';
		style.zIndex = 5;

		$( '#canvas' ).empty().append( introImg );

		$( introImg ).on( 'click', function()
			{
				$( this ).remove();

				$( '#canvas' ).empty().append( $( tplHtml ) );
				
				gaco.engine = new SplitEngine();
				self.start();
			}
		);
	};

	SplitScene.prototype.start = function()
	{
		gaco.engine.init();

		gaco.gameVars = {
			score: 0,
			state: gaco.GameState.NEW_GAME,
			runId: null,
			speed: 3,
		};
		this.newLevel( 0 );
		gaco.activeElement = null;

		var $gameplay = $( '#gameplay' );
		$( '.Element' ).remove();

		$gameplay.fadeIn();

		gaco.engine.addUpdateListener( $.proxy( this.updateElements, this ) );
		gaco.engine.start();
	};

	SplitScene.prototype.newLevel = function( level )
	{
		gaco.gameVars = $.extend({}, gaco.gameVars, {
			remainingTime: 60,
			correctMovements: 0,
			currentLevel: level,
			elementsAvailable: ArraysUtils.shuffle( dataItems.slice() ),
		});
	};

	SplitScene.prototype.updateElements = function()
	{
		gaco.gameVars.remainingTime++;

		switch( gaco.gameVars.state )
		{
			case gaco.GameState.NEW_GAME:
				var $gameplay = $( '#gameplay' );
				this.setupContainers( $gameplay );
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
				$( '<div style="width: 300px; height: 200px; margin: 0px auto; position: absolute; font-size: xx-large; text-align: center; z-index: 99999;">Nivel: ' + gaco.gameVars.currentLevel + '</div>' ).fadeIn('fast').delay(2000).fadeOut();
				var containers = gaco.engine.findActorsByType( 'Container' );
				for( var i = 0; i < containers.length; i++ )
				{
					containers[i].setFull( false );
					containers[i].properties.numElements = 0;
				}
				gaco.gameVars.correctMovements = 0;
				gaco.gameVars.elementsAvailable = ArraysUtils.shuffle( dataItems.slice() );
				
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

				$( '#gameplay' ).hide();

				gaco.sceneManager.switchTo( 'gameover' );
				break;
		}
	};

	SplitScene.prototype.setupContainers = function( $gameplay )
	{
		$( '.Container' ).remove();

		for( var i = 0; i < gaco.containers.length; i++ )
		{
			var container = gaco.containers[i];
			var elementId = 'container_' + container.name;
			var properties = {
				name: container.name,
				type: container.type,
				position: i,
			};
			var actor = new Container( elementId, properties );
			actor.init();
			gaco.engine.addActor( actor );
		}
	};

	return SplitScene;
});

