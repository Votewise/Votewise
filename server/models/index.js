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
    'Answers',
    'Backgrounds',
    'Districts',
    'PoliticianDistricts',
    'PoliticianLists',
    'Politicians',
    'Questions',
    'RankingAnswerItems',
    'RankingQuestionItems',
    'Topics',
    'Users',
    'Voters',
    'Groups',
    'UserGroups',
    'Parties',
    'UserParties'
];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

 //describe relationships
(function(m) {
    m.Questions.belongsTo(m.Backgrounds, { foreignKey: 'background' } );
    m.Backgrounds.hasMany(m.Questions, { foreignKey: 'background' } );

    m.Topics.belongsTo(m.Backgrounds, { foreignKey: 'background' } );
    m.Backgrounds.hasMany(m.Topics, { foreignKey: 'background' } );
    //
    m.Answers.belongsTo(m.Backgrounds, { foreignKey: 'background' } );
    m.Backgrounds.hasMany(m.Answers, { foreignKey: 'background' } );

    m.Users.hasMany(m.Answers, { foreignKey: 'user' });
    m.Users.hasOne(m.Politicians, { foreignKey: 'user' });
    //m.Users.hasMany(m.Answers, { foreignKey: 'settings', as: 'answerCount' });

    m.Questions.hasMany(m.Answers, { foreignKey: 'question' });
    m.Answers.belongsTo(m.Questions, { foreignKey: 'question' });

    m.Answers.hasMany(m.RankingAnswerItems, { foreignKey: 'answer' });
    m.RankingAnswerItems.belongsTo(m.Answers,  { foreignKey: 'id' } );

    m.Questions.hasMany(m.RankingQuestionItems, { foreignKey: 'question' });
    m.RankingQuestionItems.belongsTo(m.Questions, { foreignKey: 'question' });

    m.Politicians.belongsToMany(m.Districts, { as: 'Districts', through: 'PoliticianDistricts', foreignKey: 'politician' });
    m.Districts.belongsToMany(m.Politicians, { as: 'Politicians', through: 'PoliticianDistricts', foreignKey: 'district' });

    m.Groups.belongsToMany(m.Users, { as: 'Users', through: 'UserGroups', foreignKey: 'group'});
    m.Users.belongsToMany(m.Groups, { as: 'Groups', through: 'UserGroups', foreignKey: 'user'});

    m.Parties.belongsToMany(m.Users, { as: 'Users', through: 'UserParties', foreignKey: 'party'});
    m.Users.belongsToMany(m.Parties, { as: 'Parties', through: 'UserParties', foreignKey: 'user'});

    m.Politicians.belongsTo(m.Users, { foreignKey: 'user'} );

    m.Topics.hasMany(m.Topics, { as: 'Subtopics', foreignKey: 'parent' });


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