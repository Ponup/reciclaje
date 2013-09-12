
define( [ 'scullge/actor', 'data/context' ], function( BaseActor, gaco )
	{
		function BacteriumActor()
		{
			BaseActor.call( this );
		}

		BacteriumActor.prototype = new BaseActor();
		BacteriumActor.prototype.constructor = BacteriumActor;

		BacteriumActor.prototype.init = function()
		{
			BaseActor.prototype.init.call( this );

			this.frameNum = 0;

			this.node = document.createElement( 'img' );
			this.node.src = CONTEXT_PATH + '/images/actors/conveyorBelt/bacteria_' + this.frameNum + '.gif';
			
			var style = this.node.style;
			style.width = '180px';
			style.position = 'absolute';
			style.right = '38px';
			style.top = '80px';
		
			this.newframeNum = null;

			$( '.Scene' ).append( this.node );
		};

		BacteriumActor.prototype.update = function()
		{
			this.frameNum = 0;

			var relation = {
				0: 0, 1: 0, 2: 0,
				3: 1, 4: 1,
				5: 2, 6: 2, 7: 2, // Winning condition
				8: 3, 9: 3, 10: 3,
				11: 4, 12: 4, 13: 4
			};

			var newframeNum = relation[ gaco.gameVars.phLevel ];
			if( newframeNum != this.frameNum )
			{
				this.newframeNum = newframeNum;
			}
		};


		BacteriumActor.prototype.redraw = function()
		{
			if( null !== this.newframeNum )
			{
				this.frameNum = this.newframeNum;
				this.node.src = CONTEXT_PATH + '/images/actors/conveyorBelt/bacteria_' + this.frameNum + '.gif';
				this.newframeNum = null;
			}
		};

		return BacteriumActor;
	}
);

