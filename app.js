const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

// (If this is not used)
mongoose.set('useFindAndModify', false);
// (then this warning is shown)
// (node:6420) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
// (because we are using findOneAndUpdate())

const open = require('open');

const flash = require('connect-flash');
//(IF YOU WILL INSTALL JUST CONNECT-FLASH, IT WILL GIVE AN ERROR "Error: req.flash() requires sessions")

const session = require('express-session');
// (SESSION IS INSTALLED SO THAT CONNECT-FLASH CAN WORK)

const app = express();
const PORT = 1122;

// BodyParser (BOTH LINES ARE MANDATORY) (OTHERWISE, POST REQUEST WON'T WORK)
app.use(express.urlencoded({ extended:false}));
app.use(express.json())

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true     
}))

// Express Layout Should Be Above / 'VIEW ENGINE', 'EJS'
app.use(expressLayouts);

// EJS
app.set('view engine', 'ejs');

// DB Connection
const mongoDB = require('./config/keys').MONGOURI;
mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>console.log('MongoDB connected...'))
  .catch(err=>console.log(err));

// Connect Flash
app.use(flash());

app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');       
  next();
  // Console it if you want to understand how it works behind the scenes. 
  // console.log(res.locals);   
});

// GET REQUEST: /
app.get('/', (req,res) => {
    res.render('index', {title:'Quotes Management'});
});

// ALL REQUESTS: /addnewquotes/
app.use('/addnewquotes', require('./routes/addnewquotes'));

// ALL REQUESTS: /seequotes/
app.use('/seequotes', require('./routes/seequotes'));

// ALL REQUESTS: /removequotes/
app.use('/removequotes', require('./routes/removequotes'));

// ALL REQUESTS: /updatequotes/
app.use('/updatequotes', require('./routes/updatequotes'));

app.listen(PORT, console.log(`SERVER IS LIVE AT localhost:${PORT}/`));
open(`http://localhost:${PORT}`);