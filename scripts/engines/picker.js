
define( [ 'scullge/engine', 'actors/picker/pickable', 'actors/scoreboard', 'actors/chronometer', 'actors/quitButton', 'scullge/utils/arrays', 'data/context', 'data/items', 'data/places' ], function( BaseEngine, PickableActor, ScoreBoardActor, ChronometerActor, QuitButtonActor, ArraysUtils, gaco, itemsData, placesData )
	{
		function PickerEngine( nextScene )
		{
			BaseEngine.call( this );

			this.nextScene = nextScene;
		}

		PickerEngine.prototype = new BaseEngine();
		PickerEngine.prototype.constructor = PickerEngine;

		PickerEngine.MAX_SCORE = 40;
		PickerEngine.MAX_SECONDS = PickerEngine.prototype.MAX_SECONDS = 60;

		PickerEngine.prototype.preInit = function()
		{
			gaco.gameVars = { score: 0 };

			this.initScene();

			this.addActor( new ChronometerActor() );
			this.addActor( new ScoreBoardActor() );

			this.initActors();
		};

		PickerEngine.prototype.initScene = function()
		{
			this.place = ArraysUtils.randomItem( placesData );	

			var sceneDiv = document.createElement( 'div' );
			sceneDiv.id = 'picker';
			sceneDiv.className = 'Scene';
			sceneDiv.style.display = 'none';
			sceneDiv.style.backgroundRepeat = 'no-repeat';
			sceneDiv.style.backgroundImage = "url('images/scenes/picker/" + this.place.code + ".png')";

			var $canvas = $( document.getElementById( 'canvas' ) );
			$canvas.empty().append( sceneDiv );
		};

		PickerEngine.prototype.init = function()
		{
			var allElements = itemsData.slice();
			var allElementsShuffled = ArraysUtils.shuffle( allElements );

			var posElements = [],
			    negElements = [];
			for( var i = 0; i < allElementsShuffled.length; i++ )
			{
				var element = allElementsShuffled[ i ];
				if( element.scoring.picker[ gaco.finalSceneName ] > 0 )
				{
					posElements.push( element );
				}
				else
				{
					negElements.push( element );
				}
			}

			var place = this.place;
			var maxNumElements = place.elements.length;
			var numPosElements = Math.min( parseInt( maxNumElements >> 1, 10 ) + 1, posElements.length );
			var numNegElements = maxNumElements - numPosElements;

			var availableElements = posElements.slice( 0, numPosElements );
			availableElements = availableElements.concat( negElements.slice( 0, numNegElements ) );

			for( i = 0; i < place.elements.length; i++ )
			{
				var element = place.elements[ i ];
				element.data = availableElements.pop();

				var actor = new PickableActor();
				actor.setProperties( element );

				this.addActor( actor );
			}
			this.addActor( new QuitButtonActor() );

			this.initActors();

			this.addUpdateListener( $.proxy( this.onUpdate, this ) );

			this.seconds = { 0: 1 };
		};

		PickerEngine.prototype.onUpdate = function()
		{
			var currentSecond = this.getElapsedTime( true ).toFixed( 1 );

			if( currentSecond % 1.7 === 0 && !( currentSecond in this.seconds ) )
			{
				this.seconds[ currentSecond ] = 1;

				var $pickables = $( '.Pickable' );
				$pickables.removeClass( 'Shaker' );
				var randomPickable = ArraysUtils.randomItem( $pickables );
				$( randomPickable ).addClass( 'Shaker' );
			}

			gaco.hasWin = gaco.gameVars.score >= PickerEngine.MAX_SCORE;
			if( gaco.hasWin )
			{
				this.destroy();
				gaco.sceneManager.switchTo( this.nextScene );
				return;
			}

			if( currentSecond >= PickerEngine.MAX_SECONDS )
			{
				this.destroy();
				gaco.sceneManager.switchTo( 'gameover' );
			}
		};

		PickerEngine.prototype.destroy = function()
		{
			this.stop();
		};

		return PickerEngine;
	}
);

