const request = require('superagent')

const API_HOST = process.env.API_HOST || 'http://localhost';
const API_PORT = process.env.API_PORT || 3000;
const apiUri = `${API_HOST}:${API_PORT}`;

const checkoutOrder = items => {
    return request
        .post(`${apiUri}/checkout`)
        .send({
            items
        })
        .then( res => {
            return {
                totalAmount: res.body.totalAmount
            };
        })
};

module.exports = {
    checkoutOrder
}