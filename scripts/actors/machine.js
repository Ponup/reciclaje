
define( [ 'scullge/actor', 'utils/arrays', 'game/context' ], function( Actor, ArraysUtils, gaco )
	{
		function Machine()
		{
			Actor.call( this );

			this.machines = this.machine = null;
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
					self.updateMachine();
				}
			);
		};

		Machine.prototype.updateMachine = function()
		{
			if( null == this.machines )
			{
				this.machines = ArraysUtils.shuffle( gaco.machines.slice() );
			}
			
			if( null == this.machine )
			{
				this.machine = this.machines.pop();
			}
			else
			{
				var tempMachine = this.machines.shift();
				this.machines.push( this.machine );
				this.machine = tempMachine;
			}

			var userPositions = gaco.userPositions.split( '' );
			userPositions[ this.properties.position ] = this.machine.code;
			gaco.userPositions = userPositions.join( '' );
			console.clear();
		};

		Machine.prototype.redraw = function()
		{
			this.node.src = CONTEXT_PATH + '/images/actors/process/' + this.machine.name + '.png';
			this.node.style.left = ( 60 + this.properties.position * 180 ) + 'px';
		};

		return Machine;
	}
);

