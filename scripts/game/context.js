
define({
	score: 0,
	canPassLevel: function()
	{
		var minCorrectMovements = this.gameVars.currentLevel in this.levels ? this.levels[ this.gameVars.currentLevel ].minCorrectMovements : 7;
		return this.gameVars.correctMovements > minCorrectMovements;
	},
});

