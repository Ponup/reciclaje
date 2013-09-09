
define( [ 'data/context', 'scullge/actor' ], function( gaco, BaseActor )
{
	function Element( id, properties )
	{
		BaseActor.call( this );

		this.id = id;
	
		this.properties = {
			top: 0,
		};
		$.extend( this.properties, properties );
	}

	Element.prototype = new BaseActor();
	Element.prototype.constructor = Element;

	Element.prototype.init = function()
	{
		var img = document.createElement( 'img' );
		img.src = CONTEXT_PATH + '/images/items/' + this.properties.name + '.png';
		img.style.left = ( $( '#cinta' ).offset().left + 40 ) + 'px';
		img.style.left = '440px';
		img.style.top = '0px';
		img.id = this.id;
		img.className = 'Element';

		$( '#gameplay' ).append( img );
	};

	Element.prototype.update = function()
	{
		this.properties.top += gaco.gameVars.speed;
	};

	Element.prototype.redraw = function()
	{
		var img = document.getElementById( this.id );
		img.style.top = ( this.properties.top ) + 'px';
		if( this.properties.top > 320 )
		{
			this.active = false;
			gaco.gameVars.state = gaco.GameState.WAITING_ELEMENT;
			$( img ).animate({ width: '70px' , left: '472px',top:'370px' },
			{
					complete: function()
					{
						$( this ).attr( 'src', CONTEXT_PATH + '/images/sprites/explosion.gif' ).fadeOut();
					},
					duration: 300, 
			});
		}
	};

	return Element;
});

