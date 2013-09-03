
define( [ 'game/context', 'scullge/scene', 'game/audiomanager', 'text!templates/scenes/splitIntro.html',
        'scenes/split',
        'utils/cssloader'

 ], function( gaco, Scene, AudioManager, tplHtml, SplitScene, CssLoader )
{
	function SplitIntroScene()
	{
		Scene.call( this );

		this.setId( 'splitIntro' );
	}

	SplitIntroScene.prototype = new Scene();

	SplitIntroScene.prototype.switchFrom = function( prevScene )
	{
		if( null !== prevScene )
		{
			prevScene.hide();
		}

		$( '#canvas' ).empty();
		$( '#canvas' ).append( $( tplHtml ) );

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
                        CONTEXT_PATH + '/styles/scenes/help.css',
                        CONTEXT_PATH + '/styles/scenes/gameplay.css',
                ]);

		var bgMusic = gaco.audioManager.play( 'introMusic' );
		bgMusic.pause();

		var playerName = localStorage.getItem( 'playerName' );
		if( null !== playerName ) $( '#playerName' ).val( playerName );

		gaco.sceneManager.add( new SplitScene() );

		gaco.audioManager.play( 'helpMusic' );

		var currentLevel = 1;

		$( '#currentLevel' ).html( currentLevel );

		$( '#help' ).fadeIn();
		setTimeout( function()
			{
				$( '#help' ).hide();
				gaco.sceneManager.switchTo( 'split' );
			},
			1000
		);

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

	SplitIntroScene.prototype.hide = function()
	{
		$( '#intro' ).hide();
	};

	return SplitIntroScene;
});

