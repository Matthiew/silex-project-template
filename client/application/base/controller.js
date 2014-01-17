define([
	'chaplin',
	'views/layout/site'
], function(
	Chaplin,
	SiteView
) {
	'use strict';

	return Chaplin.Controller.extend({

		beforeAction: function()
		{
			Chaplin.Controller.prototype.beforeAction.call(this);

			this.compose('site', SiteView, {});
		}

	});

});
