module.exports = function(app) {
    // inject:start
    require('./main.controller')(app);
    require('./politicianSection/pollingLibrary.controller')(app);
    require('./politicianSection/politicianComparison.controller')(app);
    require('./politicianSection/politicianLibrary.controller')(app);
    require('./politicianSection/politicianProfile.controller')(app);
    require('./politicianSection/politicianSection.controller')(app);
    require('./topicNavigation/topics.controller')(app);
    require('./userAuth/registerModal.controller')(app);
    require('./userAuth/userAuth.controller')(app);
    require('./questionSection/questionSection.controller')(app);
    require('./questionSection/questionSet.controller')(app);
    require('./settings/settings.controller')(app);
    // inject:end
};