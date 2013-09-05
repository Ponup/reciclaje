
define( [ 'scullge/scenes/base' ], function( BaseScene )
{
	function SceneManager()
	{
		this.currentScene = null;
		this.scenes = {};
	}

	SceneManager.prototype.add = function( scene )
	{
		this.scenes[ scene.getId() ] = scene;
	};

	SceneManager.prototype.switchTo = function( sceneArg )
	{
		var sceneId = null;

		if( sceneArg instanceof BaseScene )
		{
			sceneId = sceneArg.getId();
		}
		else if( 'string' == typeof( sceneArg ) )
		{
			sceneId = sceneArg;
		}

		if( !( sceneId in this.scenes ) )
		{
			throw 'The scene was not added to this manager: ' + sceneId;
		}

		var previousScene = this.currentScene;
		this.currentScene = this.scenes[ sceneId ];
		
		if( null !== previousScene )
		{
			previousScene.cleanup();
		}

		this.currentScene.switchFrom( previousScene );
	};

	return SceneManager;
});

