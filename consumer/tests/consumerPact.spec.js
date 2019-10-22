const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
const Pact = require('@pact-foundation/pact').Pact;

const path = require('path');

const { checkoutOrder } = require('../consumer');
const { cartItems : items } = require('../map');

chai.use(chaiAsPromised);

const provider = new Pact({
    consumer: 'My consumer',
    provider: 'My provider',
    port: 3000,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'warn',
    spec: 2
});

describe('Consumer Pact', () => {
    before(() => {
        return provider.setup();
    });

    describe('when a call to the Provider is made', () => {
        describe('and passing a valid items set', ()=> {
            before(() => {
                return provider.addInteraction({
                    uponReceiving: 'a request for total amount',
                    withRequest: {
                        method: 'POST',
                        path: '/checkout',
                        body: { items },
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {
                            'Content-type': 'application/json; charset=utf-8',
                        },
                        body: {
                            totalAmount: 156.5
                        }
                    }
                });
            });

            it('can process the JSON payload from provider', () => {
                const response = checkoutOrder(items);

                return expect(response).to.eventually.have.property('totalAmount', 156.5)
            });

            it('should validate and create a contract', () => {
                return provider.verify();
            })
        });
    });

    after(() => {
        provider.finalize();
    })
});