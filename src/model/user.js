const 		q  		= require('q'),
	pool  		= require('../common/pool');

const e = require('express');
let userModel = {};

//User Register Model
userModel.addUser = async function (body) {
    let deferred 		= q.defer(),
        insteredDate 	= new Date();	

	let sql = "SELECT * FROM users WHERE UserPublicKey = ? ";
	
	pool.query(sql, [body.UserPublicKey], function (error, result) {
		if (error) {
			console.log(error);
			deferred.reject(error);
		} else {			
			if(result.length < 1) {

				post = {
					UserPublicKey : body.UserPublicKey,
					CreatedAt     : insteredDate
				};				
				let sql = "INSERT INTO users SET ? ";
				
				pool.query(sql, [post], function (error, result) {
					if (error) {
						console.log(error);
						deferred.reject(error);
					} else { 

						console.log(result);
						deferred.resolve(
							{ status: true , message : { "UserPublicKey" : body.UserPublicKey }
						
							} 
						);
					}
				});
			} else {
				deferred.resolve(
					{ status: false , message : "User Already exist !!" }
				);
			}
		}
	});	   

    return deferred.promise;
}

userModel.updateUser = async function (body) {

    let deferred = q.defer(),
    sql = "UPDATE users SET  ? WHERE UserPublicKey = ?";

		post = {
			Name				:	body.Name,
			Email				:	body.Email,
			MobileNumber		:	body.MobileNumber
		};	
    pool.query(sql, [post, body.UserPublicKey], async function (error, result) {
        if (error) {
			console.log(error);
            deferred.reject(error);
        } else {
			
			let sql = "SELECT * FROM users WHERE UserPublicKey = ? ";
	
			pool.query(sql, [body.UserPublicKey], function (error, result) {
				if (error) {
					console.log(error);
					deferred.reject(error);
				} else {		
					
					console.log('result111', result);
					deferred.resolve(
						{ 	status: true , 
							data : { 
								"UserPublicKey" : result[0].UserPublicKey,
								"Name"          : result[0].Name,
								"Email"         : result[0].Email,
								"MobileNumber"	: result[0].MobileNumber							
							}					
						} 
					);
				}
			});				
           
        }
    })
    return deferred.promise;
}


userModel.getUser = async function (body) {

    let deferred = q.defer(),
    sql = "SELECT * from users WHERE UserPublicKey = ?";
    pool.query(sql, [body.UserPublicKey], async function (error, result) {
        if (error) {
			console.log(error);
            deferred.reject(error);
        } else {					
			console.log('result111', result);
			deferred.resolve(
				{ 	status: true , 
					data : { 
						"UserPublicKey" : result[0].UserPublicKey,
						"Name"          : result[0].Name,
						"Email"         : result[0].Email,
						"MobileNumber"	: result[0].MobileNumber							
					}					
				} 
			);	           
        }
    })
    return deferred.promise;
}


userModel.AddNominee = async function (body) {
    let deferred 		= q.defer(),
        insteredDate 	= new Date();	

	let sql = "SELECT * FROM nominee WHERE UserPublicKey = ? AND NomineePublicKey = ?";
	
	pool.query(sql, [body.UserPublicKey, body.NomineePublicKey], function (error, result) {
		if (error) {
			console.log(error);
			deferred.reject(error);
		} else {			
			if(result.length < 1) {

				post = {
					UserPublicKey 			: body.UserPublicKey,
					NomineePublicKey     	: body.NomineePublicKey,
					NomineeEmailId			: body.NomineeEmailId,
					NomineeMobileNumber		: body.NomineeMobileNumber,
					Percentage				: body.Percentage
				};				
				let sql = "INSERT INTO nominee SET ? ";
				
				pool.query(sql, [post], function (error, result) {
					if (error) {
						console.log(error);
						deferred.reject(error);
					} else { 

						console.log(result);
						deferred.resolve(
							{ status: true , message : { "UserPublicKey" : body.UserPublicKey }
						
							} 
						);
					}
				});
			} else {
				deferred.resolve(
					{ status: false , message : "Nominee Already exist !!" }
				);
			}
		}
	});	   

    return deferred.promise;
}

userModel.UpdateNominee = async function (body) {

    let deferred = q.defer(),
    sql = "UPDATE nominee SET  ? WHERE UserPublicKey = ? AND NomineePublicKey = ?";

	post = {
		NomineeEmailId			: body.NomineeEmailId,
		NomineeMobileNumber		: body.NomineeMobileNumber,
		Percentage				: body.Percentage
	};		
    pool.query(sql, [post, body.UserPublicKey,body.NomineePublicKey], async function (error, result) {
        if (error) {
			console.log(error);
            deferred.reject(error);
        } else {
			
			let sql = "SELECT * FROM nominee WHERE UserPublicKey = ? AND NomineePublicKey = ?";
	
			pool.query(sql, [body.UserPublicKey], function (error, result) {
				if (error) {
					console.log(error);
					deferred.reject(error);
				} else {		
					
					console.log('result111', result);
					deferred.resolve(
						{ 	status: true , 
							data : { 
								"UserPublicKey" 		: result[0].UserPublicKey,
								"NomineePublicKey"      : result[0].NomineePublicKey,
								"NomineeEmailId"        : result[0].NomineeEmailId,
								"NomineeMobileNumber"	: result[0].NomineeMobileNumber,
								"Percentage"			: result[0].Percentage						
							}					
						} 
					);
				}
			});				
           
        }
    })
    return deferred.promise;
}


module.exports = userModel;