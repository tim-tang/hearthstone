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
        var riakConf = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../resources/riak-conf.json'), 'UTF-8'));
        this.riakClient = riak.getClient(riakConf.production);
    };

var riakManager = new RiakManager();

/* Pulbic Riak Manager APIs */
module.exports = riakManager;
