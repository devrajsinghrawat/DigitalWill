localStrategy   = require('passport-local').Strategy;
UserModel	          = require('../model/user'),

module.exports = function( passport ) {

  passport.serializeUser( function( user , done ) {
    done( null, user );
  })

  passport.deserializeUser( function( user , done ) {
    done( null, user );
  })

  passport.use( new localStrategy ({ 
    usernameField: "u_email",
    passwordField : "u_password",
  }, function( u_email , u_password, done ) {
    userModel.adminLogin( u_email , u_password ).then( function( result ) {
          if ( result ) { 
            return done( null, { data:result });
          } else {
            return done( null, false );
          }
      }).catch(err => done(err));
  }));
}