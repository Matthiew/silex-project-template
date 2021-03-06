/* global requirejs */
requirejs.config({
    paths: {
        jquery                : '../bower_components/jquery/jquery',
        backbone              : '../bower_components/backbone/backbone',
        chaplin               : '../bower_components/chaplin/chaplin',
        handlebars            : '../bower_components/handlebars/handlebars',
        hbs                   : '../bower_components/requirejs-hbs/hbs',
        underscore            : '../bower_components/underscore/underscore',
        'backbone-validation' : '../bower_components/backbone.validation/dist/backbone-validation-amd',
        react                 : '../bower_components/react/react-with-addons',
        'react.backbone'      : '../bower_components/react.backbone/react.backbone'
    },
    shim: {
        jquery : {
            exports : 'jquery'
        },
        backbone : {
            deps    : ['underscore'],
            exports : 'Backbone'
        },
        'backbone-validation' : {
            deps : ['backbone']
        },
        chaplin : {
            deps    : ['backbone']
        },
        handlebars: {
            exports: 'Handlebars'
        },
        hbs : {
            deps : ['handlebars']
        },
        underscore : {
            exports : '_'
        }
    }
});