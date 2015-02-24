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

LoanCalculator.App.config(function($stateProvider, $urlRouterProvider, $compileProvider) {
        console.log('Configuring states');
        
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('homeState', {
                url: "",
                templateUrl: "/features/calculator/calculator-partial.html",
                controller: 'calculatorCtrl'
            });
});

LoanCalculator.App.run(['$state', function($state) {
    console.log('Going to home state');
    $state.go('homeState');
}]);

window.LoanCalculator = LoanCalculator;
