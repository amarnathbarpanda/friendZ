const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// to read and write  cookies
const cookieParser = require('cookie-parser'); 
// used for session cookie 
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//this wont work 
// const MongoStore = require('connect-mongo')(session); 
const MongoStore = require('connect-mongo'); 
const port = 8000;

// It parses incoming requests with urlencoded payloads and is based on body-parser
app.use(express.urlencoded())
// accessing cookies
app.use(cookieParser());

app.use(express.static('./assets'));

// accessing layouts
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true); 
app.set('layout extractScripts', true); 



// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views'); 

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    // todo change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,// when user is not signed in then donot save anything in cookie
    resave: false, // don't save cookie again and again if it is not changed.
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        // mongooseConnection: db, this won't work 
        mongoUrl: 'mongodb://localhost/codial_new_dev',
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongo ok');
    }) 
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use('/', require('./routes'));



app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});