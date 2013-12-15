/* global requirejs */
requirejs.config({
    paths: {
        jquery      : '../bower_components/jquery/jquery',
        backbone    : '../bower_components/backbone/backbone',
        chaplin     : '../bower_components/chaplin/chaplin',
        handlebars  : '../bower_components/handlebars/handlebars',
        hbs         : '../bower_components/requirejs-hbs/hbs',
        underscore  : '../bower_components/underscore/underscore'
    },
    shim: {
        jquery : {
            exports : 'jquery'
        },
        backbone : {
            deps    : ['underscore'],
            exports : 'Backbone'
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