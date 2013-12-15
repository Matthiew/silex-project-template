/* global window:false, require:false, document:false */
require([
    'jquery',
    'application',
    'routes'
], function (
    $,
    Application,
    routes
) {
    'use strict';

    $(document).ready(
        function()
        {
            window.app = new Application({
                controllerSuffix : '-controller',
                routes           : routes
            });
        }
    );

});