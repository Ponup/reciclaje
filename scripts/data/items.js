
define( [ 'data/containerType' ], function( ContainerType )
{
	return [
		{
			name: 'azucar',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: -3,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}

			}
		},
		{
			name: 'banana',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: -2,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'bolsa',
			container: ContainerType.PLASTIC,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: 0,
					recyclingPlant: 0,
				}
			}
		},
		{
			name: 'botella_plastico',
			container: ContainerType.PLASTIC,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: 0,
					recyclingPlant: 0,
				}
			}
		},
		{
			name: 'botella_vidrio',
			container: ContainerType.GLASS,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: 0,
					recyclingPlant: 0,
				}
			}
		},
		{
			name: 'botella_vidrio_rota',
			container: ContainerType.GLASS,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: 0,
					recyclingPlant: 0,
				}
			}
		},
		{
			name: 'cafe',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: -2,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'caja_carton',
			container: ContainerType.PAPER,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: -10,
					recyclingPlant: 10,
				}
			}
		},
		{
			name: 'carta',
			container: ContainerType.PAPER,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: -10,
					recyclingPlant: 10,
				}
			}
		},
		{
			name: 'cd',
			container: ContainerType.PLASTIC,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: 0,
					recyclingPlant: 0,
				}
			}
		},
		{
			name: 'copa_llena',
			container: ContainerType.GLASS,
			scoring:
			{
				ph: -1,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'copa',
			container: ContainerType.GLASS,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: 0,
					recyclingPlant: 0,
				}
			}
		},
		{
			name: 'dentifrico',
			container: ContainerType.PLASTIC,
			scoring:
			{
				ph: 2,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'detergente',
			container: ContainerType.PLASTIC,
			scoring:
			{
				ph: 1,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'gaseosa_llena',
			container: ContainerType.PLASTIC,
			scoring:
			{
				ph: -3,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'huevos',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: 1,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'jabon',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: 3,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'jarra_vidrio',
			container: ContainerType.GLASS,
			scoring:
			{
				ph: -2,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'leche',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: 1,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'libro',
			container: ContainerType.PAPER,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: -10,
					recyclingPlant: 10,
				}
			}
		},
		{
			name: 'limon',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: -1,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'pan',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: -2,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'papel',
			container: ContainerType.PAPER,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester:-10,
					recyclingPlant: 10,
				}
			}
		},
		{
			name: 'pescado',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: 1,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'pilas',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: -4,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'queso',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: -3,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'revista',
			container: ContainerType.PAPER,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: -10,
					recyclingPlant: 10,
				}
			}
		},
		{
			name: 'tomate',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: 1,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'tupper',
			container: ContainerType.PLASTIC,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: 0,
					recyclingPlant: 0,
				}
			}
		},
		{
			name: 'vaso',
			container: ContainerType.GLASS,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: 0,
					recyclingPlant: 0,
				}
			}
		},
		{
			name: 'vinagre',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: -3,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'zanahoria',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: 3,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'manzana',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: 2,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'brocoli',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: 4,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'teverde',
			container: ContainerType.ORGANIC,
			scoring:
			{
				ph: 3,
				picker:
				{
					bioDigester: 10,
					recyclingPlant: -10,
				}
			}
		},
		{
			name: 'papeles',
			container: ContainerType.PAPER,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: -10,
					recyclingPlant: 10,
				}
			}
		},
		{
			name: 'avion_papel',
			container: ContainerType.PAPER,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: -10,
					recyclingPlant: 10,
				}
			}
		},
		{
			name: 'anotador',
			container: ContainerType.PAPER,
			scoring:
			{
				ph: 0,
				picker:
				{
					bioDigester: -10,
					recyclingPlant: 10,
				}
			}
		},
	];
});

