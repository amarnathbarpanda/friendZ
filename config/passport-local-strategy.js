const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

// authentication
passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    function(email, password, done){

        //! done is a callback function which reports back to passport

        //find a user and establish the identity
        User.findOne({email: email}, function(err, user){

            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            if(!user || user.password != password){
                console.log('Invalid Username/Password');
                return done(null, false);
                //done(no err, user not found and authentication(false))
            }

            return done(null, user);
        });
    }
));

// serializeing the user to decide which key is to be kept in the cookies
//using express-session middleware
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user){
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    })
});


// Sign in
// when the user signs in we find the id and sent it to the cookie and then cookie is sent to the browser.
// when browser sends a request we deserialize the cookie and find the user again.

passport.checkAuthentication = function(req, res, next){

    // if the user is signed in then pass on the request to the next  controller's action
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user cntains signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user; 
    }

    next();
}

module.exports = passport;