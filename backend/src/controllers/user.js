const 	userModel 	= require('../model/user'),
		helper      = require('../helpers/index');
		
let user = {};

// User Register
user.addUser = async function (req, res, next) {
	//console.log("req_by__",req.body);
	if(req.body.address && req.body.address != ''){		
		userModel.addUser(req.body).then(function (result) {
			console.log('result : ', result);
			if (result.status) {
				if(result.status == true){
					helper.successHandler(res, {
						data: result.message
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

user.updateUser = function (req, res, next) {
        if (req.body.UserPublicKey) {
            userModel.updateUser(req.body).then(function (result) {
				console.log(result);
                if (result) {
					helper.successHandler(res, {
						data: result.data
					}, 200);
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
				message: "Something went wrong !!"
			}, 500);
        }
}

user.getUser = function (req, res, next) {
	if (req.body) {
		userModel.getUser(req.body).then(function (result) {
			console.log(result);
			if (result) {
				helper.successHandler(res, {
					data: result.data
				}, 200);
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
			message: "Something went wrong !!"
		}, 500);
	}
}

user.AddNominee = async function (req, res, next) {
	if(req.body.UserPublicKey && req.body.UserPublicKey != ''){		
		userModel.AddNominee(req.body).then(function (result) {
			console.log('result : ', result);
			if (result.status) {
				if(result.status == true){
					helper.successHandler(res, {
						data: result.message
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

user.DeleteNominee = function (req, res, next) { 
	if (req.body.ids) {
		user.DeleteNominee(req.body).then(function (result) {
			if (result) {
				helper.successHandler(res, {
					data: result.data
				}, 200);
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
			message: "Something went wrong !!"
		}, 500);
	}
}

user.UpdateNominee = function (req, res, next) {
	if (req.body.UserPublicKey) {
		userModel.UpdateNominee(req.body).then(function (result) {
			console.log(result);
			if (result) {
				helper.successHandler(res, {
					data: result.data
				}, 200);
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
			message: "Something went wrong !!"
		}, 500);
	}
}

user.UserNominee = function (req, res, next) {
	if (req.body.UserPublicKey) {
		userModel.UserNominee(req.body).then(function (result) {
			console.log(result);
			if (result) {
				helper.successHandler(res, {
					data: {
						count: result.message.count,
						data: result.message.data
					}
				}, 200);
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
			message: "Something went wrong !!"
		}, 500);
	}
}

user.UserNomineeByUsers = function (req, res, next) {
	if (req.body.UserPublicKey) {
		userModel.UserNomineeByUsers(req.body).then(function (result) {
			console.log(result);
			if (result) {
				helper.successHandler(res, {
					data: {
						count: result.message.count,
						data: result.message.data
					}
				}, 200);
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
			message: "Something went wrong !!"
		}, 500);
	}
}


module.exports = user;