const express = require('express');
const router = express.Router();
const quotesMODEL = require('../models/quotes');

// GET REQUEST: /removequotes/
router.get('/', getQuotesFromDatabase, (req,res) => {
    res.render('removequotes', {title:'Remove Quotes', quotesFromDatabase:req.quotesFromDatabase });
});


function getQuotesFromDatabase(req, res, next) {
    quotesMODEL.find(function(err, dataFromDatabase) {
        if (err) return console.error(err);
        req.quotesFromDatabase = dataFromDatabase;
        next();
    });
}

router.post('/', (req, res) => {
    const {quoteid} = req.body;
    console.log("Quote to remove: ",quoteid);

    // 
    quotesMODEL.findByIdAndDelete(quoteid, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        }
    });
    // 

    req.flash("success_msg", "Database: Quote removed successfully.");
    res.redirect('/removequotes');
});

module.exports = router;