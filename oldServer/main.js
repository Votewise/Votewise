//var config = require('./config');
var makeAPI = require('./api');
var mysql = require('mysql');


var db = mysql.createPool({
    connectionLimit: 10,
    host:            'localhost',
    user:            'root',
    password:        'expand',
    database:        'votewise',
    port:            3306
});

var server = makeAPI(db).listen(3000, function() {

    var address = server.address();

    console.log('Example app listening at http://%s:%s',
                address.address, address.port);
});