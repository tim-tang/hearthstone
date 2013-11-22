'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        // Configure a mochaTest task
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    colors: true,
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
                    captureFile: 'docs/coverage.html'
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
        docco: {
            debug: {
                src: ['handler/**/*.js', 'server/**/*.js', 'service/**/*.js', 'model/**/*.js', 'common/**/*.js'],
                options: {
                    output: 'docs/'
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', '**/*.js', '!node_modules/**/*.js', '!test/**/*.js']
        },
        clean: {
            dist: ['docs/public', 'docs/*.html']
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-docco');

    // Register tasks
    grunt.registerTask('default', ['clean', 'jshint', 'mochaTest']);
    grunt.registerTask('doc', ['docco']);
};
