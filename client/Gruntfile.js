/* global module:false */
module.exports = function ( grunt ) {
    'use strict';

    var projectName = 'project';

    /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-preprocess');

    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    grunt.initConfig({
        /**
         * The directory to which we throw our compiled project files.
         */
        distdir: 'build',

        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * The banner is the comment that is placed at the top of our compiled
         * source files. It is first processed as a Grunt template, where the `<%=`
         * pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner:
                '/**\n' +
                ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' */\n'
        },

        preprocess : {
            options : {
                context : {
                    PROJECT_NAME : projectName
                }
            },
            development : {
                files : {
                    'build/index.html' : '_index.html'
                },
                options: {
                    context : {
                        ENVIRONMENT : 'development'
                    }
                }
            },
            qa : {
                files : {
                    'build/index.html' : '_index.html'
                },
                options: {
                    context : {
                        ENVIRONMENT : 'qa'
                    }
                }
            },
            production : {
                files : {
                    'build/index.html' : '_index.html'
                },
                options: {
                    context : {
                        ENVIRONMENT : 'production'
                    }
                }
            }
        },

        /**
         * This is a collection of file definitions we use in the configuration of
         * build tasks. `js` is all project javascript, less tests. `atpl` contains
         * our reusable components' template HTML files, while `ctpl` contains the
         * same, but for our app's code. `html` is just our main HTML file and
         * `less` is our main stylesheet.
         */
        src: {
            js: [ 'src/**/*.js', '!src/**/*.spec.js' ],
            atpl: [ 'src/app/**/*.tpl.html' ],
            ctpl: [ 'src/components/**/*.tpl.html' ],
            tpljs: [ '<%= distdir %>/tmp/**/*.js' ],
            html: [ 'src/index.html' ],
            sass: 'src/sass/main.scss',
            unit: [ 'src/**/*.spec.js' ]
        },

        /**
         * The directory to delete when `grunt clean` is executed.
         */
        clean: [ '<%= distdir %>' ],

        /**
         * `grunt copy` just copies files from A to B. We use it here to copy our
         * project assets (images, fonts, etc.) into our distribution directory.
         */
        copy: {
            media : {
                files : [
                    {
                        src    : ['fonts/**'],
                        dest   : '<%= distdir %>/_media',
                        expand : true
                    },
                    {
                        src    : ['img/**'],
                        dest   : '<%= distdir %>/_media',
                        expand : true
                    },
                    {
                        src    : ['data/**'],
                        dest   : '<%= distdir %>',
                        expand : true
                    }
                ]
            }
        },

        /**
         * `grunt concat` concatenates multiple source files into a single file.
         */
        concat: {
            /**
             * The `libs` target is for all third-party libraries we need to include
             * in the final distribution. They will be concatenated into a single
             * `libs.js` file.  One could combine this with the above for a single
             * payload, but then concatenation order will obviously be important to
             * get right.
             */
            libs: {
                src: [
                    'bower_components/jquery/jquery.js',
                    'bower_components/requirejs/require.js',
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/foundation/js/foundation/foundation.js',
                    'bower_components/foundation/js/foundation/foundation.forms.js'
                ],
                dest: '<%= distdir %>/scripts/vendor.js'
            }
        },

        requirejs: {
            compile: {
                options: {
                    baseUrl        : './application',
                    mainConfigFile : './config.js',
                    name           : 'bootstrap',
                    out            : '<%= distdir %>/scripts/app.js',
                    optimize       : 'none'
                }
            }
        },

        compass: {
            compile: {
                options : {
                    sassDir        : 'scss',
                    cssDir         : '<%= distdir %>/_media/css',
                    httpImagesPath : '/_media/img/css-images',
                    imagesDir      : 'img/css-images'
                }
            }
        },

        /**
         * And for rapid development, we have a watch set up that checks to see if
         * any of the files listed below change, and then to execute the listed
         * tasks when they do. This just saves us from having to type "grunt" into
         * the command-line every time we want to see what we're working on; we can
         * instead just leave "grunt watch" running in a background terminal. Set it
         * and forget it, as Ron Popeil used to tell us.
         *
         * But we don't need the same thing to happen for all the files.
         */
        delta: {
            /**
             * By default, we want the Live Reload to work for all tasks; this is
             * overridden in some tasks (like this file) where browser resources are
             * unaffected. It runs by default on port 35729.
             */
            options: {
                livereload: true
            },

            /**
             * When our source files change, we want to run most of our build tasks.
             */
            scripts: {
                files: [
                    'application/**/*.js',
                    'application/**/*.hbs',
                    'config.js',
                    'application.js',
                    '_index.html'
                ],
                tasks: ['requirejs'],
                options: {
                    interrupt: true
                }
            },

            styles: {
                files: [
                    'scss/**',
                    'fonts/**',
                    'img/**'
                ],
                tasks: ['compass'],
                options: {
                    interrupt: true
                }
            },

            compiled: {
                files: ['build/**/*'],
                options: {
                    interrupt: true
                }
            },

            /**
             * When assets are changed, copy them. Note that this will *not* copy new
             * files, so this is probably not very useful.
             */
            assets: {
                files: [
                    'src/assets/**/*'
                ],
                tasks: [ 'copy' ]
            }
        }
    });

    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean build
     * before watching for changes.
     */
    grunt.renameTask( 'watch', 'delta' );
    grunt.registerTask( 'watch', [ 'development', 'delta' ] );

    /**
     * The default task is to build.
     */
    grunt.registerTask( 'default', [ 'qa' ] );
    grunt.registerTask( 'development', [ 'build', 'preprocess:development' ] );
    grunt.registerTask( 'qa', [ 'build', 'preprocess:qa' ] );
    grunt.registerTask( 'production', [ 'build', 'preprocess:production' ] );
    grunt.registerTask( 'build', ['clean', 'concat', 'requirejs', 'copy', 'compass'] );

    /**
     * A task to build the project, without some of the slower processes. This is
     * used during development and testing and is part of the `watch`.
     */
    grunt.registerTask( 'quick-build', ['clean', 'jshint', 'concat', 'index', 'copy'] );
};