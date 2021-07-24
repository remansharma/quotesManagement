const express = require('express');
const router = express.Router();
const quotesMODEL = require('../models/quotes');

// GET REQUEST: /seequotes/
router.get('/', getQuotesFromDatabase, (req,res) => {
    res.render('seequotes', {title:'Quotes', quotesFromDatabase: req.quotesFromDatabase});
});

function getQuotesFromDatabase(req, res, next) {
    quotesMODEL.find(function(err, dataFromDatabase) {
        if (err) return console.error(err);
        req.quotesFromDatabase = dataFromDatabase;
        next();
    });
}



module.exports = router;