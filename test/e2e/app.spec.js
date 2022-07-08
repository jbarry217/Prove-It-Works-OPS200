const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

describe('End to End Tests', () => {
    let httpServer = null;
    let pageObject = null; 

    before((done) => {
        httpServer = app.listen(8888);
        done();
    });

    beforeEach(() => {
        pageObject = nightmare.goto(url);
    });

    after((done) => {
        httpServer.close();
        done();
    });

//this is where code will go

    it('should contain a <button> element with "calculate" as the id', () => {
        return pageObject  
            .evaluate(() => document.querySelector('button').id)
            .then(button => {
                expect(button).to.not.be.null;
                expect(button).to.equal('calculate');
            });
        });

    it('should contain a <h1> element for the page title', () => { 
        return pageObject
            .evaluate(() => document.querySelector('h1').innerText)
            .then(headerText => {
            expect(headerText).to.not.be.null;
            expect(headerText).to.equal('Mortgage Calculator');
            });
        });

    it('should contain a <select> element with "period" as the id', () => {
        return pageObject
            .evaluate(() => document.querySelector('select').id)
            .then(selectId => {
                expect(selectId).to.not.be.null; 
                expect(selectId).to.equal('period');
            });
        });

    it('should contain a <p> element with "output" as the id', () => {
        return pageObject
            .evaluate(() => document.querySelector('p').id)
            .then(output => {
                expect(output).to.not.be.null; 
                expect(output).to.equal('output');
            });
        });

    it('should contain an <input> element with "principal" as the id', () => {
        return pageObject
            .evaluate(() => document.querySelector('input').id)
            .then(inputId => {
                expect(inputId).to.not.be.null;
                expect(inputId).to.equal('principal');
        });
    });

    it('should contain an <input> element with "interestRate" as the name', () => {
        return pageObject
            .evaluate(() => document.querySelector('input[name=interestRate]').id)
            .then(input => {
                expect(input).to.not.be.null;
                expect(input).to.equal('interestRate');
        });
    });

    it('should contain an <option> element with "monthly" as the id', () => {
        return pageObject
            .evaluate(() => document.querySelector('option').id)
            .then(optionId => {
                expect(optionId).to.not.be.null;
                expect(optionId).to.equal('monthly');
        });
    });

    it('should correctly calculate mortgage', () =>
        pageObject
            .wait()
            .type('input[name=principal]', 300000)
            .type('input[name=interestRate]', 3.75)
            .type('input[name=loanTerm]', 30)
            .select('select[name=period]', 12)
            .click('button#calculate')
            .wait('#output')
            .evaluate(() => document.querySelector('#output').innerText)
            .then((outputText) => {
                expect(outputText).to.equal('$1389.35');
            })
        ).timeout(6500);
    })
