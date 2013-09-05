
define( [ 'scullge/engine', 'data/containerType', 'actors/statspanel', 'actors/analogClock', 'data/context' ], function( BaseEngine, ContainerType, StatsPanelActor, AnalogClockActor, gaco )
	{
		function SplitEngine()
		{
			BaseEngine.call( this );

			this.context.currentLevel = 1;

			this.addActor( new StatsPanelActor() );
			this.addActor( new AnalogClockActor() );
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

			gaco.gameVars = null;

			gaco.levels =
			[
				{ minCorrectMovements: 3 },
				{ minCorrectMovements: 4 },
				{ minCorrectMovements: 5 },
				{ minCorrectMovements: 6 },
				{ minCorrectMovements: 7 },
				{ minCorrectMovements: 8 },
				{ minCorrectMovements: 9 },
				{ minCorrectMovements: 10 },
				{ minCorrectMovements: 11 },
				{ minCorrectMovements: 12 },
			];

			gaco.containers = [
				{ name: 'papel', type: ContainerType.PAPER },
				{ name: 'plastico', type: ContainerType.PLASTIC },
				{ name: 'vidrio', type: ContainerType.GLASS },
			];

			gaco.uniqueIndex = 0;

			gaco.activeElement = null;

			gaco.audioManager.load( 'introMusic', CONTEXT_PATH + '/sounds/music.mp3' );
			gaco.audioManager.load( 'helpMusic', CONTEXT_PATH + '/sounds/level-start.mp3' );
			gaco.audioManager.load( 'gameWin', CONTEXT_PATH + '/sounds/game-win.mp3' );
			gaco.audioManager.load( 'gameLose', CONTEXT_PATH + '/sounds/gameover.mp3' ); 
			gaco.audioManager.load( 'tap', CONTEXT_PATH + '/sounds/tap.mp3' );
			gaco.audioManager.load( 'tapWrong', CONTEXT_PATH + '/sounds/tap-wrong.mp3' );
		};

		SplitEngine.prototype.canPassLevel = function()
		{
			var minCorrectMovements = gaco.gameVars.currentLevel in gaco.levels ? gaco.levels[ gaco.gameVars.currentLevel ].minCorrectMovements : 7;
			return gaco.gameVars.correctMovements > minCorrectMovements;
		}

		return SplitEngine;
	}
);

