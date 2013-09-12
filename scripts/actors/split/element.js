
define( [ 'data/context', 'scullge/actor' ], function( gaco, BaseActor )
{
	function Element( properties )
	{
		BaseActor.call( this );

		this.node = null;
		this.properties = {
			top: 0,
		};
		$.extend( this.properties, properties );
	}

	Element.prototype = new BaseActor();
	Element.prototype.constructor = Element;

	Element.prototype.init = function()
	{
		BaseActor.prototype.init.call( this );

		this.node = document.createElement( 'img' );
		this.node.src = CONTEXT_PATH + '/images/items/' + this.properties.name + '.png';
		this.node.style.left = ( $( '#cinta' ).offset().left + 40 ) + 'px';
		this.node.style.left = '440px';
		this.node.style.top = '0px';
		this.node.className = 'Element';

		$( '.Scene' ).append( this.node );
	};

	Element.prototype.update = function()
	{
		this.properties.top += gaco.gameVars.speed;
	};

	Element.prototype.redraw = function()
	{
		this.node.style.top = ( this.properties.top ) + 'px';
		if( this.properties.top > 320 )
		{
			this.active = false;
			gaco.gameVars.state = gaco.GameState.WAITING_ELEMENT;
			$( this.node ).animate({ width: '70px' , left: '472px',top:'370px' },
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

