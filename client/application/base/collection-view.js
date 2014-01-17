define([
	'chaplin'
], function(
	Chaplin
) {
	'use strict';

	return Chaplin.CollectionView.extend({

		prependToContainer : false,

		initialize: function(options)
		{
			Chaplin.CollectionView.prototype.initialize.call(this, options);
		},

		getTemplateFunction: function()
		{
			return this.template;
		}

	});
});
