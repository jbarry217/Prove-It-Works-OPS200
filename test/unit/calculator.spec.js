const expect = require('chai').expect;
const { iteratee } = require('lodash');
const Calculator = require('../../src/js/lib/Calculator');

describe('Calculator', () => {
    let calculator = null; 

    beforeEach(() => {
        calculator = new Calculator();
    });

    it('should have an add function', () => {
        expect(calculator.add).to.exist;
    });

    it('should add 2 + 2 together correctly', () => {
        expect(calculator.add(2, 2)).to.equal(4);
    });

    it('should have a subtract function', () => {
        expect(calculator.subtract).to.exist;
    });

    it('should subtract 4 - 2 together correctly', () => {
        expect(calculator.subtract(4, 2)).to.equal(2);
    });

    it('should have a multiply function', () => {
        expect(calculator.multiply).to.exist;
    });

    it('should multiply 3 * 3 together correctly', () => {
        expect(calculator.multiply(3, 3)).to.equal(9);
    });

    it('should have a divide function', () => {
        expect(calculator.divide).to.exist;
    });

    it('should divide 9 / 3 together correctly', () => {
        expect(calculator.divide(9, 3)).to.equal(3);
    });
});