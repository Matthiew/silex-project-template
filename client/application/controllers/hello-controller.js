define([
	'base/controller',
	'models/hello-world',
	'views/hello/world',
	'views/hello/index'
], function(
	Controller,
	HelloWorld,
	HelloWorldView,
	HelloIndexView
) {
	'use strict';

	return Controller.extend({
		show: function(params) {
			this.model = new HelloWorld();
			this.view = new HelloWorldView({
				model  : this.model,
				region : 'mainRegion'
			});
		},

		index : function() {
			this.view = new HelloIndexView({});
		}
	});

});