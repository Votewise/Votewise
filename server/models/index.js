var Sequelize = require('sequelize');
var config    = require('../config');  // we use node-config to handle environments
var DataTypes = require('../../node_modules/sequelize/lib/data-types');
// initialize database connection
var sequelize = new Sequelize(config.db.database, config.db.user, config.db.password , {
    host: config.db.host,
    dialect: 'mysql',
    pool: {
        max: 12,
        min: 0,
        idle: 2000
    }
})

// load models
var models = [
    'answers',
    'backgrounds',
    'districts',
    'politicianDistricts',
    'politicianLists',
    'politicians',
    'questions',
    'rankingAnswerItems',
    'rankingQuestionItems',
    'topics',
    'users',
    'voters',
    'groups',
    'userGroups',
    'parties',
    'userParties'
];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

 //describe relationships
(function(m) {
    m.questions.belongsTo(m.backgrounds, { foreignKey: 'backgroundId' } );
    m.backgrounds.hasMany(m.questions, { foreignKey: 'backgroundId' } );

    m.topics.belongsTo(m.backgrounds, { foreignKey: 'backgroundId' } );
    m.backgrounds.hasMany(m.topics, { foreignKey: 'backgroundId' } );
    //
    m.answers.belongsTo(m.backgrounds, { foreignKey: 'backgroundId' } );
    m.backgrounds.hasMany(m.answers, { foreignKey: 'backgroundId' } );

    m.users.hasMany(m.answers, { foreignKey: 'user' });
    m.users.hasOne(m.politicians, { foreignKey: 'userId' });
    //m.Users.hasMany(m.Answers, { foreignKey: 'settings', as: 'answerCount' });

    m.questions.hasMany(m.answers, { foreignKey: 'questionId' });
    m.answers.belongsTo(m.questions, { foreignKey: 'questionId' });

    m.answers.hasMany(m.rankingAnswerItems, { foreignKey: 'answerId' });
    m.rankingAnswerItems.belongsTo(m.answers,  { foreignKey: 'id' } );

    m.questions.hasMany(m.rankingQuestionItems, { foreignKey: 'questionId' });
    m.rankingQuestionItems.belongsTo(m.questions, { foreignKey: 'questionId' });

    m.politicians.belongsToMany(m.districts, { as: 'Districts', through: 'politicianDistricts', foreignKey: 'politician' });
    m.districts.belongsToMany(m.politicians, { as: 'Politicians', through: 'politicianDistricts', foreignKey: 'district' });

    m.groups.belongsToMany(m.users, { as: 'Users', through: 'userGroups', foreignKey: 'group'});
    m.users.belongsToMany(m.groups, { as: 'Groups', through: 'userGroups', foreignKey: 'user'});

    m.parties.belongsToMany(m.users, { as: 'Users', through: 'userParties', foreignKey: 'party'});
    m.users.belongsToMany(m.parties, { as: 'Parties', through: 'userParties', foreignKey: 'user'});

    m.politicians.belongsTo(m.users, { foreignKey: 'userId'} );

    m.topics.hasMany(m.topics, { as: 'subtopics', foreignKey: 'parent' });


    //  *------- These do not work as desired.
    //   *------- Refers topics.id, answers.id & questions.id through backgrounds.id
    //    *------- instead of .background relating to backgrounds.id
    //m.Topics.belongsToMany(m.Questions, { as: 'topicsAndQuestions', through: 'Backgrounds', foreignKey: 'id'});
    //m.Questions.belongsTo(m.Topics, { as: 'topicsAndQuestions', through: 'Backgrounds', foreignKey: 'background'});
    //
    //m.Topics.belongsToMany(m.Answers, { as: 'TopicsFromAnswer', through: 'Backgrounds', foreignKey: 'id'});
    //m.Answers.belongsToMany(m.Topics, { as: 'AnswersFromTopics', through: 'Backgrounds', foreignKey: 'background'});
    //


})(module.exports);

// export connection
module.exports.sequelize = sequelize;