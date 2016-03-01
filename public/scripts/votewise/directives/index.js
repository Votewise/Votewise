'use strict';

module.exports = function(app) {
    // inject:start
    require('./d3ConcurrenceComparison.directive')(app);
    require('./test.directive')(app);
    // inject:end
};