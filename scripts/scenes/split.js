
define( [ 'game/context', 'scullge/scene', 'actors/element', 'actors/container', 'actors/statspanel', 'scullge/engine', 'text!templates/scenes/split.html', 'game/scores', 'actors/clock', 'utils/arrays' ], function( gaco, Scene, Element, Container, StatsPanel, GameEngine, tplHtml, Scores, ClockActor, ArraysUtils )
{
	function SplitScene()
	{
		Scene.call( this );

		this.setId( 'split' );
	};

	SplitScene.prototype = new Scene();

	SplitScene.prototype.switchFrom = function( prevScene )
	{
		prevScene.hide();

		$( '#canvas' ).empty();
		$( '#canvas' ).append( $( tplHtml) );
		
		gaco.gameEngine = new GameEngine();

		this.start();
	};

	SplitScene.prototype.start = function()
	{
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

		gaco.gameEngine.addUpdateListener( $.proxy( this.updateElements, this ) );
		gaco.gameEngine.addActor( new StatsPanel() );
		gaco.gameEngine.addActor( new ClockActor() );
		gaco.gameEngine.start();
	};

	SplitScene.prototype.newLevel = function( level )
	{
		gaco.gameVars = $.extend({}, gaco.gameVars, {
			remainingTime: 60,
			startTime: Date.now(),
			elapsedSeconds: 0,
			correctMovements: 0,
			currentLevel: level,
			elementsAvailable: ArraysUtils.shuffle( gaco.elements.slice() ),
		});
	};

	SplitScene.prototype.updateElements = function()
	{
		gaco.gameVars.remainingTime++;
		gaco.gameVars.elapsedSeconds = parseInt( ( Date.now() - gaco.gameVars.startTime ) / 1000 );

		switch( gaco.gameVars.state )
		{
			case gaco.GameState.NEW_GAME:
				var $gameplay = $( '#gameplay' );
				this.setupContainers( $gameplay );
						var containers = gaco.gameEngine.findActorsByType( 'Container' );
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
				var containers = gaco.gameEngine.findActorsByType( 'Container' );
				for( var i = 0; i < containers.length; i++ )
				{
					containers[i].setFull( false );
					containers[i].properties.numElements = 0;
				}
				gaco.gameVars.correctMovements = 0;
				gaco.gameVars.elementsAvailable = ArraysUtils.shuffle( gaco.elements.slice() );
				
				gaco.gameVars.state = gaco.GameState.WAITING_ELEMENT;
				break;
			case gaco.GameState.WAITING_ELEMENT:
				if( gaco.gameVars.elementsAvailable.length == 0 )
				{
					if( gaco.canPassLevel() )
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
				gaco.gameEngine.addActor( actor );
				gaco.activeElement = actor;

				gaco.gameVars.state = gaco.GameState.ELEMENT_MOVING;
				break;
			case gaco.GameState.GAME_OVER:
				gaco.gameEngine.stop();

				$( '#gameplay' ).hide();

				var score = {
					player: {
						name: localStorage.getItem( 'playerName' ),
					},
					game: {
						score: gaco.gameVars.score,
						level: gaco.gameVars.currentLevel + 1,
						datetime: new Date(),
					},
				};
				Scores.save( score );

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
			gaco.gameEngine.addActor( actor );
		}
	};

	return SplitScene;
});

