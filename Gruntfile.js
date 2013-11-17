'use strict';
module.exports = function (grunt) {

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/**/*-test.js']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', '**/*.js', '!node_modules/**/*.js', '!test/**/*.js']
        },
        clean: {
            dist: ['assets/themes/mark-reid/css/main.min.css', 'assets/themes/mark-reid/js/scripts.min.js']
        }
    });

    // Load tasks
    //grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Register tasks
    grunt.registerTask('default', ['jshint', 'mochaTest']);
    //grunt.registerTask('dev', ['watch']);
};
