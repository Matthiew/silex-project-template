define([
	'base/view',
	'models/hello-world',
	'react',
	'templates/hello/index'
], function(
	View,
	HelloWorldModel,
	React,
	reactTemplate
) {
	'use strict';

	return View.extend({
		// Automatically render after initialize
		autoRender: true,
		autoAttach: true,

		region: 'mainRegion',

		attach : function()
		{
			var model = new HelloWorldModel();
			window.myModel = model;
			React.renderComponent(reactTemplate({
				model : model
			}), this.el);
			View.prototype.attach.apply(this, arguments);
		}
	});

});