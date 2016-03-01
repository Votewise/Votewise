'use strict';

module.exports = function(app) {
    // inject:start
    require('./users/user.service.js')(app);
    require('./answers/allAnswers.service')(app);
    require('./d3/d3.service')(app);
    require('./answers/concurrenceAnswer.service')(app);
    require('./answers/judgeAnswer.service')(app);
    require('./answers/rankingAnswer.service')(app);
    require('./loginRegister/login.service')(app);
    require('./loginRegister/register.service')(app);
    require('./politicianCatalogues/politicianLibrary.service')(app);
    require('./politicianCatalogues/politicianList.service')(app);
    require('./topics/topicTree.service')(app);
    require('./questionSet/questionSet.service')(app);
    require('./groups/groups.service.js')(app);
    require('./parties/parties.service.js')(app);
    // inject:end
};