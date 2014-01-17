define([
	'base/view',
	'hbs!templates/site'
], function(
	View,
	template
) {
	'use strict';

	return View.extend({
		container : 'body',
		id        : 'site-container',
		template  : template,

		regions : {
			main: '#main-container'
		}
	});

});