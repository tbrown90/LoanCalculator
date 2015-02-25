LoanCalculator.Directives.directive('paymentSchedule', function () {
    return {
        restrict: 'E',
        scope: {
            loan: '='
        },
        link: function (scope, el, attrs) {
            scope.$watch('loan', function (newValue, oldValue) {
                React.render(
                    PaymentSchedule({
                        loan: newValue
                    }),
                    el[0]
                );
            })
        }
    }
});