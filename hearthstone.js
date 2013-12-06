/**
 * Application server init.
 *
 * @author tim.tang
 */

"use strict";
require('newrelic');
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

console.log("CPU Numbers ** %s", numCPUs);
if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', function(worker, code, signal) {
        console.log('Hearthstone worker ' + worker.process.pid + ' died');
    });
} else {
    // Workers can share any TCP connection
    // In this case its a HTTP server
    var restfulServer = require('./server/restfulServer');
}
