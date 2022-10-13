const express = require('express');
const app = express();
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// to read and write  cookies
const cookieParser = require('cookie-parser'); 
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

//use express router
app.use('/', require('./routes'));

// setting up view engine
app.set('view engine', 'ejs');
app.set('views', './views'); 

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});