
define( [ 'scullge/engine', 'actors/recyclingPlant/machine', 'actors/chronometer', 'actors/scoreboard', 'actors/quitButton', 'actors/recyclingPlant/startButton', 'data/context' ], function( BaseEngine, MachineActor, ChronometerActor, ScoreboardActor, QuitButtonActor, StartButtonActor, gaco )
	{
		function RecyclingPlantEngine()
		{
			BaseEngine.call( this );
		}

		RecyclingPlantEngine.prototype = new BaseEngine();
		RecyclingPlantEngine.prototype.constructor = RecyclingPlantEngine;

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

			this.addActor( new StartButtonActor() );
			this.addActor( new ChronometerActor() );
			this.addActor( new ScoreboardActor() );
			this.addActor( new QuitButtonActor() );

			this.initActors();
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
			console.log(gaco.userPositions,gaco.rightPositions);
			gaco.hasWin = ( gaco.userPositions == gaco.rightPositions );
		};

		return RecyclingPlantEngine;
	}
);

