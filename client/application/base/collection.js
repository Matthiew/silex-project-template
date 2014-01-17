define([
	'chaplin',
	'underscore',
	'base/model'
], function(
	Chaplin,
	_,
	Model
) {
	'use strict';

	return Chaplin.Collection.extend({

		fetchSuccess : Model.prototype.fetchSuccess,
		fetchError   : Model.prototype.fetchError,
		fetchAgain   : Model.prototype.fetchAgain,

		initialize: function(attributes, options)
		{
			this.options = options || {};

			Chaplin.Collection.prototype.initialize.apply(this, arguments);
			_(this).extend(Chaplin.SyncMachine);
		},

		fetch: function(options)
		{
			options = options || {};

			this.beginSync();

			_.extend(options, this.options, {
				success : _.bind(this.fetchSuccess, this),
				error   : _.bind(this.fetchError, this)
			});

			return Chaplin.Collection.prototype.fetch.apply(this, [options]);
		}

	});
});
