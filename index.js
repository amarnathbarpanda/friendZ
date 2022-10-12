const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/', require('./routes'));

// setting up view engine
app.set('view engine', 'ejs');
app.set('view', './views');

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});