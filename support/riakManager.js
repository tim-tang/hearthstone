/**
 * Fetch riak client.
 *
 * @Author tim.tang
 */

var riak = require('riak-js'),
    fs = require('fs'),
    path = require('path'),
    riakClient;

var RiakManager = function RiakManager() {
        var riakConf = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../conf/riak-conf.json'), 'UTF-8'));
        var envConf;
        if (process.env.NODE_ENV) {
            console.log('Riak use %s environment.', process.env.NODE_ENV);
            envConf = riakConf.production;
        }else{
            console.log('Riak use development environment.');
            envConf = riakConf.development;
        }
        this.riakClient = riak.getClient(envConf);
    };

var riakManager = new RiakManager();

/* Pulbic Riak Manager APIs */
module.exports = riakManager;
