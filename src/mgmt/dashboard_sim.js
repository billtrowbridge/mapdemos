// exports for browser and node.js

(function (root) {
    'use strict';

    var Dashboard = function () {
        var $dashboard;

        function init() {
            if (!$('#dashboard').length) {
                $('<div/>', { id: 'dashboard' }).appendTo('body');
            }
            $dashboard = $('#dashboard');
            //$dashboard.addClass('fillscreen1');
            //$dashboard.html('hello');
        }

        //this.expand = function () {
        //    $dashboard.attr({ width: '80%', height: '100%' })
        //}

        init();
    };
    
    // TODO: To support AMD, see http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
    // TODO: not ideal export
    // export to browser or node.js 
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        // for one
        module.exports = Dashboard;
        // for multiple
        //module.exports.method1 = method1;
    } else {
        root.Dashboard = Dashboard;
    }
    
})(this);

