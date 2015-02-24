(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var appDependencies = [
    'ui.router',
    'ngResource',
    'LoanCalculatorDirectives',
    'LoanCalculatorControllers',
    'LoanCalculatorServices'];

var LoanCalculator = {
    App: angular.module('LoanCalculator', appDependencies),
    Directives: angular.module('LoanCalculatorDirectives', []),
    Controllers: angular.module('LoanCalculatorControllers', []),
    Services: angular.module('LoanCalculatorServices', [])
};

LoanCalculator.App.config(["$stateProvider", "$urlRouterProvider", "$compileProvider", function($stateProvider, $urlRouterProvider, $compileProvider) {
        console.log('Configuring states');
        
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('homeState', {
                url: "",
                templateUrl: "/features/calculator/calculator-partial.html",
                controller: 'calculatorCtrl'
            });
}]);

LoanCalculator.App.run(['$state', function($state) {
    console.log('Going to home state');
    $state.go('homeState');
}]);

window.LoanCalculator = LoanCalculator;

},{}],2:[function(require,module,exports){
require('./LoanCalculator.js')
},{"./LoanCalculator.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImM6XFxVc2Vyc1xcdGJyb3duXFxEcm9wYm94XFxQcm9ncmFtbWluZ1xcTG9hbkNhbGN1bGF0b3JcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiYzovVXNlcnMvdGJyb3duL0Ryb3Bib3gvUHJvZ3JhbW1pbmcvTG9hbkNhbGN1bGF0b3Ivc3JjL3B1YmxpYy9jb3JlL0xvYW5DYWxjdWxhdG9yLmpzIiwiYzovVXNlcnMvdGJyb3duL0Ryb3Bib3gvUHJvZ3JhbW1pbmcvTG9hbkNhbGN1bGF0b3Ivc3JjL3B1YmxpYy9jb3JlL2NvcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGFwcERlcGVuZGVuY2llcyA9IFtcclxuICAgICd1aS5yb3V0ZXInLFxyXG4gICAgJ25nUmVzb3VyY2UnLFxyXG4gICAgJ0xvYW5DYWxjdWxhdG9yRGlyZWN0aXZlcycsXHJcbiAgICAnTG9hbkNhbGN1bGF0b3JDb250cm9sbGVycycsXHJcbiAgICAnTG9hbkNhbGN1bGF0b3JTZXJ2aWNlcyddO1xyXG5cclxudmFyIExvYW5DYWxjdWxhdG9yID0ge1xyXG4gICAgQXBwOiBhbmd1bGFyLm1vZHVsZSgnTG9hbkNhbGN1bGF0b3InLCBhcHBEZXBlbmRlbmNpZXMpLFxyXG4gICAgRGlyZWN0aXZlczogYW5ndWxhci5tb2R1bGUoJ0xvYW5DYWxjdWxhdG9yRGlyZWN0aXZlcycsIFtdKSxcclxuICAgIENvbnRyb2xsZXJzOiBhbmd1bGFyLm1vZHVsZSgnTG9hbkNhbGN1bGF0b3JDb250cm9sbGVycycsIFtdKSxcclxuICAgIFNlcnZpY2VzOiBhbmd1bGFyLm1vZHVsZSgnTG9hbkNhbGN1bGF0b3JTZXJ2aWNlcycsIFtdKVxyXG59O1xyXG5cclxuTG9hbkNhbGN1bGF0b3IuQXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkY29tcGlsZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0NvbmZpZ3VyaW5nIHN0YXRlcycpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICRjb21waWxlUHJvdmlkZXIuYUhyZWZTYW5pdGl6YXRpb25XaGl0ZWxpc3QoL15cXHMqKGh0dHBzP3xmdHB8bWFpbHRvfGZpbGV8dGVsKTovKTtcclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL1wiKTtcclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoJ2hvbWVTdGF0ZScsIHtcclxuICAgICAgICAgICAgICAgIHVybDogXCJcIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi9mZWF0dXJlcy9jYWxjdWxhdG9yL2NhbGN1bGF0b3ItcGFydGlhbC5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnY2FsY3VsYXRvckN0cmwnXHJcbiAgICAgICAgICAgIH0pO1xyXG59KTtcclxuXHJcbkxvYW5DYWxjdWxhdG9yLkFwcC5ydW4oWyckc3RhdGUnLCBmdW5jdGlvbigkc3RhdGUpIHtcclxuICAgIGNvbnNvbGUubG9nKCdHb2luZyB0byBob21lIHN0YXRlJyk7XHJcbiAgICAkc3RhdGUuZ28oJ2hvbWVTdGF0ZScpO1xyXG59XSk7XHJcblxyXG53aW5kb3cuTG9hbkNhbGN1bGF0b3IgPSBMb2FuQ2FsY3VsYXRvcjtcclxuIiwicmVxdWlyZSgnLi9Mb2FuQ2FsY3VsYXRvci5qcycpIl19
