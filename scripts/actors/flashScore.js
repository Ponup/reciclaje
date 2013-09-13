
define( [ 'scullge/actor' ], function( BaseActor )
	{
		function FlashScore( score )
		{
			BaseActor.call( this );
			
			this.score = score;
		}

		FlashScore.prototype = new BaseActor();
		FlashScore.prototype.constructor = FlashScore;

		FlashScore.prototype.init = function()
		{
			BaseActor.prototype.init.call( this );

			var flashScore = document.createElement( 'div' );
			flashScore.className = 'FlashScore';
			flashScore.innerHTML = ( this.score >= 0 ? '+' : '' ) + this.score;

			var style = flashScore.style;
			style.position = 'absolute';
			style.top = this.properties.img.style.top;
			style.left = ( parseInt( this.properties.img.style.left ) - 64 ) + 'px';
			style.fontSize = '44px';
			style.fontFamily = 'GameFont';
			style.textShadow = '0px 5px 0px rgba(0, 0, 0, .2)';
			style.color = '#f2c40f';
			style.opacity = 0;
			style.zIndex = 5;
			style.textAlign = 'center';
			style.width = '192px';
			style.height = '100px';
			style.verticalAlign = 'middle';
			style.lineHeight = '100px';
			$( '.Scene' ).append( flashScore );

			$( flashScore )
				.animate({
					fontSize: '120px',
					opacity: 80,
				}, 200 )
				.animate({
					fontSize: '40px',
					opacity: 0,
				}, 200 )
			;
		};

		return FlashScore;
	}
);
