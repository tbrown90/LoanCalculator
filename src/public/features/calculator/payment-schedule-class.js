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