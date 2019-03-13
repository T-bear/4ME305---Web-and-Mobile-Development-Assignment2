const express = require('express');
const app = express();
const passport = require('passport');

//Passport session and initialization
app.use(passport.initialize());
app.use(passport.session());

//Google strategy
passport.use(new GoogleStrategy({
    clientID: '604880648774-4qbuienc8391qcjktj78qkpnrqjt16pr.apps.googleusercontent.com',
    clientSecret: 'KvcJyJ4FVI4k3virSrtU5pMD',
    callbackURL: 'http://localhost:8100/auth/google/callback'
},
    function (accessToken, refreshToken, profile, done) {
        queryDatabase("INSERT IGNORE INTO user (email, Role_IDrole, Organization) VALUES ('" + profile.emails[0].value + "', 2, 1)");
        return done(null, profile);
       //});
    }
));

//Authenticating Google login
app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login',
            'email'] 
}));



app.get('/auth/google/callback', passport.authenticate('google',  { successRedirect: '/tab2',
                                                                    failureRedirect: '/tab1'}));