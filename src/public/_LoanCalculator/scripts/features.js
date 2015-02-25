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
            ga('send', 'event', 'LoanCalculator', 'Calculate', data);
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
'use strict';
var Payment = React.createClass({
    displayName: 'Payment',
    render: function () {
        var payment = this.props.payment;

        return React.DOM.tr(null,
            React.DOM.td(null, payment.index),
            React.DOM.td(null, payment.totalPayment.formatMoney(2)),
            React.DOM.td(null, payment.paidToPrincipal.formatMoney(2)),
            React.DOM.td(null, payment.paidToInterest.formatMoney(2)),
            React.DOM.td(null, payment.remainingPrincipal.formatMoney(2)),
            React.DOM.td(null, payment.remainingInterest.formatMoney(2)),
            React.DOM.td(null, payment.remainingValue.formatMoney(2)));
    }
});
var PaymentFactory = React.createFactory(Payment);

var PaymentsTable = React.createClass({
    displayName: 'PaymentsTable',
    render: function () {
        var payments = this.props.payments,
            i = 0,
            renderPayments = [];

        for (i = 0; i < payments.length; ++i) {
            var payment = payments[i];
            payment.index = i;
            renderPayments.push(PaymentFactory({
                payment: payment
            }));
        }

        return React.DOM.table(null,
            React.DOM.thead(null,
                React.DOM.tr(null,
                    React.DOM.th(null, '\n'),
                    React.DOM.th(null, 'Payment'),
                    React.DOM.th(null, 'Principal Paid'),
                    React.DOM.th(null, 'Interest Paid'),
                    React.DOM.th(null, 'Remaining Principal'),
                    React.DOM.th(null, 'Remaining Interest'),
                    React.DOM.th(null, 'Remaining Balance'))),
                React.DOM.tbody(null, renderPayments));

    }
});
var PaymentsTableFactory = React.createFactory(PaymentsTable);

var PaymentSchedule = React.createClass({
    displayName: 'PaymentSchedule',
    render: function () {
        var loan = this.props.loan;

        if (!loan) {
            return null;
        }

        if (!loan.paymentSchedule || !loan.paymentSchedule.length) {
            return React.DOM.div({
                    id: 'loan'
                },
                React.DOM.div({
                        className: 'paper'
                    },
                    React.DOM.br(null, ''),
                    'This loan will accumulate interest faster than it can be repaid.'));
        }

        var p = 'A loan with a principal of ' +
            loan.principal.formatMoney('2') + ' at ' +
            loan.apr + '% APR and monthly payments of ' +
            loan.payment.formatMoney(2) + ' will have ' +
            loan.paymentSchedule.length + ' monthly payments (' +
            (loan.paymentSchedule.length / 12).toFixed(2) + ' years) ' +
            loan.interest.formatMoney(2) + ' will be paid in interest.';
        
        return React.DOM.div({
                id: 'loan'
            },
            React.DOM.div({
                    className: 'paper'
                },
                React.DOM.br(null, ''),
                p,
                PaymentsTableFactory({
                    payments: loan.paymentSchedule
                })));
    }
});

window.PaymentSchedule = PaymentSchedule;

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
require("./calculator/calculator-controller.js");
require("./calculator/calculator-service.js");
require("./calculator/payment-schedule-class.js");
require("./calculator/payment-schedule-directive.js");

},{"./calculator/calculator-controller.js":1,"./calculator/calculator-service.js":2,"./calculator/payment-schedule-class.js":3,"./calculator/payment-schedule-directive.js":4}]},{},[5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImM6XFxVc2Vyc1xcdGJyb3duXFxEcm9wYm94XFxQcm9ncmFtbWluZ1xcTG9hbkNhbGN1bGF0b3JcXG5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiYzovVXNlcnMvdGJyb3duL0Ryb3Bib3gvUHJvZ3JhbW1pbmcvTG9hbkNhbGN1bGF0b3Ivc3JjL3B1YmxpYy9mZWF0dXJlcy9jYWxjdWxhdG9yL2NhbGN1bGF0b3ItY29udHJvbGxlci5qcyIsImM6L1VzZXJzL3Ricm93bi9Ecm9wYm94L1Byb2dyYW1taW5nL0xvYW5DYWxjdWxhdG9yL3NyYy9wdWJsaWMvZmVhdHVyZXMvY2FsY3VsYXRvci9jYWxjdWxhdG9yLXNlcnZpY2UuanMiLCJjOi9Vc2Vycy90YnJvd24vRHJvcGJveC9Qcm9ncmFtbWluZy9Mb2FuQ2FsY3VsYXRvci9zcmMvcHVibGljL2ZlYXR1cmVzL2NhbGN1bGF0b3IvcGF5bWVudC1zY2hlZHVsZS1jbGFzcy5qcyIsImM6L1VzZXJzL3Ricm93bi9Ecm9wYm94L1Byb2dyYW1taW5nL0xvYW5DYWxjdWxhdG9yL3NyYy9wdWJsaWMvZmVhdHVyZXMvY2FsY3VsYXRvci9wYXltZW50LXNjaGVkdWxlLWRpcmVjdGl2ZS5qcyIsImM6L1VzZXJzL3Ricm93bi9Ecm9wYm94L1Byb2dyYW1taW5nL0xvYW5DYWxjdWxhdG9yL3NyYy9wdWJsaWMvZmVhdHVyZXMvZmVhdHVyZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIkxvYW5DYWxjdWxhdG9yLkNvbnRyb2xsZXJzLmNvbnRyb2xsZXIoJ2NhbGN1bGF0b3JDdHJsJywgWyckc2NvcGUnLCAnQ2FsY3VsYXRvclNlcnZpY2UnLCBmdW5jdGlvbigkc2NvcGUsIENhbGN1bGF0b3JTZXJ2aWNlKSB7XHJcbiAgICAkc2NvcGUubG9hbiA9IHVuZGVmaW5lZDtcclxuICAgICRzY29wZS5sb2FuRGF0YSA9IHtcclxuICAgICAgICBwcmluY2lwYWw6IDUwMDAsXHJcbiAgICAgICAgYXByOiA5LjUsXHJcbiAgICAgICAgcGF5bWVudDogMjAwXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICAkc2NvcGUuY2FsY3VsYXRlID0gZnVuY3Rpb24gY2FsY3VsYXRlKGxvYW5EYXRhKSB7XHJcbiAgICAgICAgdmFyIGNhbGN1bGF0b3JTZXJ2aWNlID0gbmV3IENhbGN1bGF0b3JTZXJ2aWNlKCk7XHJcbiAgICAgICAgY2FsY3VsYXRvclNlcnZpY2UuZGF0YSA9IGxvYW5EYXRhO1xyXG4gICAgICAgIENhbGN1bGF0b3JTZXJ2aWNlLnNhdmUoY2FsY3VsYXRvclNlcnZpY2UsIGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmxvYW4gPSBkYXRhO1xyXG4gICAgICAgICAgICBnYSgnc2VuZCcsICdldmVudCcsICdMb2FuQ2FsY3VsYXRvcicsICdDYWxjdWxhdGUnLCBkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG59XSk7IiwiTG9hbkNhbGN1bGF0b3IuU2VydmljZXMuZmFjdG9yeSgnQ2FsY3VsYXRvclNlcnZpY2UnLCBmdW5jdGlvbigkcmVzb3VyY2UpIHtcclxuICAgIHJldHVybiAkcmVzb3VyY2UoJy9jYWxjdWxhdGUvOmRhdGEnKTtcclxufSk7XHJcblxyXG5Mb2FuQ2FsY3VsYXRvci5BcHAuZmlsdGVyKCdwZXJjZW50YWdlJywgWyckZmlsdGVyJywgZnVuY3Rpb24gKCRmaWx0ZXIpIHtcclxuICByZXR1cm4gZnVuY3Rpb24gKGlucHV0LCBkZWNpbWFscykge1xyXG4gICAgcmV0dXJuICRmaWx0ZXIoJ251bWJlcicpKGlucHV0LCBkZWNpbWFscykgKyAnJSc7XHJcbiAgfTtcclxufV0pOyIsIid1c2Ugc3RyaWN0JztcclxudmFyIFBheW1lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcbiAgICBkaXNwbGF5TmFtZTogJ1BheW1lbnQnLFxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHBheW1lbnQgPSB0aGlzLnByb3BzLnBheW1lbnQ7XHJcblxyXG4gICAgICAgIHJldHVybiBSZWFjdC5ET00udHIobnVsbCxcclxuICAgICAgICAgICAgUmVhY3QuRE9NLnRkKG51bGwsIHBheW1lbnQuaW5kZXgpLFxyXG4gICAgICAgICAgICBSZWFjdC5ET00udGQobnVsbCwgcGF5bWVudC50b3RhbFBheW1lbnQuZm9ybWF0TW9uZXkoMikpLFxyXG4gICAgICAgICAgICBSZWFjdC5ET00udGQobnVsbCwgcGF5bWVudC5wYWlkVG9QcmluY2lwYWwuZm9ybWF0TW9uZXkoMikpLFxyXG4gICAgICAgICAgICBSZWFjdC5ET00udGQobnVsbCwgcGF5bWVudC5wYWlkVG9JbnRlcmVzdC5mb3JtYXRNb25leSgyKSksXHJcbiAgICAgICAgICAgIFJlYWN0LkRPTS50ZChudWxsLCBwYXltZW50LnJlbWFpbmluZ1ByaW5jaXBhbC5mb3JtYXRNb25leSgyKSksXHJcbiAgICAgICAgICAgIFJlYWN0LkRPTS50ZChudWxsLCBwYXltZW50LnJlbWFpbmluZ0ludGVyZXN0LmZvcm1hdE1vbmV5KDIpKSxcclxuICAgICAgICAgICAgUmVhY3QuRE9NLnRkKG51bGwsIHBheW1lbnQucmVtYWluaW5nVmFsdWUuZm9ybWF0TW9uZXkoMikpKTtcclxuICAgIH1cclxufSk7XHJcbnZhciBQYXltZW50RmFjdG9yeSA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoUGF5bWVudCk7XHJcblxyXG52YXIgUGF5bWVudHNUYWJsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnUGF5bWVudHNUYWJsZScsXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcGF5bWVudHMgPSB0aGlzLnByb3BzLnBheW1lbnRzLFxyXG4gICAgICAgICAgICBpID0gMCxcclxuICAgICAgICAgICAgcmVuZGVyUGF5bWVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBheW1lbnRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXltZW50ID0gcGF5bWVudHNbaV07XHJcbiAgICAgICAgICAgIHBheW1lbnQuaW5kZXggPSBpO1xyXG4gICAgICAgICAgICByZW5kZXJQYXltZW50cy5wdXNoKFBheW1lbnRGYWN0b3J5KHtcclxuICAgICAgICAgICAgICAgIHBheW1lbnQ6IHBheW1lbnRcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIFJlYWN0LkRPTS50YWJsZShudWxsLFxyXG4gICAgICAgICAgICBSZWFjdC5ET00udGhlYWQobnVsbCxcclxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50cihudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50aChudWxsLCAnXFxuJyksXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRoKG51bGwsICdQYXltZW50JyksXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRoKG51bGwsICdQcmluY2lwYWwgUGFpZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50aChudWxsLCAnSW50ZXJlc3QgUGFpZCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50aChudWxsLCAnUmVtYWluaW5nIFByaW5jaXBhbCcpLFxyXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LkRPTS50aChudWxsLCAnUmVtYWluaW5nIEludGVyZXN0JyksXHJcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuRE9NLnRoKG51bGwsICdSZW1haW5pbmcgQmFsYW5jZScpKSksXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00udGJvZHkobnVsbCwgcmVuZGVyUGF5bWVudHMpKTtcclxuXHJcbiAgICB9XHJcbn0pO1xyXG52YXIgUGF5bWVudHNUYWJsZUZhY3RvcnkgPSBSZWFjdC5jcmVhdGVGYWN0b3J5KFBheW1lbnRzVGFibGUpO1xyXG5cclxudmFyIFBheW1lbnRTY2hlZHVsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuICAgIGRpc3BsYXlOYW1lOiAnUGF5bWVudFNjaGVkdWxlJyxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBsb2FuID0gdGhpcy5wcm9wcy5sb2FuO1xyXG5cclxuICAgICAgICBpZiAoIWxvYW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWxvYW4ucGF5bWVudFNjaGVkdWxlIHx8ICFsb2FuLnBheW1lbnRTY2hlZHVsZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LkRPTS5kaXYoe1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiAnbG9hbidcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBSZWFjdC5ET00uZGl2KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiAncGFwZXInXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5ET00uYnIobnVsbCwgJycpLFxyXG4gICAgICAgICAgICAgICAgICAgICdUaGlzIGxvYW4gd2lsbCBhY2N1bXVsYXRlIGludGVyZXN0IGZhc3RlciB0aGFuIGl0IGNhbiBiZSByZXBhaWQuJykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHAgPSAnQSBsb2FuIHdpdGggYSBwcmluY2lwYWwgb2YgJyArXHJcbiAgICAgICAgICAgIGxvYW4ucHJpbmNpcGFsLmZvcm1hdE1vbmV5KCcyJykgKyAnIGF0ICcgK1xyXG4gICAgICAgICAgICBsb2FuLmFwciArICclIEFQUiBhbmQgbW9udGhseSBwYXltZW50cyBvZiAnICtcclxuICAgICAgICAgICAgbG9hbi5wYXltZW50LmZvcm1hdE1vbmV5KDIpICsgJyB3aWxsIGhhdmUgJyArXHJcbiAgICAgICAgICAgIGxvYW4ucGF5bWVudFNjaGVkdWxlLmxlbmd0aCArICcgbW9udGhseSBwYXltZW50cyAoJyArXHJcbiAgICAgICAgICAgIChsb2FuLnBheW1lbnRTY2hlZHVsZS5sZW5ndGggLyAxMikudG9GaXhlZCgyKSArICcgeWVhcnMpICcgK1xyXG4gICAgICAgICAgICBsb2FuLmludGVyZXN0LmZvcm1hdE1vbmV5KDIpICsgJyB3aWxsIGJlIHBhaWQgaW4gaW50ZXJlc3QuJztcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gUmVhY3QuRE9NLmRpdih7XHJcbiAgICAgICAgICAgICAgICBpZDogJ2xvYW4nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFJlYWN0LkRPTS5kaXYoe1xyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3BhcGVyJ1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFJlYWN0LkRPTS5icihudWxsLCAnJyksXHJcbiAgICAgICAgICAgICAgICBwLFxyXG4gICAgICAgICAgICAgICAgUGF5bWVudHNUYWJsZUZhY3Rvcnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIHBheW1lbnRzOiBsb2FuLnBheW1lbnRTY2hlZHVsZVxyXG4gICAgICAgICAgICAgICAgfSkpKTtcclxuICAgIH1cclxufSk7XHJcblxyXG53aW5kb3cuUGF5bWVudFNjaGVkdWxlID0gUGF5bWVudFNjaGVkdWxlO1xyXG5cclxuTnVtYmVyLnByb3RvdHlwZS5mb3JtYXRNb25leSA9IGZ1bmN0aW9uIChjLCBkLCB0KSB7XHJcbiAgICB2YXIgbiA9IHRoaXMsXHJcbiAgICAgICAgYyA9IGlzTmFOKGMgPSBNYXRoLmFicyhjKSkgPyAyIDogYyxcclxuICAgICAgICBkID0gZCA9PSB1bmRlZmluZWQgPyBcIi5cIiA6IGQsXHJcbiAgICAgICAgdCA9IHQgPT0gdW5kZWZpbmVkID8gXCIsXCIgOiB0LFxyXG4gICAgICAgIHMgPSBuIDwgMCA/IFwiLVwiIDogXCJcIixcclxuICAgICAgICBpID0gcGFyc2VJbnQobiA9IE1hdGguYWJzKCtuIHx8IDApLnRvRml4ZWQoYykpICsgXCJcIixcclxuICAgICAgICBqID0gKGogPSBpLmxlbmd0aCkgPiAzID8gaiAlIDMgOiAwO1xyXG4gICAgcmV0dXJuIHMgKyAoaiA/IGkuc3Vic3RyKDAsIGopICsgdCA6IFwiXCIpICsgaS5zdWJzdHIoaikucmVwbGFjZSgvKFxcZHszfSkoPz1cXGQpL2csIFwiJDFcIiArIHQpICsgKGMgPyBkICsgTWF0aC5hYnMobiAtIGkpLnRvRml4ZWQoYykuc2xpY2UoMikgOiBcIlwiKTtcclxufTsiLCJMb2FuQ2FsY3VsYXRvci5EaXJlY3RpdmVzLmRpcmVjdGl2ZSgncGF5bWVudFNjaGVkdWxlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGxvYW46ICc9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCdsb2FuJywgZnVuY3Rpb24gKG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgUmVhY3QucmVuZGVyKFxyXG4gICAgICAgICAgICAgICAgICAgIFBheW1lbnRTY2hlZHVsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvYW46IG5ld1ZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgZWxbMF1cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiLCJyZXF1aXJlKFwiLi9jYWxjdWxhdG9yL2NhbGN1bGF0b3ItY29udHJvbGxlci5qc1wiKTtcbnJlcXVpcmUoXCIuL2NhbGN1bGF0b3IvY2FsY3VsYXRvci1zZXJ2aWNlLmpzXCIpO1xucmVxdWlyZShcIi4vY2FsY3VsYXRvci9wYXltZW50LXNjaGVkdWxlLWNsYXNzLmpzXCIpO1xucmVxdWlyZShcIi4vY2FsY3VsYXRvci9wYXltZW50LXNjaGVkdWxlLWRpcmVjdGl2ZS5qc1wiKTtcbiJdfQ==
