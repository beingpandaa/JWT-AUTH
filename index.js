const express = require('express');
const app = express();
const port = 8001;
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose')
const passport=require('passport');
const passportJWT=require('./config/passport-jwt')
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});

