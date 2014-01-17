/* global Backbone:false */
define([
	'underscore',
	'jquery',
	'chaplin'
], function(
	_,
	$,
	Chaplin
) {
	'use strict';

	// Define base model
	return Chaplin.Model.extend({

		initialize: function(attributes, options)
		{
			this.options = options || {};

			// Include the Chaplin SyncMachine
			_(this).extend(Chaplin.SyncMachine);

			// Include Backbone validation
			_(this).extend(Backbone.Validation.mixin);

			Chaplin.Model.prototype.initialize.apply(this, arguments);
		},

		fetch: function(options)
		{
			var wrappedOptions,
				errorCallback,
				successCallback,
				instance = this;

			options = options || {};

			successCallback = function()
			{
				if (typeof options.success === 'function')
				{
					options.success.apply(instance, arguments);
				}

				instance.fetchSuccess.apply(instance, arguments);
			};

			errorCallback = function()
			{
				if (typeof options.error === 'function')
				{
					options.error.apply(instance, arguments);
				}

				instance.fetchError.apply(instance, arguments);
			};

			this.beginSync();

			wrappedOptions = _.extend({}, options, {
				success : successCallback,
				error   : errorCallback
			});

			return Chaplin.Model.prototype.fetch.call(this, wrappedOptions);
		},

		fetchSuccess: function()
		{
			this.finishSync();
		},

		fetchError: function(model, xhr, options)
		{
			this.abortSync();
		},

		save: function(key, value, options)
		{
			var instance = this,
				success,
				saveResult;

			if (_.isObject(key) || key == null)
			{
				options = value;
			}

			options = options || {};

			success = options.success;

			options.success = function(model, response)
			{
				if ( ! options.silent)
				{
					instance.finishSync();
				}

				if (success)
				{
					success(model, response);
				}
			};

			if (options.parse === undefined && ! this.isNew())
			{
				options.parse = false;
			}

			if ( ! options.silent)
			{
				this.beginSync();
			}

			saveResult = Chaplin.Model.prototype.save.call(this, key, options);

			if ( ! saveResult)
			{
				saveResult = $.Deferred().reject({});
			}

			return saveResult;
		},

		destroy : function()
		{
			var destroyResult;

			destroyResult = Chaplin.Model.prototype.destroy.apply(this, arguments);

			if ( ! destroyResult)
			{
				// Backbone doesn't return a promise if the object was not
				// persisted to the server (i.e. model only existed in memory)
				// so let's return one ourselves to make things consistent
				return $.Deferred().resolve();
			}

			return destroyResult;
		}

	});

});
