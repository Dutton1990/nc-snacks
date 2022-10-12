const express = require('express');
const {getSnacks, postSnack} = require('./controllers/snacksController');
const getDrinkById = require('./controllers/drinksController')

const app = express();
app.use(express.json())

app.get('/api/snacks', getSnacks);
app.get('/api/drinks/:drink_id', getDrinkById)

app.post('/api/snacks', postSnack)

app.get('/api/drinks', getDrinks)


app.use((err, req, res, next) => {
    if (err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    if (err.code === '22P02'){
        res.status(400).send({msg: 'SQL says no'})
    } else {
        next(err)
    }
})

app.use((err, req, res, next) => {
    res.status(500).send({msg: 'internal server error'})
})

module.exports = app;


// -> valid ID 200 status code and a drink
// -> valid ID but doesn't exist -> 404 status code -> /api/drinks/100000
// -> invalid ID (ie string? ) /api/drinks/notanId -> 400 bad request
