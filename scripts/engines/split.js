
define( [ 'scullge/engine', 'data/containerType', 'actors/split/statspanel', 'actors/split/element', 'actors/split/analogClock', 'actors/quitButton', 'scullge/utils/arrays', 'data/items', 'data/context' ], function( BaseEngine, ContainerType, StatsPanelActor, ElementActor, AnalogClockActor, QuitButtonActor, ArraysUtils, dataItems, gaco )
	{
		function SplitEngine()
		{
			BaseEngine.call( this );

			this.nonOrganicItems = dataItems.filter( function( item )
				{
					return ( item.container != ContainerType.ORGANIC );
				}
			);
		}

		SplitEngine.prototype = new BaseEngine();
		SplitEngine.prototype.constructor = SplitEngine;

		SplitEngine.prototype.init = function()
		{
			BaseEngine.prototype.init.call( this );

			gaco.GameState = {
				NEW_GAME		:0,
				NEW_LEVEL 		:1,
				WAITING_ELEMENT		:2,
				ELEMENT_MOVING		:3,
				LEVEL_END		:4,
				GAME_OVER		:5,
			};

			gaco.activeElement = null;

			gaco.gameVars = {
				score: 0,
				state: gaco.GameState.WAITING_ELEMENT,
				speed: 3,
				correctMovements: 0,
				currentLevel: 0,
				elementsAvailable: ArraysUtils.shuffle( this.nonOrganicItems.slice() ),
			};

			this.addActor( new StatsPanelActor() );
			this.addActor( new AnalogClockActor() );
			this.addActor( new QuitButtonActor() );
			this.initActors();

			this.addUpdateListener( $.proxy( this.updateElements, this ) );
		};

		SplitEngine.prototype.canPassLevel = function()
		{
			return ( gaco.gameVars.correctMovements >= 8 );
		}

		SplitEngine.prototype.updateElements = function()
		{
			switch( gaco.gameVars.state )
			{
				case gaco.GameState.WAITING_ELEMENT:
					if( this.canPassLevel() )
					{
						gaco.gameVars.state = gaco.GameState.NEW_LEVEL;
						return;
					}

					if( gaco.gameVars.elementsAvailable.length == 0 )
					{
						gaco.gameVars.state = gaco.GameState.GAME_OVER;
						return;
					}

					var properties = gaco.gameVars.elementsAvailable.pop();
					var actor = new ElementActor( properties );
					actor.init();
					this.addActor( actor );
					gaco.activeElement = actor;

					gaco.gameVars.state = gaco.GameState.ELEMENT_MOVING;
					break;
				case gaco.GameState.NEW_LEVEL:
					gaco.gameVars.currentLevel += 1;
					gaco.gameVars.speed *= 1.3;
					gaco.gameVars.correctMovements = 0;
					gaco.gameVars.elementsAvailable = ArraysUtils.shuffle( this.nonOrganicItems.slice() );

					gaco.engine.findActorById( 'nivelometro' ).reset();
					
					var containers = this.findActorsByType( 'Container' );
					for( var i = 0; i < containers.length; i++ )
					{
						containers[ i ].setFull( false );
						containers[ i ].properties.numElements = 0;
					}

					gaco.gameVars.state = gaco.GameState.WAITING_ELEMENT;
					break;
				case gaco.GameState.GAME_OVER:
					this.stop();
					gaco.sceneManager.switchTo( 'gameover' );
					break;
			}
		};

		return SplitEngine;
	}
);

