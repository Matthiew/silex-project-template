define([
	'base/controller',
	'models/hello-world',
	'views/hello-world-view'
], function(
	Controller,
	HelloWorld,
	HelloWorldView
) {
	'use strict';

	return Controller.extend({
		show: function(params) {
			this.model = new HelloWorld();
			this.view = new HelloWorldView({
				model: this.model,
				region: 'main'
			});
		}
	});

});