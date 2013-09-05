
define( [ 'scullge/engine', 'actors/machine', 'actors/chronometer', 'actors/scoreboard', 'data/context' ], function( BaseEngine, MachineActor, ChronometerActor, ScoreboardActor, gaco )
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
			gaco.rightPositions = 'aghpt';
			gaco.userPositions = '     ';
			gaco.numTries = 0;

			for( i = 0; i < gaco.machines.length; i++ )
			{
				var machine = new MachineActor();
				machine.setProperty( 'position', i );
				gaco.engine.addActor( machine );
			}

			gaco.engine.addUpdateListener( $.proxy( this.onUpdate, this ) );

			this.addActor( new ChronometerActor() );
			this.addActor( new ScoreboardActor() );

			this.initActors();
		};

		RecyclingPlantEngine.prototype.onUpdate = function()
		{
			if( gaco.engine.getElapsedTime( true ) > 20 )
			{
				gaco.engine.stop();
				gaco.sceneManager.switchTo( 'gameover' );
			}
		};

		return RecyclingPlantEngine;
	}
);

