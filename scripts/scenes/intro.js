
define( [ 'game/context', 'scullge/scene', 'game/audiomanager', 'text!templates/intro.html',
        'scenes/halloffame',
        'scenes/help',
        'scenes/gameplay',
        'scenes/gameover',
        'utils/cssloader'

 ], function( gaco, Scene, AudioManager, introHtml, HalloffameScene, HelpScene, GameplayScene, GameoverScene, CssLoader )
{
	function IntroScene()
	{
		Scene.call( this );

		this.setId( 'intro' );
	}

	IntroScene.prototype = new Scene();

	IntroScene.prototype.switchFrom = function( prevScene )
	{
		if( null !== prevScene )
		{
			prevScene.hide();
		}

		$( '#canvas' ).empty();
		$( '#canvas' ).append( $( introHtml ) );

                gaco.audioManager = new AudioManager();
                gaco.audioManager.load( 'introMusic', CONTEXT_PATH + '/sounds/music.mp3' );
                gaco.audioManager.load( 'helpMusic', CONTEXT_PATH + '/sounds/level-start.mp3' );
                gaco.audioManager.load( 'gameWin', CONTEXT_PATH + '/sounds/game-win.mp3' );
                gaco.audioManager.load( 'gameLose', CONTEXT_PATH + '/sounds/gameover.mp3' ); 
                gaco.audioManager.load( 'tap', CONTEXT_PATH + '/sounds/tap.mp3' );
                gaco.audioManager.load( 'tapWrong', CONTEXT_PATH + '/sounds/tap-wrong.mp3' );

                gaco.GameState = {
                        NEW_GAME                :0,
                        NEW_LEVEL               :1,
                        WAITING_ELEMENT         :2,
                        ELEMENT_MOVING          :3,
                        LEVEL_END               :4,
                        GAME_OVER               :5,
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

                var cssLoader = new CssLoader();
                cssLoader.loadCsss([
                        CONTEXT_PATH + '/styles/scenes/intro.css',
                        CONTEXT_PATH + '/styles/scenes/help.css',
                        CONTEXT_PATH + '/styles/scenes/gameplay.css',
                        CONTEXT_PATH + '/styles/scenes/gameover.css',
                ]);


		var bgMusic = gaco.audioManager.play( 'introMusic' );
		bgMusic.pause();

		var playerName = localStorage.getItem( 'playerName' );
		if( null !== playerName ) $( '#playerName' ).val( playerName );

		gaco.sceneManager.add( new IntroScene() );
		gaco.sceneManager.add( new HelpScene() );
		gaco.sceneManager.add( new GameplayScene() );
		gaco.sceneManager.add( new GameoverScene() );

		$( '#playButton' ).on( 'click', function( ev )
			{
				bgMusic.pause();
				localStorage.setItem( 'playerName', $( '#playerName' ).val() );
				gaco.sceneManager.switchTo( 'help' );
			}
		);

		$( 'img.Button' ).hover(
			function()
			{
				$( this ).animate({ zoom: 1.1 }, { duration: 120 });
			},
			function()
			{
				$( this ).animate({ zoom: 1 }, { duration: 120 });
			}
		);
	};

	IntroScene.prototype.hide = function()
	{
		$( '#intro' ).hide();
	};

	return IntroScene;
});

