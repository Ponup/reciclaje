
define( [ 'data/context', 'scullge/actor'  ], function( gaco, BaseActor )
{
	function Container( id, properties )
	{
		BaseActor.call( this );

		this.id = id;

		this.properties = {
			name: null,
			full: false,
			numElements: 0,
		};
		$.extend( this.properties, properties );
	}

	Container.prototype = new BaseActor();
	Container.prototype.constructor = Container;

	Container.prototype.setFull = function( full )
	{
		this.setProperty( 'full', full );
	};

	Container.prototype.init = function()
	{
		var image = document.createElement( 'img' );
		image.id = this.id;
		image.style.left = ( this.properties.position * 200 ) + 'px';
		image.style.top = '400px';
		image.setAttribute( 'data-name', this.properties.name );
		image.setAttribute( 'draggable', false );
		$( image ).on( 'click', function( ev )
			{
				var actor = gaco.engine.findActorById( 'container_' + this.getAttribute( 'data-name' ) );
				
				if( actor.getProperty( 'full' ) )
				{
					gaco.audioManager.play( 'tapWrong' );
					return;
				}

				var $this = $( this );
				gaco.audioManager.play( 'tap' );

				gaco.activeElement.active = false;
				actor.properties.numElements++;
				$( document.getElementById( gaco.activeElement.id ) ).animate({ opacity: 0, top: $this.offset().top, left: $this.position().left });
		
				var correctMovement = ( gaco.activeElement.properties.container == actor.properties.type );
				if( correctMovement )
				{
					gaco.gameVars.correctMovements += 1;
					gaco.gameVars.score += ( gaco.gameVars.currentLevel + 1 );
				}

				gaco.gameVars.state = gaco.GameState.WAITING_ELEMENT;
			}
		);

		var div = document.createElement( 'div' );
		div.className = 'Container';
		div.setAttribute( 'draggable', false );
		div.appendChild( image );

		$( '#containers' ).append( div );
	};

	Container.prototype.update = function()
	{
		this.properties.full = ( this.properties.numElements >= this.properties.capacity );
	};

	Container.prototype.redraw = function()
	{
		var img = document.getElementById( this.id );
		if( this.getProperty( 'full' ) )
		{
			img.src = CONTEXT_PATH + '/images/containers/' + this.properties.name + '_llena.png';
		}
		else
		{
			img.src = CONTEXT_PATH + '/images/containers/' + this.properties.name + '.png';
		}
	};

	return Container;
});


