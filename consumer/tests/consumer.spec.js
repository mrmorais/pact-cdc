const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

const nock = require('nock');
chai.use(chaiAsPromised);

const providerURI = 'http://localhost:3000';

const { cartItems: items } = require('../map');
const { checkoutOrder } = require('../consumer');

describe('Consumer', () => {
    describe('when a call to the Provider is made', () => {
        before(() => {
            nock(providerURI)
                .post('/checkout')
                .reply(200, {
                    totalAmount: 156.5
                });
        });

        it('should get the correct total amount', () => {
            const returnedTotalAmount = checkoutOrder();

            return expect(returnedTotalAmount).to.eventually.have.property('totalAmount', 156.5);
        });

        after(() => {
            nock.cleanAll()
        })
    });
});


