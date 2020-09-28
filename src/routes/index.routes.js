const index = require('express').Router();


index.get('/', (req, res) => {
    res.render('pages/home')
})

module.exports = index;