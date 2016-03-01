var test = require('tape-catch');
var util = require('./util');

util.registerDBTest();
var callAPI = util.callAPI;

test('API calls', function(t) {
    t.dbtest('/backgrounds/:id/questions', function(t) {
        t.plan(2);

        callAPI({
            db: t.db,
            method: 'get',
            url: '/backgrounds/3/questions'
        }, function(res) {
            t.equal(res.status, 200);
            t.deepEqual(res.jsonbody,  [
                { description: 'All businesses should be required to provide ' +
                               'health insurance or contribute to a pool so '  +
                               'that everyone who is working gets health care.'
                , id: 538
                },
                { description: 'To avoid this, one hour of work should earn '  +
                               'you one hour worth of benefits.  This way, '   +
                               'no one would be capped at some small number '  +
                               'of hours just they could avoid paying benefits.'
                , id: 539
                },
                { description: 'American businesses are overburdened as it '   +
                               'is. Additional costs of production will have ' +
                               'to be passed on as raised prices. Our '        +
                               'products are hard enough to sell overseas as ' +
                               'it is, and this will price them out of the '   +
                               'market.'
                , id: 540
                },
                { description: 'This isn’t that big an issue. Things seem fine.'
                , id: 541
                }
            ]);
        });
    });

    t.dbtest('/topic-tree/3', function(t) {
        t.plan(2);

        callAPI({
            method: 'get',
            url: '/topic-tree/Energy',
            db: t.db
        }, function(res) {
            t.equal(res.status, 200);
            t.deepEqual(res.jsonbody, [
                { description: 'General'
                , background: 0, id: 49 , subTopics: [] , viewOrder: 1 },
                { description: 'Conservation And Increased Efficiency'
                , background: 12, id: 50 , viewOrder: 2 },
                { description: 'Carbon Cap And Trade'
                , background: 5 , id: 51 , viewOrder: 3 },
                { description: 'Fracking'
                , background: 24, id: 52, viewOrder: 4 },
                { description: 'Oil'
                , background: 49 , id: 53 , viewOrder: 5 },
                { description: 'Coal'
                , background: 10 , id: 54 , viewOrder: 6 },
                { description: 'Natural Gas'
                , background: 47 , id: 55 , viewOrder: 7 },
                { description: 'Nuclear Power'
                , background: 48 , id: 56 , viewOrder: 8 },
                { description: 'Wind'
                , background: 86 , id: 57 , viewOrder: 9 },
                { description: 'Solar'
                , background: 64 , id: 58 , viewOrder: 10 },
                { description: 'Favorites'
                , background: 0 , id: 59 , subTopics: [] , viewOrder: 11 }
            ]);
        });
    });

    t.dbtest('/register', function(t) {
        var db = t.db;

        t.test('/register creates a new settings', function(t) {
            t.plan(1);

            callAPI({
                db: db,
                method: 'post',
                url: '/register',
                jsonbody: {username: 'tom', password: 'g00by'}
            }, function(res) {
                t.equal(res.status, 201);
            });
        });

        t.test("/register doesn't recreate an existing settings", function(t) {
            t.plan(1);

            callAPI({
                db: db,
                method: 'post',
                url: '/register',
                jsonbody: {username: 'tom', password: 'g00by'}
            }, function(res) {
                t.equal(res.status, 409);
            });
        });
    });

    t.dbtest('/login', function(t) {
        var db = t.db;

        t.test('/register creates a new settings', function(t) {
            t.plan(1);

            callAPI({
                db: db,
                method: 'post',
                url: '/register',
                jsonbody: {username: 'tom', password: 'g00by'}
            }, function(res) {
                t.equal(res.status, 201);
            });
        });

        t.test('/login fails with incorrect password', function(t){
            t.plan(1);

            callAPI({
                db:db,
                method:'get',
                url:'/login',
                jsonbody:{username: 'tom', password: 'glog'}
            }, function(res) {
                t.equal(res.status, 403)
            });
        });
        t.test('/login fails with incorrect login', function(t){
            t.plan(1);

            callAPI({
                db:db,
                method:'get',
                url:'/login',
                jsonbody:{username: 'tooo', password: 'g00by'}
            }, function(res){
                t.equal(res.status, 404)
            });
        });

        t.test('/me/info requires valid auth token', function(t) {
            t.plan(1);

            callAPI({
                db: db,
                method: 'get',
                url: '/me/info'
            }, function(res) {
                t.equal(res.status, 403);
            });
        });

        t.test('/login matches password in database', function(t){
            t.plan(3);

            callAPI({
                db:db,
                method:'get',
                url:'/login',
                jsonbody: {username: 'tom', password: 'g00by'}
           }, function(res) {
               t.equal(res.status, 200);

               var token = res.jsonbody.token;

               callAPI({
                   db:     db,
                   method: 'get',
                   url:    '/me/info',
                   headers: {
                       authorization: token
                   }
               }, function(res) {
                   t.equal(res.status, 200);
                   t.equal(typeof res.jsonbody.id, 'number');
               });
           });
        });
    });
});

