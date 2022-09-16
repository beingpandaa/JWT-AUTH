const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/jwt');
const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error in connecting to Database"));
db.once('open',function(){
    console.log('Connected to Database')
});
module.exports=db;