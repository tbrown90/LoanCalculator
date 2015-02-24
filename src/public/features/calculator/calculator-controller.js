LoanCalculator.Controllers.controller('calculatorCtrl', ['$scope', 'CalculatorService', function($scope, CalculatorService) {
    $scope.loan = undefined;
    $scope.loanData = {
        principal: 5000,
        apr: 9.5,
        payment: 200
    };
    
    $scope.calculate = function calculate(loanData) {
        var calculatorService = new CalculatorService();
        calculatorService.data = loanData;
        CalculatorService.save(calculatorService, function(data) {
            $scope.loan = data;
            console.log($scope.loan);
        });
    }
    
}]);