define([
	'base/controller',
	'models/hello-world',
	'views/hello/index'
], function(
	Controller,
	HelloWorld,
	HelloIndexView
) {
	'use strict';

	return Controller.extend({

		index : function() {
			this.view = new HelloIndexView({});
		}
	});

});