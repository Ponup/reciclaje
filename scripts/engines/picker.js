
define( [ 'scullge/engine', 'actors/pickable', 'actors/scoreboard', 'actors/chronometer', 'utils/arrays', 'game/context', 'data/items', 'data/places' ], function( Engine, PickableActor, ScoreBoardActor, ChronometerActor, ArraysUtils, gaco, itemsData, placesData )
	{
		function PickerEngine( nextScene )
		{
			this.nextScene = nextScene;
		}

		PickerEngine.prototype = new Engine();
		PickerEngine.prototype.constructor = PickerEngine;

		PickerEngine.prototype.init = function()
		{
			$( '#currentLevel' ).html( this.context.currentLevel );

			var availableElements = itemsData.slice();
			availableElements = ArraysUtils.shuffle( availableElements );

			var place = ArraysUtils.randomItem( placesData );
			document.getElementById( 'picker' ).style.backgroundImage = "url('images/scenes/picker/" + place.code + ".png')";

			for( i = 0; i < place.elements.length; i++ )
			{
				var element = place.elements[ i ];
				element.data = availableElements.pop();

				var actor = new PickableActor();
				actor.setProperties( element );

				this.addActor( actor );
			}

			this.addActor( new ChronometerActor() );
			this.addActor( new ScoreBoardActor() );

			this.addUpdateListener( $.proxy( this.onUpdate, this ) );

			gaco.gameVars = {
				elapsedSecons: 0,
				score: 0,
			};

			this.context.currentLevel = 1;
			this.context.initTime = Date.now();
			this.context.seconds = 0;
		};

		PickerEngine.prototype.onUpdate = function()
		{
			this.context.seconds = ( Date.now() - this.context.initTime ) / 1000;

			// @TODO Use a single place to store common vars.
			gaco.gameVars.elapsedSeconds = this.context.seconds;
			gaco.gameVars.score = gaco.score;

			if( gaco.score >= 40 )
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

