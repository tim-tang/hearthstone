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
        api_benchmark: {
            default_options: {
                options: {
                    output: 'docs/benchmark'
                },
                files: {
                    'report.html': 'test/benchmark/api-benchmarks.json'
                }
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
        shell: {
            migrate: {
                options: {
                    stdout: true,
                    failOnError: true
                },
                command: ['mongoose-fixture --fixture=init --remove', 'mongoose-fixture --fixture=init --add'].join('&&')
            },
            purge: {
                options: {
                    stdout: true,
                    failOnError: true
                },
                command: 'mongoose-fixture --fixture=init --remove'
            }
        },
        clean: {
            dist: ['docs/public', 'docs/*.html']
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-api-benchmark');
    grunt.loadNpmTasks('grunt-docco');
    grunt.loadNpmTasks('grunt-shell');

    // Register tasks
    grunt.registerTask('default', ['clean', 'jshint', 'shell:purge', 'mochaTest']);
    grunt.registerTask('benchmark', ['api_benchmark']);
    grunt.registerTask('doc', ['docco']);
    grunt.registerTask('migrate', ['shell:migrate']);
    grunt.registerTask('purge', ['shell:purge']);

};
