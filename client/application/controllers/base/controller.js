define([
    'chaplin',
    'views/site-view'
], function(
    Chaplin,
    SiteView
) {
    'use strict';

    return Chaplin.Controller.extend({
        // Place your application-specific controller features here.
        beforeAction: function() {
            this.compose('site', SiteView);
        }
    });

});