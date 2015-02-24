'use strict';

function LoanCalculator(config) {
    'use strict';
    //P =  (r * PV) / (1 - (1 + r)^-n)
    
    
    //n = (log(P) - log(P - Vr)) / log(1 + r)
    function logBase(base, value) {
        return Math.log(value) / Math.log(base);    
    }
    
    function calculateRemainingTerms(data) {
        var payment = data.payment;
        var currentValue = data.principal;
        var rate = data.apr / 1200;
        
        var n = (logBase(10, payment) - logBase(10, payment - currentValue * rate)) / logBase(10, 1 + rate);
        return n;
    }
    
    function calculatePaymentSchedule(loan) {
        var payment = loan.payment;
        var remainingPrincipal = loan.principal;
        var remainingInterest = loan.interest;
        var remainingValue = remainingInterest + remainingPrincipal;
        var terms = loan.terms;
        
        var paymentSchedule = [];
        
        for (var i  = 0; i < terms; ++i) {
            var paid = payment;
            var appliedToInterest = paid * (remainingInterest / remainingValue);
            var appliedToPrincipal = paid * (remainingPrincipal / remainingValue);
            remainingValue -= paid;
            remainingPrincipal -= appliedToPrincipal;
            remainingInterest -= appliedToInterest;
            
            if (remainingValue < 0) {
                paid += remainingValue;
                remainingValue = 0;
            }
            
            if (remainingInterest < 0) {
                appliedToInterest += remainingInterest;
                remainingInterest = 0;
            }
            
            if (remainingPrincipal < 0) {
                appliedToPrincipal += remainingPrincipal;
                remainingPrincipal = 0;
            }
            
            var schedule = {
                totalPayment: paid,
                paidToInterest: appliedToInterest,
                paidToPrincipal: appliedToPrincipal,
                remainingValue: remainingValue,
                remainingInterest: remainingInterest,
                remainingPrincipal: remainingPrincipal
            }
            
            paymentSchedule.push(schedule);
        }
        
        return paymentSchedule;
    }
    
    function calculate(req, resp) {
        var json = '';
        req.on('data', function(chunk) {
            json += chunk;    
        });
        
        req.on('end', function() {        
            var data = JSON.parse(json).data;
            var loan = {
                apr: data.apr,
                payment: data.payment,
                principal: data.principal,
                paymentSchedule: []
            };
            
            if (data.terms === undefined) {
                loan.terms = calculateRemainingTerms(data);   
            } else {
                loan.terms = data.terms;   
            }
            
            var totalPaid = loan.payment * loan.terms;
            loan.interest = totalPaid - loan.principal;
            
            loan.paymentSchedule = calculatePaymentSchedule(loan);
            
            resp.status(200).send(loan);
        });
    }
    
    this.post = calculate;
}

module.exports = LoanCalculator;