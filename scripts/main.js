
require.config({
	baseUrl: CONTEXT_PATH + '/scripts',
	paths: {
		jquery: 'jquery-1.10.2.min',
	},
	shim: {
		handlebars: { exports: 'Handlebars' },
	},
	urlArgs: 'bust=' + new Date().getTime(),
});

var dependencies = [
	'jquery',
	'game/context',
	'game/audiomanager',
	'scenes/manager',
	'scenes/welcome',
	'utils/cssloader',
];

require( dependencies, 
	function( $, gaco, AudioManager, SceneManager, WelcomeScene, CssLoader )
	{
		gaco.audioManager = new AudioManager();
		gaco.audioManager.load( 'tap', CONTEXT_PATH + '/sounds/tap.mp3' );
		gaco.audioManager.load( 'tapWrong', CONTEXT_PATH + '/sounds/tap-wrong.mp3' );

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
				
		gaco.sceneManager = new SceneManager();

		var cssLoader = new CssLoader();
		cssLoader.loadCsss([ CONTEXT_PATH + '/styles/scenes/intro.css' ]);

		$( document ).ready( function( ev )
			{
				gaco.sceneManager.add( new WelcomeScene() );
				gaco.sceneManager.switchTo( 'welcome' );
			}
		);
	}
);

