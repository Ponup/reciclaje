
define( [ 'scullge/engine', 'actors/recyclingPlant/machine', 'actors/chronometer', 'actors/scoreboard', 'actors/quitButton', 'actors/recyclingPlant/startButton', 'data/context' ], function( BaseEngine, MachineActor, ChronometerActor, ScoreboardActor, QuitButtonActor, StartButtonActor, gaco )
	{
		function RecyclingPlantEngine()
		{
			BaseEngine.call( this );
		}

		RecyclingPlantEngine.prototype = new BaseEngine();
		RecyclingPlantEngine.prototype.constructor = RecyclingPlantEngine;

		RecyclingPlantEngine.prototype.preInit = function()
		{
			this.initScene();

			this.addActor( new StartButtonActor() );
			this.addActor( new ChronometerActor() );
			this.addActor( new ScoreboardActor() );

			this.initActors();
		};

		RecyclingPlantEngine.prototype.init = function()
		{
			gaco.machines = [
				{ code: 'a', name: 'reciclado_prop_agua' },
				{ code: 'g', name: 'reciclado_prop_guillotina' },
				{ code: 'h', name: 'reciclado_prop_horno' },
				{ code: 'p', name: 'reciclado_prop_prensa' },
				{ code: 't', name: 'reciclado_prop_trituradora' },
			];

			gaco.rightPositions = 'atphg';
			gaco.userPositions = '     ';
			gaco.numTries = 0;

			for( i = 0; i < gaco.machines.length; i++ )
			{
				var machine = new MachineActor();
				machine.setProperty( 'position', i );
				gaco.engine.addActor( machine );
			}

			gaco.engine.addUpdateListener( $.proxy( this.onUpdate, this ) );

			this.addActor( new QuitButtonActor() );

			this.initActors();
		};

		RecyclingPlantEngine.prototype.initScene = function()
		{
			var sceneDiv = document.createElement( 'div' );
			sceneDiv.id = 'recyclingPlant';
			sceneDiv.className = 'Scene';
			sceneDiv.style.background = "url('images/scenes/recyclingPlant.png') no-repeat";
			
			var lightbulb = document.createElement( 'img' );
				lightbulb.className = 'LightBulb';
				lightbulb.src = 'images/scenes/recyclingPlant/lightbulb.png';
				lightbulb.style.position = 'absolute';
				lightbulb.style.left  = '200px';
				lightbulb.style.top = '32px';
				lightbulb.style.width = '27px';
				lightbulb.style.height = '153px';
				sceneDiv.appendChild( lightbulb );
			
			var lightbulb2 = document.createElement( 'img' );
				lightbulb2.className = 'LightBulb';
				lightbulb2.src = 'images/scenes/recyclingPlant/lightbulb.png';
				lightbulb2.style.position = 'absolute';
				lightbulb2.style.left  = '800px';
				lightbulb2.style.top = '32px';
				lightbulb2.style.width = '27px';
				lightbulb2.style.height = '153px';
				sceneDiv.appendChild( lightbulb2 );

			$( '#canvas' ).append( sceneDiv );
		};

		RecyclingPlantEngine.prototype.onUpdate = function()
		{
			if( this.getElapsedTime( true ) > 20 )
			{
				this.stop();

				this.updateGameStatus();
				gaco.sceneManager.switchTo( 'gameover' );
			}
		};

		RecyclingPlantEngine.prototype.updateGameStatus = function()
		{
			gaco.hasWin = ( gaco.userPositions == gaco.rightPositions );
		};

		return RecyclingPlantEngine;
	}
);

