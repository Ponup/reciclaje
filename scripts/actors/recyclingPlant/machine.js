
define( [ 'scullge/actor', 'scullge/utils/arrays', 'data/context', 'jqueryui' ], function( BaseActor, ArraysUtils, gaco )
	{
		function Machine()
		{
			BaseActor.call( this );

			this.machines = this.machine = this.newMachine = null;
		}

		Machine.prototype = new BaseActor();
		Machine.prototype.constructor = Machine;

		Machine.prototype.init = function()
		{
			var self = this;

			this.machines = ArraysUtils.shuffle( gaco.machines.slice() );

			this.updateMachine();

			this.node = document.createElement( 'img' );
			this.node.style.bottom = '166px';
			this.node.style.position = 'absolute';
			this.node.src = CONTEXT_PATH + '/images/actors/process/' + this.machine.name + '.png';
			this.node.style.left = ( 63 + this.properties.position * 174 ) + 'px';
			recyclingPlant.appendChild( this.node );

			$( this.node ).on( 'click', function()
				{
					if( gaco.gameVars.score > 0 ) gaco.gameVars.score -= 1;
					self.updateMachine();
				}
			);
		};

		Machine.prototype.updateMachine = function()
		{
			if( null == this.machine )
			{
				this.machine = this.machines.pop();
			}
			else
			{
				this.newMachine = this.machines.shift();
				this.machines.push( this.machine );
				this.machine = this.newMachine;
			}

			var userPositions = gaco.userPositions.split( '' );
			userPositions[ this.properties.position ] = this.machine.code;
			gaco.userPositions = userPositions.join( '' );
		};

		Machine.prototype.redraw = function()
		{
			var self = this;

			if( null !== this.newMachine )
			{
				this.newMachine = null;

				$( this.node ).effect( 'fade', 100, function()
					{
						this.src = CONTEXT_PATH + '/images/actors/process/' + self.machine.name + '.png';

						$( this ).fadeIn( 100 );
					}
				);				
			}
		};

		return Machine;
	}
);

