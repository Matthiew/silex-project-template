define([
	'base/view',
	'hbs!templates/layout/site'
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
			mainRegion: '#mainRegion'
		}
	});

});