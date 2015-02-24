(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
LoanCalculator.Services.factory('CalculatorService', ["$resource", function($resource) {
    return $resource('/calculate/:data');
}]);

LoanCalculator.App.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input, decimals) + '%';
  };
}]);
},{}],3:[function(require,module,exports){
require("./calculator/calculator-controller.js");
require("./calculator/calculator-service.js");

},{"./calculator/calculator-controller.js":1,"./calculator/calculator-service.js":2}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImM6XFxVc2Vyc1xcdGJyb3duXFxEcm9wYm94XFxQcm9ncmFtbWluZ1xcTG9hbkNhbGN1bGF0b3JcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiYzovVXNlcnMvdGJyb3duL0Ryb3Bib3gvUHJvZ3JhbW1pbmcvTG9hbkNhbGN1bGF0b3Ivc3JjL3B1YmxpYy9mZWF0dXJlcy9jYWxjdWxhdG9yL2NhbGN1bGF0b3ItY29udHJvbGxlci5qcyIsImM6L1VzZXJzL3Ricm93bi9Ecm9wYm94L1Byb2dyYW1taW5nL0xvYW5DYWxjdWxhdG9yL3NyYy9wdWJsaWMvZmVhdHVyZXMvY2FsY3VsYXRvci9jYWxjdWxhdG9yLXNlcnZpY2UuanMiLCJjOi9Vc2Vycy90YnJvd24vRHJvcGJveC9Qcm9ncmFtbWluZy9Mb2FuQ2FsY3VsYXRvci9zcmMvcHVibGljL2ZlYXR1cmVzL2ZlYXR1cmVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIkxvYW5DYWxjdWxhdG9yLkNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ2NhbGN1bGF0b3JDdHJsJywgWyckc2NvcGUnLCAnQ2FsY3VsYXRvclNlcnZpY2UnLCBmdW5jdGlvbigkc2NvcGUsIENhbGN1bGF0b3JTZXJ2aWNlKSB7XHJcbiAgICAkc2NvcGUubG9hbiA9IHVuZGVmaW5lZDtcclxuICAgICRzY29wZS5sb2FuRGF0YSA9IHtcclxuICAgICAgICBwcmluY2lwYWw6IDUwMDAsXHJcbiAgICAgICAgYXByOiA5LjUsXHJcbiAgICAgICAgcGF5bWVudDogMjAwXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAkc2NvcGUuY2FsY3VsYXRlID0gZnVuY3Rpb24gY2FsY3VsYXRlKGxvYW5EYXRhKSB7XHJcbiAgICAgICAgdmFyIGNhbGN1bGF0b3JTZXJ2aWNlID0gbmV3IENhbGN1bGF0b3JTZXJ2aWNlKCk7XHJcbiAgICAgICAgY2FsY3VsYXRvclNlcnZpY2UuZGF0YSA9IGxvYW5EYXRhO1xyXG4gICAgICAgIENhbGN1bGF0b3JTZXJ2aWNlLnNhdmUoY2FsY3VsYXRvclNlcnZpY2UsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmxvYW4gPSBkYXRhO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUubG9hbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBcclxufV0pOyIsIkxvYW5DYWxjdWxhdG9yLlNlcnZpY2VzLmZhY3RvcnkoJ0NhbGN1bGF0b3JTZXJ2aWNlJywgZnVuY3Rpb24oJHJlc291cmNlKSB7XHJcbiAgICByZXR1cm4gJHJlc291cmNlKCcvY2FsY3VsYXRlLzpkYXRhJyk7XHJcbn0pO1xyXG5cclxuTG9hbkNhbGN1bGF0b3IuQXBwLmZpbHRlcigncGVyY2VudGFnZScsIFsnJGZpbHRlcicsIGZ1bmN0aW9uICgkZmlsdGVyKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCwgZGVjaW1hbHMpIHtcclxuICAgIHJldHVybiAkZmlsdGVyKCdudW1iZXInKShpbnB1dCwgZGVjaW1hbHMpICsgJyUnO1xyXG4gIH07XHJcbn1dKTsiLCJyZXF1aXJlKFwiLi9jYWxjdWxhdG9yL2NhbGN1bGF0b3ItY29udHJvbGxlci5qc1wiKTtcbnJlcXVpcmUoXCIuL2NhbGN1bGF0b3IvY2FsY3VsYXRvci1zZXJ2aWNlLmpzXCIpO1xuIl19
