/*
 Tripper
 ----------------------
 Author:         Nagendra Dwarakinath
 Created Date:   21st Dec 2013
 Purpose:

 Supported By:
 Reviewed By:

 Update History
 -------------------------------------------------------------------------------
 Name(developer name)        Date (updated date)     Purpose (description)

 */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['*.js', 'modules/**/*.js','test/**/*.js']
        },
        uglify: {
            options:{
                banner: '/*! <%= pkg.name %>' +
                    ' <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: 'modules/trip/repositories/tripRepository.js',
                dest: 'deploy/modules/trip/repositories/<%= pkg.name %>.<%= pkg.version %>.min.js'
            }
        },
        removelogging:{
            dist:{
                src: 'modules/trip/repositories/tripRepository.js',
                dest: 'deploy/modules/trip/repositories/tripRepository.min.js'
            }
        },
        cafemocha: {
            unitTests: {
                src: 'test/*/*.js',
                options: {
                    ui: 'bdd',
                    require: [
                        'should'
                    ],
                    reporter: 'spec'
                }
            }
        },
        mochacov: {
            options: {
                reporter: 'xunit-file',
                require: ['should'],
                bail: false
            },
            all: ['test/tripModule/trip.js']
        },
        blanket_mocha: {
            all: [ 'specs/index.html' ],
            options: {
                threshold: 70
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-remove-logging');
    grunt.loadNpmTasks('grunt-cafe-mocha');
    grunt.loadNpmTasks('grunt-mocha-cov');
    grunt.loadNpmTasks('grunt-blanket-mocha');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'uglify','removelogging','cafemocha','mochacov']);

};
