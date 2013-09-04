
define( function()
	{
		function BaseActor()
		{
			this.active = true;
			this.properties = {};
			this.id = null;
			this.initiated = false;
		}

		BaseActor.prototype.init = function()
		{
			this.initiated = true;
		};

		BaseActor.prototype.isInitiated = function()
		{
			return this.initiated;
		};

		BaseActor.prototype.setId = function( id )
		{
			this.id = id;
		};

		BaseActor.prototype.getId = function()
		{
			return this.id;
		};

		BaseActor.prototype.isActive = function()
		{
			return this.active;
		};

		BaseActor.prototype.getType = function()
		{
			return this.constructor.name;
		};

		BaseActor.prototype.update = function()
		{
		};

		BaseActor.prototype.redraw = function()
		{
		};

		BaseActor.prototype.setProperty = function( name, value )
		{
			this.properties[ name ] = value;
		};

		BaseActor.prototype.getProperty = function( name )
		{
			if( !( name in this.properties ) )
			{
				throw 'Property does not exist: ' + name;
			}

			return this.properties[ name ];
		};

		BaseActor.prototype.setProperties = function( properties )
		{
			this.properties = properties;
		};

		return BaseActor;
	}
);

