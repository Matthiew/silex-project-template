define([
	'base/view',
	'react',
	'templates/hello/index'
], function(
	View,
	React,
	reactTemplate
) {
	'use strict';

	return View.extend({
		// Automatically render after initialize
		autoRender: true,
		autoAttach: true,

		className: 'hello-world',
		region: 'mainRegion',

		attach : function()
		{
			React.renderComponent(reactTemplate({
				name: 'Ben'
			}), this.el);
			View.prototype.attach.apply(this, arguments);
		}
	});

});