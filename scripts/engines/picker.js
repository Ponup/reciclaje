
define( [ 'scullge/engine', 'actors/pickable', 'actors/scoreboard', 'actors/chronometer', 'scullge/utils/arrays', 'data/context', 'data/items', 'data/places' ], function( BaseEngine, PickableActor, ScoreBoardActor, ChronometerActor, ArraysUtils, gaco, itemsData, placesData )
	{
		function PickerEngine( nextScene )
		{
			this.nextScene = nextScene;

			this.addActor( new ChronometerActor() );
			this.addActor( new ScoreBoardActor() );
		}

		PickerEngine.prototype = new BaseEngine();
		PickerEngine.prototype.constructor = PickerEngine;

		PickerEngine.prototype.init = function()
		{
			this.initActors();

			$( '#currentLevel' ).html( this.context.currentLevel );

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

			var place = ArraysUtils.randomItem( placesData );

			var maxNumElements = place.elements.length;
			var numPosElements = Math.min( parseInt( maxNumElements >> 1, 10 ) + 1, posElements.length );
			var numNegElements = maxNumElements - numPosElements;

			var availableElements = posElements.slice( 0, numPosElements );
			availableElements = availableElements.concat( negElements.slice( 0, numNegElements ) );

			document.getElementById( 'picker' ).style.backgroundImage = "url('images/scenes/picker/" + place.code + ".png')";

			for( i = 0; i < place.elements.length; i++ )
			{
				var element = place.elements[ i ];
				element.data = availableElements.pop();

				var actor = new PickableActor();
				actor.setProperties( element );

				this.addActor( actor );
			}

			this.addUpdateListener( $.proxy( this.onUpdate, this ) );

			gaco.gameVars = {
				elapsedSecons: 0,
				score: 0,
			};

			this.context.currentLevel = 1;
			this.context.seconds = 0;
		};

		PickerEngine.prototype.start = function()
		{
			BaseEngine.prototype.start.call( this );

			this.context.initTime = Date.now();
		};

		PickerEngine.prototype.onUpdate = function()
		{
			this.context.seconds = ( Date.now() - this.context.initTime ) / 1000;

			// @TODO Use a single place to store common vars.
			gaco.gameVars.elapsedSeconds = this.context.seconds;

			if( gaco.gameVars.score >= 40 )
			{
				this.stop();
				gaco.sceneManager.switchTo( this.nextScene );
				return;
			}

			if( this.context.seconds >= 10 )
			{
				this.stop();
				gaco.sceneManager.switchTo( 'gameover' );
			}
		};

		return PickerEngine;
	}
);

