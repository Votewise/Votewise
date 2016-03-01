var test = require('tape').test;
var auth = require('.././auth');
var async = require('async');

test('auth', function(t) {
    t.test('newPassword/checkPassword', function(t) {
        t.plan(5);

        auth.newPassword('g00by', function(err, hashed) {
            t.error(err, 'newPassword succeeds');

            auth.checkPassword('g00by', hashed, function(err, ok) {
                t.error(err, 'checkPassword succeeds');
                t.ok(ok, 'g00by successfuly compares against the hash');
            });

            auth.checkPassword('g0oby', hashed, function(err, ok) {
                t.error(err, 'checkPassword succeeds');
                t.notOk(ok, 'g0oby fails to compare against the hash');
            });
        });
    });

    t.test('Same password hashes differently', function(t) {
        t.plan(2);

        async.parallel({
            hash1: auth.newPassword.bind(null, 'g00by'),
            hash2: auth.newPassword.bind(null, 'g00by')
        }, function(err, hashes) {
            t.error(err);

            t.notEqual(hashes.hash1, hashes.hash2, 'Hashes are different');
        });
    });

    t.test('createToken/parseToken', function(t) {
        t.plan(2);

        var data = {id: 1};
        var token = auth.createToken(data);
        var parsed = auth.parseToken(token);

        t.equal(typeof token, 'string', 'Token is a string');
        t.deepEqual(parsed, data, 'Authtoken can be encrypted and parsed');
    });
});

