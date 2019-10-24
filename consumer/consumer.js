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
            const {totalAmount, maxDescount} = res.body;
            const descount = maxDescount <= 0.15 ? maxDescount : 0.15;
            return {
                totalAmount,
                descount: 0.15,
                withDescountAmount: (1 - descount) * totalAmount
            };
        })
};

module.exports = {
    checkoutOrder
}