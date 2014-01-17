define([
	'jquery',
	'chaplin'
], function(
	$,
	Chaplin
) {
	'use strict';

	return Chaplin.Layout.extend({

		initialize: function(options)
		{
			Chaplin.Layout.prototype.initialize.apply(this, arguments);
		}

	});
});
