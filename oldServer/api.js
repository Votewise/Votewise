var async = require('async');
var bodyParser = require('body-parser');
var express = require('express');
var auth = require('./auth');

function NotFound(message) {
    Error.call(this, message);
    this.status = 404;
}

function Forbidden(message) {
    Error.call(this, message);
    this.status = 403;
}

function Conflict(message) {
    Error.call(this, message);
    this.status = 409;
}

function register(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    auth.newPassword(password, function(err, hashed) {
        if (err) return next(err);

        req.db.query('insert into users (userName, passwordHash) values (?, ?)',
                 [username, hashed], function(err) {
            if (err) {
                // errno 1062 is what mysql returns for duplicate rows.
                if (err.errno == 1062) {
                    next(new Conflict('A settings with that username already exists.'));
                } else {
                    next(err);
                }
            } else {
                res.status(201).json({});
            }
        });
    });
}

function login(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    console.log('username: ', username,' password: ', password);

    req.db.query('select id, passwordHash from users where userName = ?',
        [username], function(err, rows, fields) {
        if (err) return next(err);

        if (rows.length < 1) {
            return next(new NotFound('No settings with that username exists.'));
        }

        var user = rows[0];
        console.log('settings: ', user);

        auth.checkPassword(password, user.passwordHash, function(err, ok) {
            if (err) return next(err);

            if (!ok) {
                return next(new Forbidden('Incorrect password.'));
            }

            res.json({
                token: auth.createToken(JSON.stringify({id: user.id}))
            });
        });
    });
}

function getTopicTree(req, res, next) {
    var topic = req.params.topic;

    async.waterfall([
        function(callback) {
            req.db.query('select id from topics where description = ?',
                [topic], function(err, rows){
                    callback(err, rows);
                });
        },
        function(rows, callback) {
            var query = rows[0].id
            req.db.query('select id, background, viewOrder, description from topics where parent = ? order by viewOrder',
                [query], function(err, rows){
                    callback(err, rows);

                });
        },
        function(topics, callback){
            async.forEachOf(topics, function(row, key, callback){
                if (topics[key].background == 0){
                    var query = topics[key].id
                    req.db.query('select id, background, viewOrder, description from topics where parent = ? order by viewOrder',
                        [query], function(err, rows){
                            if (err){
                                return callback(err);
                            }
                            topics[key].subTopics = rows;
                            callback();
                            });
                } else {
                    callback();
                }
            }, function(err){
                callback(err, topics);
            });
        }
    ], function(err, topics){
        if (err) return next(err);
        res.json(topics);
    });
}

function questionsByBackgroundId(req, res, next){
    var questionSet = req.params.id;

    req.db.query('select description, id, viewOrder from concurrenceQuestions where background = ?',
        [questionSet], function(err, rows){
        if (err) return next(err);

        res.json(rows);
    });
}

function postPoliticianList(req,res){
    var items = req.body.listItems
    console.log('items: ', items);
    console.log('/politician-list post call called')
    async.forEachOf(items, function(item, key, callback){
        console.log(items[key]);
        db.query('INSERT INTO politicianLists SET ?', items[key], function(err, result){
            console.log('result from insert query: ', result);
            console.error('error: ', err);
        });
    });
}

function meInfo(req, res) {
    var user = req.authorize();

    res.json(user);
}

module.exports = function(db) {
    var app = express();

    app.use(express.static('../dist/app/dev'));
    app.use(bodyParser.json());
    app.use(function(req, res, next) {
        req.db = db;
        next();
    });
    app.use(function(req, res, next) {
        req.authorize = function() {
            var token = req.headers.authorization;

            if (token) {
                console.log('parsed', auth.parseToken(token));
                return JSON.parse(auth.parseToken(token));
            } else {
                throw new Forbidden('A valid authtoken is needed to access this page.');
            }
        };
        next();
    });

    app.post('/login', login);
    app.post('/register', register);
    app.get('/backgrounds/:id/questions', questionsByBackgroundId);
    app.get('/topic-tree/:topic', getTopicTree);
    app.post('/politician-list', postPoliticianList);
    app.get('/me/info', meInfo);

    app.use(function(err, req, res, next) {
        if (err.status) {
            res.status(err.status).json({
                message: err.message
            });
        } else {
            console.error(err.stack);
            res.status(500).json({
                message: 'Internal server error'
            });
        }
    });

    return app;
};