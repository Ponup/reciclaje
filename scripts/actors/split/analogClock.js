
define( [ 'scullge/actor', 'data/context' ], function( BaseActor, gaco )
	{
		function AnalogClockActor()
		{
			BaseActor.call( this );

			this.setId( 'nivelometro' );

			this.degrees = 270;
		}

		AnalogClockActor.prototype = new BaseActor();
		AnalogClockActor.prototype.constructor = AnalogClockActor;

		AnalogClockActor.prototype.init = function()
		{
			BaseActor.prototype.init.call( this );

			var node = document.createElement( 'img' );
			node.src = CONTEXT_PATH + '/images/actors/nivelometro.png';
			node.id = 'nivelometro';
			node.style.position = 'absolute';
			node.style.top = '100px';
			node.style.left = '30px';
			node.style.width = '300px';

			this.needle = document.createElement( 'img' );
			this.needle.id = 'needle';
			this.needle.src = CONTEXT_PATH + '/images/actors/nivelometro_aguja.png';
			this.needle.style.position = 'absolute';
			this.needle.style.top = '150px';
			this.needle.style.left = '188px';
			this.needle.style.width = '40px';
			this.needle.style['-webkit-transform-origin'] = '46% 77%';
			
			$( '.Scene' ).append( node );
			$( '.Scene' ).append( this.needle );
		};
		
		AnalogClockActor.prototype.reset = function()
		{
			this.degrees = 270;
		};

		AnalogClockActor.prototype.increase = function()
		{
			this.degrees += 26;
		};
		
		AnalogClockActor.prototype.redraw = function()
		{
			this.needle.style['-webkit-transform'] = 'rotate(' + this.degrees + 'deg)';
		};

		return AnalogClockActor;
	}
);

