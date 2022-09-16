const passport =require('passport');
const JWTstategy=require('passport-jwt').Strategy;
//to extract the JWT from the headers.
const ExtractJWT=require('passport-jwt').ExtractJwt;
//import user model
const User=require('../models/user');

let ops={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:'0s9e0c6r2e0t01'
}

passport.use(new JWTstategy(ops,function(jwtPayload,done){
    User.findById(jwtPayload._id,function(err,user){
        if(err){console.log(err);return}
        if(user){return done(null,user);}else{return done(null,false);}
    })
}));

module.exports=passport;