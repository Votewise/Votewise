'use strict';
 /*eslint consistent-this:[2,  "d3ConcurrenceComparisonCtrl"] */
var directivename = 'd3ConcurrenceComparison';

module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {
        var d3ConcurrenceComparisonCtrl = this;
        d3ConcurrenceComparisonCtrl.directivename = directivename;
    };
    controller.$inject = controllerDeps;

    /*eslint-disable consistent-this */

    // directive
    var directiveDeps = [
        'main.d3.D3'
        ];

    var directive = function(D3) {
        return {
            restrict: 'EA',
            scope: {
                title: '@' // '@' reads attribute value, '=' provides 2-way binding, '&" works with functions
            },
            link: function(scope, element, attrs) {
                D3.d3().then(function(d3) {

                    var margin = parseInt(attrs.margin) || 20,
                        barHeight = parseInt(attrs.barHeight) || 20,
                        barPadding = parseInt(attrs.barPadding) || 5;

                    var svg = d3.select(element[0]).append("svg").style('width', '100%');

                    window.onresize = function() {
                        scope.$apply();
                    };

                    scope.data = [
                        {name: "Greg", score: 98},
                        {name: "Ari", score: 96},
                        {name: 'Q', score: 75},
                        {name: "Loser", score: 48}
                    ];

                    scope.$watch(function() {
                        return angular.element($window)[0].innerWidth;
                    }, function() {
                        scope.render(scope.data);
                    });

                    scope.render = function(data) {

                        svg.selectAll('*').remove();

                        if (!data) return;

                        var width = d3.select(ele[0]).node().offsetWidth - margin,
                            height = scope.data.length * (barHeight + barPadding),
                            color = d3.scale.category20(),
                            xScale = d3.scale.linear().domain([0, d3.max(data, function(d){
                                    return d.score;
                                })]).range([0, width]);

                        svg.attr('height', height);

                        svg.selectAll('rect')
                            .data(data).enter()
                            .append('rect')
                            .attr('height', barHeight)
                            .attr('widith', 140)
                            .attr('x', Math.round(margin/2))
                            .attr('y', function(d, i) {
                                return i * (barHeight + barPadding);
                            })
                            .attr('fill', function(d) { return color(d.score); })
                            .transition()
                                .duration(1000)
                                .attr('width', function(d) {
                                    return xScale(d.score);
                                })
                    }
                });
            },
            controller: controller,
            controllerAs: 'd3ConcurrenceComparisonCtrl',
            bindToController: true,
            template: require('./d3ConcurrenceComparison.directive.html'),
            compile: function(tElement, tAttrs) {
                return {
                    pre: function(scope, element, attrs) {

                    },
                    post: function(scope, element, attrs) {

                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
