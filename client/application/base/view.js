define([
	'underscore',
	'jquery',
	'chaplin'
], function(
	_,
	$,
	Chaplin
) {
	'use strict';

	return Chaplin.View.extend({

		bindings: 'data-bind',

		initialize : function()
		{
			Chaplin.View.prototype.initialize.apply(this, arguments);
		},

		getTemplateFunction : function()
		{
			return this.template;
		},

		redirectTo : function(pathDesc, params, options)
		{
			params = params || {};

			Chaplin.helpers.redirectTo(pathDesc, params, options);
		}

	});

});
