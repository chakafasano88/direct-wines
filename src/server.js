const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/products', (req, res, next) => {
    request('https://www.wsjwine.com/api/offer/0033008', function (err, response , body) {
        if(err) {
            next(err);
        } else {
            res.send(JSON.parse(body));
        }
    });

});

app.post('/zipcode', function(req, res, next) {
    const { zip } = req.body;
    request(`https://www.wsjwine.com/api/address/zipcode/${zip}`, (err, response, body) => {
        console.log("err", err)
        if(err) {
            next(err);
        } else {
            res.send(JSON.parse(body));
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));