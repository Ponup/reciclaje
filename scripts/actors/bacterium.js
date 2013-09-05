
define( [ 'scullge/actor', 'data/context' ], function( BaseActor, gaco )
	{
		function BacteriumActor()
		{
		}

		BacteriumActor.prototype = new BaseActor();
		BacteriumActor.prototype.constructor = BacteriumActor;

		BacteriumActor.prototype.init = function()
		{
			this.frameNum = 0;

			this.node = document.createElement( 'img' );
			this.node.src = CONTEXT_PATH + '/images/actors/conveyorBelt/bacteria_' + this.frameNum + '.gif';
			
			var style = this.node.style;
			style.width = '180px';
			style.position = 'absolute';
			style.right = '0px';
			style.top = '50px';
		
			this.newframeNum = null;

			$( '.Scene' ).append( this.node );
		};

		BacteriumActor.prototype.update = function()
		{
			this.frameNum = 0;

			var phLevel = gaco.engine.findActorById( 'phmeter' ).getProperty( 'phLevel' );

			var relation = {
				0: 0, 1: 0, 2: 0,
				3: 1, 4: 1, 5: 1,
				6: 2, 7: 2, 8: 2,
				9: 3, 10: 3, 11: 3,
				12: 4, 13: 4, 14: 4,
				15: 4
			};

			var newframeNum = relation[ phLevel ];
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

