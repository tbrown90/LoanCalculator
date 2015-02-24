LoanCalculator.Services.factory('CalculatorService', function($resource) {
    return $resource('/calculate/:data');
});

LoanCalculator.App.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input, decimals) + '%';
  };
}]);