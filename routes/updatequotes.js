const express = require('express');
const router = express.Router();
const quotesMODEL = require('../models/quotes');

router.get('/', getQuotesFromDatabase, (req, res) => {
    res.render('updatequotes', {title:"Update Quotes", quotesFromDatabase:req.quotesFromDatabase });
});

function getQuotesFromDatabase(req, res, next) {
    quotesMODEL.find(function(err, dataFromDatabase) {
        if (err) return console.error(err);
        req.quotesFromDatabase = dataFromDatabase;
        next();
    });
}

router.post('/', (req, res) => {
    const {quoteID,updatedQuote,updatedAuthor} = req.body;
    console.log(quoteID);
    console.log(updatedQuote);
    console.log(updatedAuthor);

    if(updatedAuthor== "" || updatedQuote =="" ) {
        req.flash("error_msg", "Please fill in all details.");
        return res.redirect('/updatequotes');
    } else {

        quotesMODEL.findByIdAndUpdate(quoteID, { quote: updatedQuote, author: updatedAuthor },
            function (err, docs) {
            if (err){
                console.log(err)
                req.flash("error_msg", "Database: There is some error.");
                res.redirect('/updatequotes');
            }
            else{
                console.log("Updated User : ", docs);
                req.flash("success_msg", "Database: Quote updated successfully.");
                res.redirect('/updatequotes');
            }
        });

    }

    


});

module.exports = router;