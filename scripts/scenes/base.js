
define( function()
{
	function Scene( id )
	{
		this.id = id || null;
	}

	Scene.prototype.getId = function()
	{
		return this.id;
	};

	Scene.prototype.setId = function( id )
	{
		this.id = id;
	};

	Scene.prototype.switchFrom = function( scene )
	{
	};

	Scene.prototype.hide = function()
	{
		$( document.getElementById( this.id ) ).hide();
	};

	Scene.prototype.show = function()
	{
		$( document.getElementById( this.id ) ).fadeIn();
	};

	return Scene;
});

