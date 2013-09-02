
define( function()
	{
		function DomUtils()
		{
		}

		DomUtils.removeNode = function( node )
		{
			if( node.parentNode )
			{
				node.parentNode.removeChild( node );
			}
		};

		return DomUtils;
	}
);

