define([
	'base/view',
	'hbs!templates/hello-world'
], function(
	View,
	template
) {
	'use strict';

	return View.extend({
		// Automatically render after initialize
		autoRender: true,

		className: 'hello-world',

		// Save the template string in a prototype property.
		// This is overwritten with the compiled template function.
		// In the end you might want to used precompiled templates.
		template: template
	});

});