const 		q  		= require('q'),
	randomstring	= require("randomstring"),
	  pool  		= require('../common/pool'),
	  nodemailer    = require('nodemailer'),
      request       = require('request');	  
const { hashSync, genSaltSync, compareSync } = require("bcrypt");	  
const e = require('express');
let userModel = {};

//User Register Model
userModel.addUser = async function (body) {
    let deferred 		= q.defer(),
        insteredDate 	= new Date(),
		uuid = randomstring.generate(20);	

	let sql = "SELECT * FROM userinfo WHERE EmailId = ? ";
	
	pool.query(sql, [body.email], function (error, result) {
		if (error) {
			console.log(error);
			deferred.reject(error);
		} else {			
			if(result.length < 1) {
				const salt = genSaltSync(10);
            	password = hashSync(body.password, salt);

				RegStatus = 'N';
				if(body.invite == 'invite'){
					RegStatus = 'TR';
				}

				post = {
					FirstName:body.name,
					ApplicationLanguage:body.language,
					EmailId: body.email,
					UserRoleId: '1',
					Password: password,
					RegStatus: RegStatus,
					CreationDate:insteredDate

				};				
				let sql = "INSERT INTO userinfo SET ? ";
				
				pool.query(sql, [post], function (error, result) {
					if (error) {
						console.log(error);
						deferred.reject(error);
					} else { 

						// post = {
						// 	ClientId			: 	result.insertId,
						// 	EmailId				:	body.email,
						// 	FirstName			:  	body.name,
						// 	ApplicationLanguage : 	body.language		
						// };	
						
						// let sql1 = "INSERT INTO clientprofile SET ? ";
						
						// pool.query(sql1, [post], function (error1, result1) {
						// 	if (error1) {
						// 		console.log(error1);								
						// 	} else { 
						// 		console.log(result1);								
						// 	}
						// });

						post = {
							UserEmailId: body.email,
							Password1: password,
							LastPassword : 1		
						};	
						let sql = "INSERT INTO passwordhistory SET ? ";
						
						pool.query(sql, [post], function (error1, result1) {
							if (error1) {
								console.log(error1);								
							} else { 
								console.log(result1);								
							}
						});


						if(body.invite == 'invite'){
							let sql = "Update invitation SET Status = 'TR' where EmailId = ? ";
						
							pool.query(sql, [body.email], function (error1, result1) {
								if (error1) {
									console.log(error1);								
								} else { 
									console.log(result1);								
								}
							});
						}

						console.log(result);
						deferred.resolve(
							{ status: true , message : { id : result.insertId } }
						);
					}
				});
			} else {
				deferred.resolve(
					{ status: false , message : "Email Already exist !!" }
				);
			}
		}
	});	   

    return deferred.promise;
}

userModel.adminLogin = function (email, password) {
    let deferred = q.defer(),
        sqlQuery = "SELECT * FROM userinfo WHERE EmailId = ?";

    pool.query(sqlQuery, [email], async function (error, row, fields) {
        if (error) {
            
            deferred.reject(error);
        } else {
            if (row && row != '') {
            const passmatch = compareSync(password, result[0].Password);
         
			if(result.length >0 && passmatch == true){
                    deferred.resolve(row[0]);
                } else {
                    deferred.resolve(false);
                }
            } else {
                deferred.resolve(false);
            }
        }
    });
    return deferred.promise;
}

// User Login Model
userModel.loginUser = async function (body, session) {
    let deferred 		= q.defer();
	console.log("Body.......",body.password);
	let pwd = body.password;
	let sql = "SELECT * from userinfo WHERE EmailId = ? ";
	
	pool.query(sql, [body.email], function (error, result) {
		if (error) {
			deferred.reject(error);
		} else if(result != ''){
		const passmatch = compareSync(pwd, result[0].Password);
         
			if(result.length >0 && passmatch == true){
				deferred.resolve({ 
					status: true , 
					data : result				
				}); 
			} else {
				deferred.resolve({ 
					status: false , 
					message : "Invalid login details or user not exist !!"						
				});
			}
		}else{
			deferred.resolve({ 
				status: false , 
				message : "Invalid login details or user not exist !!"						
			});

		}

	});
	return deferred.promise;
}
// get All user
userModel.getAllUser = async function(body){
	let deferred 		= q.defer();
	let sql = "SELECT `EmailId` FROM `userinfo` WHERE `UserRoleId` != 0";
	pool.query(sql,[], function (error, result) {	  
		if (error) {
			deferred.reject(error);
		} else { 
			if(result.length > 0 ) {
				
				deferred.resolve(
					{ status: true , message : { payload : result } }
				);
			} else {
				deferred.resolve(
					{ status: false , message : "Record not found !!" }
				);				
			}
		} 
    });
	
	return deferred.promise;
}
// Update user password by admin
userModel.UpdateUserPwdbyAdmin = async function (body) {

    let deferred = q.defer();
	const salt = genSaltSync(10);
    password = hashSync(body.passwordUser, salt);
        sql = "UPDATE userinfo SET Password = ? WHERE EmailId = ?";
    
    pool.query(sql, [password, body.UserEmailId], async function (error, result) {
        if (error) {
            deferred.reject(error);
        } else {
           //deferred.resolve(true);
		   deferred.resolve(
			{ status: true , message : "Password Updated successfully !" }
		)
        }
    })
    return deferred.promise;
}
// get user by id model
userModel.getUserByUserId = async function(body){
	let deferred 		= q.defer();
	let sql = "select * from userinfo where UserId = ?";
	
	pool.query(sql, [body.UserId], function (error, result) {		  
		if (error) {
			deferred.reject(error);
		} else { 
			if(result.length > 0 ) {
				deferred.resolve(
					{ status: true , 
					data : result[0] }
				);
			} else {
				deferred.resolve(
					{ status: false , message : "Record not found !!" }
				);				
			}
		} 
    });
	
	return deferred.promise;
}

userModel.updateUserRegStatus = async function (body) {

    let deferred = q.defer(),
        sql = "UPDATE userinfo SET RegStatus = ? WHERE UserId = ?";
    
    pool.query(sql, [body.status, body.id], async function (error, result) {
        if (error) {
            deferred.reject(error);
        } else {
           deferred.resolve(true);
        }
    })
    return deferred.promise;
}

userModel.updateUserStatus = async function (body) {

    let deferred = q.defer(),
        sql = "UPDATE userinfo SET Status = ? WHERE UserId = ?";
    
    pool.query(sql, [body.status, body.id], async function (error, result) {
        if (error) {
            deferred.reject(error);
        } else {
           deferred.resolve(true);
        }
    })
    return deferred.promise;
}

//Send Email to user
 userModel.ForgetPwdSendEmail = async function(body){
	let deferred 		= q.defer();
	let emails = body.email;
    //Insert otp
	console.log("Model-email-get....", emails);
	
	let sql = "SELECT * FROM userinfo WHERE EmailId = ? ";
	
	pool.query(sql, [body.email], function (error, result) {
		if (error) {
			console.log(error);
			deferred.reject(error);
		} else {
			if(result != '') {
				console.log(result);
				let usereml = result[0].email;
				let userName = result[0].name;

				let mailTransporter = nodemailer.createTransport({
					service: 'gmail',
					port: 25,
					host: 'localhost',
					auth: {
						user: 'spprtmandeep@gmail.com',
						pass: 'poqqdwfyvblnexrn'
					} 								
				});
						  
				let mailDetails = {
					from: 'spprtmandeep@gmail.com',
					to: emails,
					subject: 'Password Reset Email',
					html : "<h3>Hello</h3><h4>You can reset your password using this link. </h4>Please Click on the link <a href='http://localhost:3000/updatepassword/?eml="+emails+"'>Change password</a> to Change your password"
				};
				mailTransporter.sendMail(mailDetails, function(err, results) {
					if(err) {
						console.log("Error Occurs",err);
						deferred.reject(err);
					} else {
						deferred.resolve(
							{ status: true , message : "Email Send Please Check your mail" }
						);
						
					}
				}); 
					  
			}else{
				deferred.resolve(
					{ status: false , message : "Email Does not match !!" }
				);
			}
		}
	});
	return deferred.promise;
}

// set Forgot Password
userModel.setForgotPassword = async function(body){
	 let deferred 		= q.defer();
	 let sql = "SELECT * FROM userinfo WHERE EmailId = ? ";
	
	pool.query(sql, [body.email], function (error, result) {
		if (error) {
			 console.log(error);
			 deferred.reject(error);
		} else {
			if(result != '') {
				let userEmail 	= result[0].EmailId;
				let sqlcmd = "SELECT * FROM passwordhistory WHERE UserEmailId = ? ";

				pool.query(sqlcmd, [body.email], function (error, pwdresult) {
					if (error) {
						console.log(error);
						deferred.reject(error);
					} else {
						console.log("chhchhch",pwdresult);
						if(pwdresult != '') {
							let chnEmail 	= pwdresult[0].UserEmailId;
							let Password1	= pwdresult[0].Password1;
							let Password2 	= pwdresult[0].Password2;
							let Password3 	= pwdresult[0].Password3;
							let Password4 	= pwdresult[0].Password4;
							let Password5 	= pwdresult[0].Password5;
							let Password6 	= pwdresult[0].Password6;
							let LastPassword = pwdresult[0].LastPassword;

							if(Password1 == null ){
								Password1 = '';
							}
							if(Password2 == null ){
								Password2 = '';
							}
							if(Password3 == null ){
								Password3 = '';
							}
							if(Password4 == null ){
								Password4 = '';
							}
							if(Password5 == null ){
								Password5 = '';
							}
							if(Password6 == null ){
								Password6 = '';
							}

							let passmatch1 = compareSync(body.password, Password1);
							let passmatch2 = compareSync(body.password, Password2);
							let passmatch3 = compareSync(body.password, Password3);
							let passmatch4 = compareSync(body.password, Password4);
							let passmatch5 = compareSync(body.password, Password5);
							let passmatch6 = compareSync(body.password, Password6);

							const salt = genSaltSync(10);
							let pwd = hashSync(body.password, salt);

							if(passmatch1 == true || passmatch2 == true  || passmatch3 == true  || passmatch4 == true  || passmatch5 == true  || passmatch6 == true ){
								deferred.resolve(
									{ status: false , message : "Password should not be match with last six passwords !!" }
								);
							} else {
								pool.query(
									`update userinfo set Password = ? where EmailId = ?`,
									[
										pwd,
										chnEmail						
									],
									(error, result) => {
										if (error) {
											console.log(error);
											deferred.reject(error);
										}

										if(LastPassword == 1){
											Password2 = pwd;
										} else if (LastPassword == 2) {
											Password3 = pwd;
										} else if (LastPassword == 3) {
											Password4 = pwd;
										} else if (LastPassword == 4) {
											Password5 = pwd;
										} else if (LastPassword == 5) {
											Password6 = pwd;
										} else {								
											Password1 = pwd;
										}

										let newLastPassword = '';
										if(LastPassword < 6 ){
											newLastPassword = LastPassword+1;
										} else {
											newLastPassword = 1;
										}

										pool.query(
											`update passwordhistory set Password1 = ?,Password2 = ?,Password3 = ?,Password4 = ?,Password5 = ?,Password6 = ? ,LastPassword = ? where UserEmailId = ?`,
											[
												Password1,
												Password2,
												Password3,
												Password4,
												Password5,
												Password6,
												newLastPassword,									
												chnEmail						
											],
										(error1, result1) => {
												if(error1){
													console.log('error11', error1);
												} else {
													console.log( 'result11', result1);
												}
											}
										);
										console.log("password chk status",result);
										deferred.resolve(
											{ status: true , message : "Password Updated successfully !" }
										)
									}
								);
							}
						} else {
							deferred.resolve(
								{ status: false , message : "Password Does not update Please check your email and password !" }
							);
						}
						
					}
				});	 
			}
		}
	});	

    return deferred.promise;
	
}

// Change Password/ update new password model
userModel.changePwd = async function(body){
	 let deferred 		= q.defer();
	 //console.log("user password",body.password);

	let sql = "SELECT * FROM userinfo WHERE EmailId = ? ";
	
	pool.query(sql, [body.email], function (error, result) {
		if (error) {
			 console.log(error);
			 deferred.reject(error);
		} else {
			if(result != '') {
				let userEmail 	= result[0].EmailId;
				let pwd         = result[0].Password;

				let currentpwd = compareSync(body.currentpassword, pwd);

				if(currentpwd == true ){

					let sqlcmd = "SELECT * FROM passwordhistory WHERE UserEmailId = ? ";
	
					pool.query(sqlcmd, [body.email], function (error, pwdresult) {
						if (error) {
							console.log(error);
							deferred.reject(error);
						} else {
							console.log("chhchhch",pwdresult);
							if(pwdresult != '') {
								let chnEmail 	= pwdresult[0].UserEmailId;
								let Password1	= pwdresult[0].Password1;
								let Password2 	= pwdresult[0].Password2;
								let Password3 	= pwdresult[0].Password3;
								let Password4 	= pwdresult[0].Password4;
								let Password5 	= pwdresult[0].Password5;
								let Password6 	= pwdresult[0].Password6;
								let LastPassword = pwdresult[0].LastPassword;

								if(Password1 == null ){
									Password1 = '';
								}
								if(Password2 == null ){
									Password2 = '';
								}
								if(Password3 == null ){
									Password3 = '';
								}
								if(Password4 == null ){
									Password4 = '';
								}
								if(Password5 == null ){
									Password5 = '';
								}
								if(Password6 == null ){
									Password6 = '';
								}

								let passmatch1 = compareSync(body.password, Password1);
								let passmatch2 = compareSync(body.password, Password2);
								let passmatch3 = compareSync(body.password, Password3);
								let passmatch4 = compareSync(body.password, Password4);
								let passmatch5 = compareSync(body.password, Password5);
								let passmatch6 = compareSync(body.password, Password6);

								const salt = genSaltSync(10);
								let pwd = hashSync(body.password, salt);

								if(passmatch1 == true || passmatch2 == true  || passmatch3 == true  || passmatch4 == true  || passmatch5 == true  || passmatch6 == true ){
									deferred.resolve(
										{ status: false , message : "Password should not be match with last six passwords !!" }
									);
								} else {
									pool.query(
										`update userinfo set Password = ? where EmailId = ?`,
										[
											pwd,
											chnEmail						
										],
										(error, result) => {
											if (error) {
												console.log(error);
												deferred.reject(error);
											}

											if(LastPassword == 1){
												Password2 = pwd;
											} else if (LastPassword == 2) {
												Password3 = pwd;
											} else if (LastPassword == 3) {
												Password4 = pwd;
											} else if (LastPassword == 4) {
												Password5 = pwd;
											} else if (LastPassword == 5) {
												Password6 = pwd;
											} else {								
												Password1 = pwd;
											}

											let newLastPassword = '';
											if(LastPassword < 6 ){
												newLastPassword = LastPassword+1;
											} else {
												newLastPassword = 1;
											}

											pool.query(
												`update passwordhistory set Password1 = ?,Password2 = ?,Password3 = ?,Password4 = ?,Password5 = ?,Password6 = ? ,LastPassword = ? where UserEmailId = ?`,
												[
													Password1,
													Password2,
													Password3,
													Password4,
													Password5,
													Password6,
													newLastPassword,									
													chnEmail						
												],
											(error1, result1) => {
													if(error1){
														console.log('error11', error1);
													} else {
														console.log( 'result11', result1);
													}
												}
											);
											console.log("password chk status",result);
											deferred.resolve(
												{ status: true , message : "Password Updated successfully !" }
											)
										}
									);
								}
							} else {
								deferred.resolve(
									{ status: false , message : "Password Does not update Please check your email and password !" }
								);
							}
							
						}
					});	 	

				} else {
					deferred.resolve(
						{ status: false , message : "Current Password Does not match !!" }
					);
				}

			}
		}
	});	

    return deferred.promise;
	
}

//User inviteTeamMate Model
userModel.inviteTeamMate = async function (body) {

	let invites =  body.formData.taskList;
	//userId = JSON.parse(body.userData).id;
	 userId = body.userData;
    let deferred 		= q.defer(),
        insteredDate 	= new Date(),
		uuid = randomstring.generate(20);	

	console.log('ength', invites.length);
	for (let i = 0; i < invites.length; i++) {
		let inviteEmail = '';
		let inviteRole  = '';
		inviteEmail =  invites[i].email;
		inviteRole  =  invites[i].taskStatus;

		console.log('inviteEmail', inviteEmail);
		console.log('inviteRole', inviteRole);

			let sql = "SELECT * FROM userinfo WHERE EmailId = ? ";
			
			pool.query(sql, [inviteEmail], function (error, result) {
				if (error) {
					console.log(error);
					//deferred.reject(error);
				} else {			
					if(result.length < 1) {

						//=============================
						code = randomstring.generate(20);
						UserEmailId 	= inviteEmail;	
						UserRole    	= inviteRole;
						CurrentUserId   = userId;

						let mailTransporter = nodemailer.createTransport({
							service: 'gmail',
							port: 25,
							host: 'localhost',
							auth: {
								user: 'spprtmandeep@gmail.com',
								pass: 'poqqdwfyvblnexrn'
							} 								
						});
									
						let mailDetails = {
							from: 'spprtmandeep@gmail.com',
							to: inviteEmail,
							subject: 'Invite to join InfoDrive Solutions Pte.Ltd. on Recruit CRM',
							html : "<h3>Hello, </h3><h3> You have been invited to join 'InfoDrive Solutions Pte.Ltd.' on Recruit CRM.<br>Click on the link below to join 'InfoDrive Solutions Pte.Ltd.'.  </h3><br><a href='http://localhost:3000/signup/?code="+code+"'>Click the link to accept the invitation</a><br><br><h3>Recruit CRM lets recruitment firms manage all their work in one place. We hope that using Recruit CRM helps make your life a little easier :)</h3>"
						};
						
						mailTransporter.sendMail(mailDetails, function(err, results) {
							if(err) {
								console.log("Error Occurs",err);
								//deferred.reject(err);
							} else {
								console.log("resultsaaaa",results);
								post = {
									EmailId		: UserEmailId,
									Role		: UserRole,
									Status  	: 'ES',
									CreatedBy	: CurrentUserId	
								};				
								let sql = "INSERT INTO invitation SET ? ";
								
								pool.query(sql, [post], function (error1, result1) {
									if (error1) {
										console.log(error1);	
										// deferred.resolve(
										// 	{ status: false , message : "Something Went wrong !!" }
										// );							
									} else { 
										console.log(result1);
										// deferred.resolve(
										// 	{ status: true , message : "Invite Email Sent !!" }
										// );								
									}
								});
								
							}
						}); 

						//==================================
					} else {
						// deferred.resolve(
						// 	{ status: false , message : "Email Already exist !!" }
						// );
					}
				}
			});	   
	}
	deferred.resolve(
		{ status: true , message : "Invite Email Sent !!" }
	);
    return deferred.promise;
}

module.exports = userModel;