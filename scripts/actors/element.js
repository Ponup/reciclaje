
define( [ 'game/context', 'actors/base' ], function( gaco, Actor )
{
	function Element( id, properties )
	{
		Actor.call( this );

		this.id = id;
	
		this.properties = {
			top: 0,
		};
		$.extend( this.properties, properties );
	}

	Element.prototype = new Actor();
	Element.prototype.constructor = Element;

	Element.prototype.init = function()
	{
		var img = new Image();
		img.src = CONTEXT_PATH + '/images/items/' + this.properties.name + '.png';
		img.style.left = ( $( '#cinta' ).offset().left + 40 ) + 'px';
		img.style.left = '450px';
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
		if( this.properties.top > 300 )
		{
			this.active = false;
			gaco.gameVars.state = gaco.GameState.WAITING_ELEMENT;
			$( img ).animate({ width: '70px' },
				{
					complete: function()
					{
						$( this ).attr( 'src', CONTEXT_PATH + '/images/sprites/explosion.gif' ).fadeOut();
					},
					duration: 200,
			});
		}
	};

	return Element;
});

