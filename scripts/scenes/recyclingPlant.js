
define(
	[ 'scullge/scenes/base', 'engines/recyclingPlant', 'data/context' ],
	function( BaseScene, RecyclingPlantEngine, gaco )
{
	function RecyclingPlantScene()
	{
		BaseScene.call( this );

		this.setId( 'recyclingPlant' );
	}

	RecyclingPlantScene.prototype = new BaseScene();
	RecyclingPlantScene.prototype.constructor = RecyclingPlantScene;

	RecyclingPlantScene.prototype.switchFrom = function( prevScene )
	{
		document.title = 'Reciclar papel - El juego del reciclaje';
		document.body.style.backgroundColor = '#2d3e50';

		prevScene.hide();

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		var sceneDiv = document.createElement( 'div' );
		sceneDiv.id = 'recyclingPlant';
		sceneDiv.className = 'Scene';
		sceneDiv.style.background = "url('images/scenes/recyclingPlant.png') no-repeat";

		var startButton = document.createElement( 'img' );
		startButton.id = 'startRecyclingButton';
		startButton.src = 'images/actors/recyclingPlant/start.png';
		startButton.style.cssText = 'position: absolute; bottom: 0px;';
		sceneDiv.appendChild( startButton );

		$canvas.empty().append( sceneDiv );

		gaco.engine = new RecyclingPlantEngine();

		$( startButton ).on( 'click', function()
			{
				gaco.numTries++;
				gaco.engine.updateGameStatus();

				var img = this;
				this.src = CONTEXT_PATH + '/images/actors/recyclingPlant/processing.png';

				setTimeout( function() {
					if( gaco.hasWin )
					{
						gaco.engine.stop();
						img.src = CONTEXT_PATH + '/images/actors/recyclingPlant/ok.png';

						setTimeout( function() {
							gaco.sceneManager.switchTo( 'gameover' );
						}, 1000 );
					}
					else
					{
						img.src = CONTEXT_PATH + '/images/actors/recyclingPlant/ko.png';

						setTimeout( function() {
							if( gaco.numTries > 2 )
							{
								gaco.engine.stop();
								gaco.sceneManager.switchTo( 'gameover' );
							}
							else
							{
								img.src = CONTEXT_PATH + '/images/actors/recyclingPlant/start.png';
							}
						}, 2000 );
					}
				}, 2000 );
			}
		);

		gaco.engine.init();
		gaco.engine.start();
	};

	return RecyclingPlantScene;
});

