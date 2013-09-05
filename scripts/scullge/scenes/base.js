
define( function()
{
	function BaseScene( id )
	{
		this.id = id || null;
	}

	BaseScene.prototype.getId = function()
	{
		return this.id;
	};

	BaseScene.prototype.setId = function( id )
	{
		this.id = id;
	};

	BaseScene.prototype.switchFrom = function( scene )
	{
	};

	BaseScene.prototype.hide = function()
	{
		$( document.getElementById( this.id ) ).hide();
	};

	BaseScene.prototype.cleanup = function()
	{
		$( document.getElementById( this.id ) ).remove();
	};

	BaseScene.prototype.show = function()
	{
		$( document.getElementById( this.id ) ).fadeIn();
	};

	return BaseScene;
});

