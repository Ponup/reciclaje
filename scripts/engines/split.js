
define( [ 'scullge/engine', 'game/audiomanager', 'game/context' ], function( Engine, AudioManager, gaco )
	{
		function SplitEngine()
		{
			this.context.currentLevel = 1;
		}

		SplitEngine.prototype = new Engine();
		SplitEngine.prototype.constructor = SplitEngine;

		SplitEngine.prototype.init = function()
		{
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

			gaco.ContainerType = {
				PLASTIC: 0,
				PAPER: 1,
				GLASS: 2,
			};
				
			gaco.containers = [
				{ name: 'papel', type: gaco.ContainerType.PAPER },
				{ name: 'plastico', type: gaco.ContainerType.PLASTIC },
				{ name: 'vidrio', type: gaco.ContainerType.GLASS },
			];

			gaco.elements = [
				{ name: 'bolsa', containerType: gaco.ContainerType.PLASTIC },
				{ name: 'botella_plastico', containerType: gaco.ContainerType.PLASTIC },
				{ name: 'botella_vidrio', containerType: gaco.ContainerType.GLASS },
				{ name: 'botella_vidrio_rota', containerType: gaco.ContainerType.GLASS },
				{ name: 'caja_carton', containerType: gaco.ContainerType.PAPER },
				{ name: 'carta', containerType: gaco.ContainerType.PAPER },
				{ name: 'cd', containerType: gaco.ContainerType.PLASTICO },
				{ name: 'copa', containerType: gaco.ContainerType.GLASS },
				{ name: 'detergente', containerType: gaco.ContainerType.PLASTIC },
				{ name: 'jarra_vidrio', containerType: gaco.ContainerType.GLASS },
				{ name: 'libro', containerType: gaco.ContainerType.PAPER },
				{ name: 'papel', containerType: gaco.ContainerType.PAPER },
				{ name: 'revista', containerType: gaco.ContainerType.PAPER },
				{ name: 'tupper', containerType: gaco.ContainerType.PLASTIC },
				{ name: 'vaso', containerType: gaco.ContainerType.GLASS },
			];

			gaco.uniqueIndex = 0;

			gaco.activeElement = null;

			gaco.audioManager = new AudioManager();
			gaco.audioManager.load( 'introMusic', CONTEXT_PATH + '/sounds/music.mp3' );
			gaco.audioManager.load( 'helpMusic', CONTEXT_PATH + '/sounds/level-start.mp3' );
			gaco.audioManager.load( 'gameWin', CONTEXT_PATH + '/sounds/game-win.mp3' );
			gaco.audioManager.load( 'gameLose', CONTEXT_PATH + '/sounds/gameover.mp3' ); 
			gaco.audioManager.load( 'tap', CONTEXT_PATH + '/sounds/tap.mp3' );
			gaco.audioManager.load( 'tapWrong', CONTEXT_PATH + '/sounds/tap-wrong.mp3' );
		};

		return SplitEngine;
	}
);

