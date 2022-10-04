
module.exports.allowHeaders = function( req, res, next ) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    // Set custom headers for CORS
    res.header( 'Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key,Authorization' );

    if ( req.method == 'OPTIONS' ) {
        res.status( 200 ).end();
    } else {
        next();
    }
};


module.exports.authenticate = async function( req, res, next ) {
    // if ( req.session && req.session.email == undefined ) {  
    //     return res.redirect('/admin');
    // }   
    // else {
    //     next();
    // }
    // console.log(req.session.passport)

    if (  req.session.passport == undefined ) {  
        return res.redirect( '/loginUser' );
    } else {
        next();
    }
};


module.exports.authenticate1 = function( req, res, next ) {
    // if ( req.session && req.session.email == undefined ) {  
    //     next();
    // } else {
    //     return res.redirect('/admin/dashboard');
    // }

    if ( req.session && req.session.passport == undefined ) {  
        next();
    } else {
        return res.redirect( '/loginUser' );
    }
};

