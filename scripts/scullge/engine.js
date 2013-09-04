
define( [ 'scullge/actor' ], function( BaseActor )
	{
		function Engine()
		{
			this.intervalId = null;
			
			this.actors = [];
			this.updateListeners = [];

			this.context = {};
		}

		Engine.prototype.addUpdateListener = function( listener )
		{
			this.updateListeners.push( listener );
		};

		Engine.prototype.addActor = function( actor )
		{
			if( !( actor instanceof BaseActor ) )
			{
				throw 'Argument is not an BaseActor instance: ' + ( typeof actor );
			}
			this.actors.push( actor );
		};

		Engine.prototype.findActorById = function( id )
		{
			for( var i = 0; i < this.actors.length; i++ )
			{
				if( this.actors[i].id == id ) return this.actors[i];
			}

			throw 'Actor with id ' + id + ' was not found';
		};

		Engine.prototype.findActorsByType = function( type )
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

		Engine.prototype.start = function()
		{
			for( var i = 0; i < this.actors.length; i++ )
			{
				this.actors[i].init();
			}
			this.runId = setInterval( $.proxy( this.gameLoop, this ), 1000 / 50 );
		};

		Engine.prototype.stop = function()
		{
			clearInterval( this.runId );
		};

		Engine.prototype.gameLoop = function()
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

		Engine.prototype.redraw = function()
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

		return Engine;
	}
);

