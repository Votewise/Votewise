var config = require('./config');
var dbutil = require('.././dbutil');
var makeAPI = require('.././api');
var mysql = require('mysql');
var stream = require('stream');
var tape = require('tape');
var util = require('util');

exports.registerDBTest = function() {
    tape.Test.prototype.dbtest = function(name, opts, block) {
        var db = mysql.createConnection({
            connectionLimit: config.db.connectionLimit,
            host:            config.db.host,
            user:            config.db.user,
            password:        config.db.password,
            database:        config.db.database,
            port:            config.db.port
        });

        // If opts aren't passed, block will be undefined; reassign block as the
        // opts parameter.
        if (typeof block === 'undefined') {
            block = opts;
            opts = {};
        }

        this.test(name, opts, function(t) {
            dbutil.transaction(db, function(done) {
                t.on('end', function() {
                    done('rollback'); // always rollback in a test
                });

                t.db = db;

                block(t);
            }, function(err) {
                if (err && err !== 'rollback') throw err;

                db.end(function(err) {
                    if (err) throw err;
                });
            });
        });
    };
};

util.inherits(Request, stream.Readable);

function Request(options) {
    stream.Readable.call(this, {});

    this.method = options.method;
    this.url = options.url;
    this.headers = options.headers || {};

    if (options.jsonbody) {
        var json = JSON.stringify(options.jsonbody);

        this.headers['content-encoding'] = 'identity';
        this.headers['content-length']   = json.length;
        this.headers['content-type']     = 'application/json';

        this.push(json);
        this.push(null);
    }
}

// We need this otherwise the repl complains.
Request.prototype._read = function() {};

exports.callAPI = function(req, done) {
    var app = makeAPI(req.db);

    var result = {
        headers: {},
        status:  200
    };

    var res = {
        setHeader: function(name,value){
            result.headers[name.toLowerCase()] = value
            return this;
        },
        status: function(code) {
            result.status = code;
            return this;
        },
        json: function(data) {
            result.jsonbody = data;
            done(result);
        }
    };

    app(new Request(req), res, function() {
        done(result);
    });
};

