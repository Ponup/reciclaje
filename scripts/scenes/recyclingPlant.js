
define(
	[ 'scullge/scenes/base', 'engines/recyclingPlant', 'data/context', 'text!templates/scenes/recyclingPlant.html' ],
	function( BaseScene, RecyclingPlantEngine, gaco, tplHtml )
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

		prevScene.hide();

		var canvas = document.getElementById( 'canvas' ),
			$canvas = $( canvas );

		$canvas.empty().append( tplHtml );


		gaco.engine = new RecyclingPlantEngine();

		$( '#startRecyclingButton' ).on( 'click', function()
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

