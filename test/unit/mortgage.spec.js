const expect = require('chai').expect;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage', () => {
    let mortgage = null; 

    beforeEach(() => {
        let principal = 100000;
        let interest= 5.5;
        let term = 30;
        let period = 12;
        mortgage = new Mortgage(principal, interest, term, period);
    });

    it('should have a monthly payment function', () => {
        expect(mortgage.monthlyPayment).to.exist;
    });

    it('should round mortgage payment correctly to two decimal places', () => {
        expect(mortgage.monthlyPayment()).to.equal(Number(mortgage.monthlyPayment()).toFixed(2));
    });

    it('should calculate mortgage payment correctly', () => {
        expect(mortgage.monthlyPayment()).to.equal('567.79');
    })

    it('should return mortgage payment as a string', () => {
        expect(mortgage.monthlyPayment()).to.be.a('string');
    });

});