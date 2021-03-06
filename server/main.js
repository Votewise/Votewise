var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var Promise = require('bluebird');
var nacl = require('js-nacl').instantiate();
var unless = require('express-unless');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');

var config = require('./config');

var models = require('./models');
var Answers = models.Answers;
var Backgrounds = models.Backgrounds;
var Districts = models.Districts;
var PoliticianDistricts = models.PoliticianDistricts;
var PoliticianLists = models.PoliticianLists;
var Politicians = models.Politicians;
var Questions = models.Questions;
var RankingAnswerItems = models.RankingAnswerItems;
var RankingQuestionItems = models.RankingQuestionItems;
var Topics = models.Topics;
var Users = models.Users;
var Voters = models.Voters;
var sequelize = models.sequelize;

var TopicTree = require('./api/topicTree');
var QuestionSet = require('./api/questionSet');
var ConcurrenceAnswer = require('./api/concurrenceAnswer');
var Register = require('./api/register');
var Login = require('./api/login');
var RankingAnswer = require('./api/rankingAnswer');
var PoliticianLibrary = require('./api/politicianLibrary');
var PoliticianList = require('./api/politicianList');
var AllAnswers = require('./api/allAnswers');
var Groups = require('./api/groups');
var Parties = require('./api/parties');
var User = require('./api/user');
var Test = require('./api/Test');
var ShortInputAnswer = require('./api/shortInputAnswer');
var JudgeAnswer = require('./api/judgeAnswer');
var Parties = require('./api/parties');

var app = express();

// Middlewares.
app.use(express.static('../dist/app/dev'));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(expressJWT({ secret: config.jwtSecret }).unless({ path: [ '/login', '/register' ]}));

// Routes.
app.get('/test/', Test.Test);

app.post('/register', Register.register);
app.post('/login', Login.login);


app.put('/settings/:userId', User.updateUser);

app.get('/topicTree/:topic', TopicTree.getTopicTree);
app.get('/questionSet/:background/:user', QuestionSet.getQuestionSet);

app.post('/concurrenceAnswer/', ConcurrenceAnswer.postConcurrenceAnswer);
app.put('/concurrenceAnswer/', ConcurrenceAnswer.putConcurrenceAnswer);

app.post('/rankingAnswer', RankingAnswer.postRankingAnswer);
app.put('/rankingAnswer', RankingAnswer.putRankingAnswer);

app.get('/politicianLibrary/', PoliticianLibrary.getPoliticianLibrary);
app.get('/allAnswers/', AllAnswers.getAllAnswers);

app.get('/groups/:category', Groups.getByCategory);
app.get('/parties', Parties.getParties);

app.put('/shortInputAnswer', ShortInputAnswer.updateShortInputAnswer);
app.post('/shortInputAnswer', ShortInputAnswer.createShortInputAnswer);

app.post('/judgeAnswer', JudgeAnswer.createJudgeAnswer);
app.put('/judgeAnswer', JudgeAnswer.updateJudgeAnswer);

app.post('/politicianList', PoliticianList.postPoliticianList);
app.put('/politicianList', PoliticianList.putPoliticianList);
app.get('/politicianList/:userId', PoliticianList.getPoliticianList);

var server = app.listen(3000, function() {
    var address = server.address();

    console.log('Example app listening at http://%s:%s',
                address.address, address.port);
});