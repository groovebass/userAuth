const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
const {User} = require('../models/User');




passport.serializeUser((user, done) =>{
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});


  // Local Sign In and Signup with Email and pasword
passport.use(new LocalStrategy ({ usernameField: 'email', passwordField: 'password' }, (email,password,done) => {


  User.findOne({ email: email.toLowerCase()}, (err, user)=> {

    if (err) {
      
      return done (err);}
    if (!user){
      return done(null, false, {msg: `Username ${email} not found.`})
    }
    if (!user.password){
      return done(null, false, {msg: "Try login in using Google"})
    } 

    user.comparePassword(password, ( err, isMatch) =>{
      if (err) {return done (err);}
      if (isMatch){
        return done(null,user);
      }
      return done(null, false, { msg: 'Invalid email or password.' });
    });
    
  });
}));


// Register or Signin with GoogleStrategy Aouth20 
const googleStrategyConfig = new GoogleStrategy({
    clientID:     process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/dashboard",
    passReqToCallback   : true
}, (req, accessToken, refreshToken, params, profile, done) => {
  console.log('req.user', req.user)
  if (req.user) {
      User.findOne({ googleId: profile.id }, (err, existingUser) => {
          if (err) { return done(err); }
          if (existingUser && (existingUser.id !== req.user.id)) {
              done(err);
          } else {
              User.findById(req.user.id, (err, user) => {
                  if (err) { return done(err); }
                  user.googleId = profile.id;
                  user.tokens.push({
                      kind: 'google',
                      accessToken,
                      accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
                      refreshToken,
                  });
                  user.name = user.name || profile.displayName;
                  user.image = user.image || profile._json.picture;
                  user.save((err) => {
                      done(err, user);
                  });
              });
          }
      });
  } else {
      User.findOne({ googleId: profile.id }, (err, existingUser) => {

          if (err) { return done(err); }
          if (existingUser) {
              return done(null, existingUser);
          }
          User.findOne({ email: profile.emails[0].value }, (err, existingEmailUser) => {
              if (err) { return done(err); }
              if (existingEmailUser) {
                  done(err);
              } else {
                  const user = new User();
                  user.email = profile.emails[0].value;
                  user.googleId = profile.id;
                  user.tokens.push({
                      kind: 'google',
                      accessToken,
                      accessTokenExpires: moment().add(params.expires_in, 'seconds').format(),
                      refreshToken,
                  });
                  user.name = user.name || profile.displayName;
                  user.image = user.image || profile._json.picture;
                  user.save((err) => {
                      done(err, user);
                  });
              }
          });
      });
  }
});

passport.use('google', googleStrategyConfig);