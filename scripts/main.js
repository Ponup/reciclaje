
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

require( [ 'jquery', 'game/context', 'game/audiomanager', 'scenes/manager', 'scenes/intro', 'scenes/ranking', 'scenes/gameover' ], 
	function( $, gaco, AudioManager, SceneManager, IntroScene, RankingScene, GameoverScene )
	{
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

