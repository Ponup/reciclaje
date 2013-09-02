
define( [ 'scullge/actor' ], function( Actor )
	{
		function GameEngine()
		{
			this.intervalId = null;
			
			this.actors = [];
			this.updateListeners = [];

			this.context = {};
		}

		GameEngine.prototype.addUpdateListener = function( listener )
		{
			this.updateListeners.push( listener );
		};

		GameEngine.prototype.addActor = function( actor )
		{
			if( !( actor instanceof Actor ) )
			{
				throw 'Argument is not an Actor instance: ' + ( typeof actor );
			}
			this.actors.push( actor );
		};

		GameEngine.prototype.findActorById = function( id )
		{
			for( var i = 0; i < this.actors.length; i++ )
			{
				if( this.actors[i].id == id ) return this.actors[i];
			}

			throw 'Actor with id ' + id + ' was not found';
		};

		GameEngine.prototype.findActorsByType = function( type )
		{
			var actors = [];
			for( var i = 0; i < this.actors.length; i++ )
			{
				if( this.actors[i].getType() == type )
				{
					actors.push( this.actors[i] );
				}
			}
			return actors;
		};

		GameEngine.prototype.start = function()
		{
			for( var i = 0; i < this.actors.length; i++ )
			{
				this.actors[i].init();
			}
			this.runId = setInterval( $.proxy( this.gameLoop, this ), 1000 / 50 );
		};

		GameEngine.prototype.stop = function()
		{
			clearInterval( this.runId );
		};

		GameEngine.prototype.gameLoop = function()
		{
			for( var i = 0; i < this.updateListeners.length; i++ )
			{
				this.updateListeners[i]();
			}

			for( var i = 0; i < this.actors.length; i++ )
			{
				var actor = this.actors[i];
				actor.update();
			}

			this.redraw();
		};

		GameEngine.prototype.redraw = function()
		{
			$.each( this.actors, function( i, actor )
				{
					if( actor.isActive() )
					{
						actor.redraw();
					}
				}
			);
		};

		return GameEngine;
	}
);

