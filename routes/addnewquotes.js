// REQUESTS: /addnewquotes/
const express = require('express');
const router = express.Router();
const quotesMODEL = require("../models/quotes");

router.get('/', (req, res) => {
    res.render('addnewquotes', {title: 'Add a New Quote'});
});

router.post('/', (req, res) => {    
    const {quote, author} = req.body;     

    let errors = [];
    if((quote || author) == "") {        
        errors.push({msg: "Please fill in all fields"});
        
        req.flash("error_msg", "Please fill in all details.");
        return res.redirect('/addnewquotes');
    }

    var awesome_instance = new quotesMODEL({ quote: quote, author: author });

    // Save the new model instance, passing a callback
    awesome_instance.save(function (err) {

        if(err) {
            // if (err) return handleError(err);
            console.log('DATABASE: THERE IS AN ERROR.');
            console.log(err);                        
        } 

        // saved!
        console.log('DATABASE: QUOTE SAVED SUCCESSFULLY.');
    });
    
    req.flash("success_msg", "Database: Quote saved successfully.");
    res.redirect('/addnewquotes');
});

module.exports = router;