define([
	'chaplin',
	'base/model'
], function(
	Chaplin,
	Model
) {
	'use strict';

	return Model.extend({

		defaults: {
			message: 'Hello World!'
		}

	});

});