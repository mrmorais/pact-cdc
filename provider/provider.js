const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use((_, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8');
    next();
});

server.post('/checkout', (req, res) => {
    const items = req.body.items;

    const total = items.reduce((sum, currentItem) => 
        sum + (currentItem.price * currentItem.quantity)
    , 0);
    
    res.json({
        totalAmount: total,
        maxDescount: 0.2
    });
})

module.exports = {
    server
}
