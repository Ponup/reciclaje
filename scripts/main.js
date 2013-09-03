
require.config({
	baseUrl: CONTEXT_PATH + '/scripts',
	paths: {
		jquery: 'jquery-1.10.2.min',
	},
	shim: {
		handlebars: { exports: 'Handlebars' },
	},
	urlArgs: 'bust=' + Date.now(),
});

var dependencies = [
	'jquery',
	'game/context',
	'game/audiomanager',
	'scenes/manager',
	'scenes/intro',
	'scenes/ranking',
	'scenes/gameover',
];

require( dependencies, 
	function( $, gaco, AudioManager, SceneManager, IntroScene, RankingScene, GameoverScene )
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

		gaco.uniqueIndex = 0;

		gaco.activeElement = null;

                gaco.audioManager = new AudioManager();
                gaco.audioManager.load( 'introMusic', CONTEXT_PATH + '/sounds/music.mp3' );
                gaco.audioManager.load( 'helpMusic', CONTEXT_PATH + '/sounds/level-start.mp3' );
                gaco.audioManager.load( 'gameWin', CONTEXT_PATH + '/sounds/game-win.mp3' );
                gaco.audioManager.load( 'gameLose', CONTEXT_PATH + '/sounds/gameover.mp3' ); 
                gaco.audioManager.load( 'tap', CONTEXT_PATH + '/sounds/tap.mp3' );
                gaco.audioManager.load( 'tapWrong', CONTEXT_PATH + '/sounds/tap-wrong.mp3' );

		gaco.sceneManager = new SceneManager();

		// Frequently used scenes.
		gaco.sceneManager.add( new RankingScene() );
		gaco.sceneManager.add( new GameoverScene() );

		$( document ).ready( function( ev )
			{
				var scene = new IntroScene();
				gaco.sceneManager.add( scene );
				gaco.sceneManager.switchTo( scene );
			}
		);
	}
);

