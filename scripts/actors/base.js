
define( function()
	{
		function Actor()
		{
			this.active = true;
			this.properties = {};
			this.id = null;
		}

		Actor.prototype.init = function()
		{
		};

		Actor.prototype.setId = function( id )
		{
			this.id = id;
		};

		Actor.prototype.getId = function()
		{
			return this.id;
		};

		Actor.prototype.isActive = function()
		{
			return this.active;
		};

		Actor.prototype.getType = function()
		{
			return this.constructor.name;
		};

		Actor.prototype.update = function()
		{
		};

		Actor.prototype.redraw = function()
		{
		};

		Actor.prototype.setProperty = function( name, value )
		{
			this.properties[ name ] = value;
		};

		Actor.prototype.getProperty = function( name )
		{
			if( !( name in this.properties ) )
			{
				throw 'Property does not exist: ' + name;
			}

			return this.properties[ name ];
		};

		Actor.prototype.setProperties = function( properties )
		{
			this.properties = properties;
		};

		return Actor;
	}
);


