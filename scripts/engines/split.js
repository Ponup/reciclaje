
define( [ 'scullge/engine' ], function( Engine )
	{
		function SplitEngine()
		{
			this.context.currentLevel = 1;
		}

		SplitEngine.prototype = new Engine();
		SplitEngine.prototype.constructor = SplitEngine;

		return SplitEngine;
	}
);

