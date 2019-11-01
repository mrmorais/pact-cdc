const path = require('path')

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Verifier = require('@pact-foundation/pact').Verifier;

const {server} = require('../provider');

chai.use(chaiAsPromised);

describe('Provider test', () => {
    let serverConn;
    before(() => {
        serverConn = server.listen(3000, () => {
            console.log('Provider is running ...');
        });
    })
    describe('Matches \"My consumer\" requirements', () => {
        it('should validate the contract', () => {
            return new Verifier().verifyProvider({
                provider: 'My provider',
                providerBaseUrl: 'http://localhost:3000',
                pactBrokerUrl: process.env.PACT_BROKER_URL,
                pactBrokerToken: process.env.PACT_BROKER_TOKEN
            }).then();
        })
    });

    after(() => {
        if (serverConn) serverConn.close();
    })
});
