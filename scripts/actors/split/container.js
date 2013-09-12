
define( [ 'data/context', 'scullge/actor'  ], function( gaco, BaseActor )
{
	function Container( properties )
	{
		BaseActor.call( this );

		this.node = null;
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
		BaseActor.prototype.init.call( this );

		var self = this;

		this.node = document.createElement( 'img' );
		this.node.style.left = ( this.properties.position * 200 ) + 'px';
		this.node.style.top = '400px';
		this.node.setAttribute( 'data-name', this.properties.name );
		this.node.setAttribute( 'draggable', false );
		$( this.node ).on( 'click', function( ev )
			{
				if( self.getProperty( 'full' ) )
				{
					gaco.audioManager.play( 'tapWrong' );
					return;
				}

				var $this = $( this );
				gaco.audioManager.play( 'tap' );

				gaco.activeElement.active = false;
				self.properties.numElements++;
				$( gaco.activeElement.node ).animate({ opacity: 0, top: $this.offset().top, left: $this.position().left });
		
				var correctMovement = ( gaco.activeElement.properties.container == self.properties.type );
				if( correctMovement )
				{
					gaco.engine.findActorById( 'nivelometro' ).increase();

					gaco.gameVars.correctMovements += 1;
					gaco.gameVars.score += ( gaco.gameVars.currentLevel + 1 );
				}

				gaco.gameVars.state = gaco.GameState.WAITING_ELEMENT;
			}
		);

		var div = document.createElement( 'div' );
		div.className = 'Container';
		div.setAttribute( 'draggable', false );
		div.appendChild( this.node );

		$( '#containers' ).append( div );
	};

	Container.prototype.update = function()
	{
		this.properties.full = ( this.properties.numElements >= this.properties.capacity );
	};

	Container.prototype.redraw = function()
	{
		if( this.getProperty( 'full' ) )
		{
			this.node.src = CONTEXT_PATH + '/images/containers/' + this.properties.name + '_llena.png';
		}
		else
		{
			this.node.src = CONTEXT_PATH + '/images/containers/' + this.properties.name + '.png';
		}
	};

	return Container;
});


