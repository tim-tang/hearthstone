'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    require: 'coverage/blanket'
                },
                src: ['test/**/*-test.js']
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    // use the quiet flag to suppress the mocha console output
                    quiet: true,
                    // specify a destination file to capture the mocha
                    // output (the quiet option does not suppress this)
                    captureFile: 'coverage.html'
                },
                src: ['test/**/*-test.js']
            },
            // The travis-cov reporter will fail the tests if the
            // coverage falls below the threshold configured in package.json
            'travis-cov': {
                options: {
                    reporter: 'travis-cov'
                },
                src: ['test/**/*.js']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', '**/*.js', '!node_modules/**/*.js', '!test/**/*.js']
        },
        clean: {
            dist: ['coverage.html']
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Register tasks
    grunt.registerTask('default', ['clean', 'jshint', 'mochaTest']);
    //grunt.registerTask('dev', ['watch']);
};
