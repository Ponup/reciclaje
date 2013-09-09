
require.config({
	baseUrl: CONTEXT_PATH + '/scripts',
	paths: {
		jquery: 'jquery-1.10.2.min',
		jqueryui: 'jquery-ui-1.10.3.custom.min',
		TweenMax: 'tweening/TweenMax.min',
	},
	shim: {
		handlebars: { exports: 'Handlebars' },
	},
	urlArgs: 'bust=' + Date.now(),
});

require( [ 'jquery', 'data/context', 'scullge/loaders/audio', 'scullge/scenes/manager', 'scenes/intro', 'scenes/ranking', 'scenes/gameover' ], 
	function( $, gaco, AudioLoader, SceneManager, IntroScene, RankingScene, GameoverScene )
	{
		$( document ).on( 'dragstart', function() { return false; });

                gaco.audioManager = new AudioLoader();
                gaco.audioManager.load( 'bgmusicMenu', CONTEXT_PATH + '/sounds/bgmusic-menu.mp3' );
                gaco.audioManager.load( 'bgmusicGameplay', CONTEXT_PATH + '/sounds/bgmusic-gameplay.mp3' );
                gaco.audioManager.load( 'gameoverLost', CONTEXT_PATH + '/sounds/gameover-lost.mp3' );
                gaco.audioManager.load( 'gameoverWon', CONTEXT_PATH + '/sounds/gameover-won.mp3' ); 
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

