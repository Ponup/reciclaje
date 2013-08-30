
define( [ 'actors/base', 'utils/arrays', 'game/context' ], function( Actor, ArraysUtils, gaco )
	{
		function Machine()
		{
			Actor.call( this );
		}

		Machine.prototype = new Actor();
		Machine.prototype.constructor = Machine;

		Machine.prototype.init = function()
		{
			var self = this;

			this.updateMachine();

			this.node = document.createElement( 'img' );
			this.node.style.bottom = '120px';
			this.node.style.position = 'absolute';
			this.node.src = CONTEXT_PATH + '/images/actors/process/' + this.machine.name + '.png';
			recyclingPlant.appendChild( this.node );

			$( this.node ).on( 'click', function()
				{
//					$.proxy( self.updateMachine, self );
					self.updateMachine();
				}
			);
		};

		Machine.prototype.updateMachine = function()
		{
			this.machine = ArraysUtils.randomItem( gaco.machines );
			var userPositions = gaco.userPositions.split( '' );
			userPositions[ this.properties.position ] = this.machine.code;
			gaco.userPositions = userPositions.join( '' );
			console.clear();
			console.log(gaco.rightPositions);
			console.log(gaco.userPositions);
		};

		Machine.prototype.redraw = function()
		{
			this.node.src = CONTEXT_PATH + '/images/actors/process/' + this.machine.name + '.png';
			this.node.style.left = ( 60 + this.properties.position * 180 ) + 'px';
		};

		return Machine;
	}
);

