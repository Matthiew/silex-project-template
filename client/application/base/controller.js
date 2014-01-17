define([
	'chaplin'
], function(
	Chaplin
) {
	'use strict';

	return Chaplin.Controller.extend({

		beforeAction: function()
		{
			Chaplin.Controller.prototype.beforeAction.call(this);
		}

	});

});
