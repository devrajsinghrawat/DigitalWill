const 	userModel 	= require('../model/user'),
		helper      = require('../helpers/index'),
		path		= require('path');
		
let user = {};
// User Register
user.addUser = async function (req, res, next) {
	console.log('Aaaaa', req.body);
	if(req.body.email && req.body.email != ''){		
		userModel.addUser(req.body).then(function (result) {
			console.log('result : ', result);
			if (result.status) {
				if(result.status == true){
					helper.successHandler(res, {
						payload: result.message
					}, 200);
				} else {
					helper.errorHandler(res, {
						status: false,
						message: result.message
					}, 500);
				}
			} else {
				helper.errorHandler(res, {
					status: false,
					message: result.message
				}, 500);
			}         
		});
	} else {
		helper.errorHandler(res, {
			status: false,
			message: "Post data empty !!"
		}, 500);
	}
}
// get All users list
user.getAllUser = async function (req, res, next) {
	//console.log("kanu___",req.body);
	if(req.body.userId != ''){
		
		userModel.getAllUser(req.body).then(function (result) {			
			if (result.status) {
				if(result.status == true){
					helper.successHandler(res, {
						payload: result.message
					}, 200);
				} else {
					helper.errorHandler(res, {
						status: false,
						message: result.message
					}, 500);
				}

			} else {
				helper.errorHandler(res, {
					status: false,
					message: result.message
				}, 500);
			}         
		});
	} else {
		helper.errorHandler(res, {
			status: false,
			message: "Please provide user ID !!"
		}, 500);
	}
} 
// User login
user.loginUser = async function (req, res, next) {	
	if(req.body.email != '' && req.body.password != ''){		
		userModel.loginUser(req.body).then(function (result) {
			
			console.log('rrrrr', result);			
			if (result.status) {
				if(result.status == true){
					helper.successHandler(res, {
						payload: result.data
					}, 200);
				} else {
					helper.errorHandler(res, {
						status: false,
						message: result.message
					}, 500);
				}

			} else {
				helper.errorHandler(res, {
					status: false,
					message: result.message
				}, 500);
			}         
		});
	} else {
		helper.errorHandler(res, {
			status: false,
			message: "Please provide login details !!"
		}, 500);
	}
} 

// get All users by Id
user.getUserByUserId = async function (req, res, next) {
	
	if(req.body.usertoken != ''){
		console.log(req.body);
		userModel.getUserByUserId(req.body).then(function (result) {			
			if (result.status) {
				if(result.status == true){
					helper.successHandler(res, {
						payload: result.data
					}, 200);
				} else {
					helper.errorHandler(res, {
						status: false,
						message: result.message
					}, 500);
				}

			} else {
				helper.errorHandler(res, {
					status: false,
					message: result.message
				}, 500);
			}         
		});
	} else {
		helper.errorHandler(res, {
			status: false,
			message: "Please provide user token !!"
		}, 500);
	}
} 

user.updateUserRegStatus = function (req, res, next) {
        if (req.body.id) {
            userModel.updateUserRegStatus(req.body).then(function (result) {
                if (result) {
                    res.json({
                        status: true,
                        code: "",
                        message: 'Operation performed successfully.',
                        payload: {}
                    });
                } else {
                    res.status(500).send({
                        status: false,
                        message: 'Failed, Please try again.',
                        payload: {}
                    });
                }
            });
        } else {
            res.status(500).send({
                status: false,
                message: 'Something went wrong.',
                payload: {}
            });
        }
}

user.updateUserStatus = function (req, res, next) {
	if (req.body.id) {
		userModel.updateUserStatus(req).then(function (result) {
			if (result) {
				res.json({
					status: true,
					code: "",
					message: 'Operation performed successfully.',
					payload: {}
				});
			} else {
				res.status(500).send({
					status: false,
					message: 'Failed, Please try again.',
					payload: {}
				});
			}
		});
	} else {
		res.status(500).send({
			status: false,
			message: 'Something went wrong.',
			payload: {}
		});
	}
}

// Email Send Forget Password
user.ForgetPwdSendEmail = async function(req, res){
	let body = req.body;	
	console.log("Email.....", body.email)
 	if(req.body.email != ''){
		userModel.ForgetPwdSendEmail(req.body).then(function (result) {
			console.log('result : ', result);
			if (result.status) {
				if(result.status == true){
						helper.successHandler(res, {
						payload: result.message
					}, 200);
				} else {
					helper.errorHandler(res, {
						status: false,
						message: result.message
					}, 500);
				}
			} else {
				helper.errorHandler(res, {
					status: false,
					message: result.message
				}, 500);
			}         
		});
	} else {
		helper.errorHandler(res, {
			status: false,
			message: " Email can't be empty !!"
		}, 500);
	}
}


// set Forgot Password
user.setForgotPassword = async function(req, res){
    let body = req.body;

   	if(req.body.email && req.body.email != ''){
		userModel.setForgotPassword(req.body).then(function (result) {
			console.log('result : ', result.data);
			if (result.status) {
				if(result.status == true){
						helper.successHandler(res, {
						payload: result.data
					}, 200);
				} else {
					helper.errorHandler(res, {
						status: false,
						message: result.message
					}, 500);
				}
			} else {
				helper.errorHandler(res, {
					status: false,
					message: result.message
				}, 500);
			}         
		});
	} else {
		helper.errorHandler(res, {
			status: false,
			message: " email can't be empty !!"
		}, 500);
	}
   
  }
  
  //Update user password by admin
user.UpdateUserPwdbyAdmin = async function(req, res){
    let body = req.body;
   //console.log("body_____",req.body);
   	if(req.body.UserEmailId && req.body.passwordUser != ''){
		userModel.UpdateUserPwdbyAdmin(req.body).then(function (result) {
			console.log('result : ', result.message);
			if (result.status) {
				if(result.status == true){
						helper.successHandler(res, {
						payload: result.message
					}, 200);
				} else {
					helper.errorHandler(res, {
						status: false,
						message: result.message
					}, 500);
				}
			} else {
				helper.errorHandler(res, {
					status: false,
					message: result.message
				}, 500);
			}         
		});
	} else {
		helper.errorHandler(res, {
			status: false,
			message: "Password Can't be empty !!"
		}, 500);
	}

}
//change Password
user.changePwd = async function(req, res){
    let body = req.body;
   
   	if(req.body.email && req.body.password != ''){
		userModel.changePwd(req.body).then(function (result) {
			console.log('result : ', result.message);
			if (result.status) {
				if(result.status == true){
						helper.successHandler(res, {
						payload: result.message
					}, 200);
				} else {
					helper.errorHandler(res, {
						status: false,
						message: result.message
					}, 500);
				}
			} else {
				helper.errorHandler(res, {
					status: false,
					message: result.message
				}, 500);
			}         
		});
	} else {
		helper.errorHandler(res, {
			status: false,
			message: "Password Can't be empty !!"
		}, 500);
	}

}

// invite teammate
user.inviteTeamMate = async function (req, res, next) {
	if(req.body.formData && req.body.userData){		
		userModel.inviteTeamMate(req.body).then(function (result) {
			console.log('result : ', result);
			if (result.status) {
				if(result.status == true){
					helper.successHandler(res, {
						payload: result.message
					}, 200);
				} else {
					helper.errorHandler(res, {
						status: false,
						message: result.message
					}, 500);
				}
			} else {
				helper.errorHandler(res, {
					status: false,
					message: result.message
				}, 500);
			}         
		});
	} else {
		helper.errorHandler(res, {
			status: false,
			message: "Post data empty !!"
		}, 500);
	}
}


module.exports = user;