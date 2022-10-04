const 	companyModel 	= require('../model/company'),
		helper      = require('../helpers/index'),
		path		= require('path');
		csv         = require('fast-csv'),
		fs          = require('fs'),
		multer 		= require('multer');


	var storage = multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null,path.join(__dirname, '../uploads/CompanyCsv'))
		},
		filename: function (req, file, callback) {
		
			callback(null, (Math.floor(10 + Math.random() * 9)) +  "-" + file.originalname)
		}
		
	})
		
let company = {};
// add Company CSV File
company.addCompanyCsvFile = async function (req, res, next) {
	//console.log('import___', req.body);

	var upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
			console.log("Enter_img___4444");
            var ext = (path.extname(file.originalname).toLowerCase());
			console.log(ext);
            if (ext !== '.csv') {
                let obj = {
                    message: "invalid extension!"
                }
                return helper.errorHandler(res, obj, 200)
            }
            callback(null, true)
        }
    }).single('file');
    upload(req, res, function (err) {
        if (err) {
			//console.log("Error____img_up___");
			return helper.errorHandler(res, {
				status: false,
				message: err
			}, 500);
        } else {
            //console.log("chk imgoooo......",req.file);
			if(req.file != null || req.file != undefined){
				var file = req.file.filename;
				companyModel.addCompanyCsv(req.file).then(function (result) {
					console.log("lll__",__dirname, '../uploads/CompanyCsv' + file);
					console.log("lllPATH__", req.file);
					helper.successHandler(res, {
						payload: file
					}, 200);

				});
				
				} else {
					helper.errorHandler(res, {
						status: false,
						message: err
					}, 500);
				}
        }
    })
	
}

// add Company 
company.addCompany = async function (req, res, next) {
	console.log('Aaaaa', req.body);
	if(req.body.companyName && req.body.companyName != ''){		
		companyModel.addCompany(req.body).then(function (result) {
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


// get Company  list
company.getCompanyList = async function (req, res, next) {
	//console.log('Aaaaa_contcat', req.body);
	if(req.body.userId && req.body.userId != ''){		
		companyModel.getCompanyList(req.body).then(function (result) {
			//console.log('result : ', result);
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
			message: "Login Required !!"
		}, 500);
	}
}

// get Company by id
company.getCompanyById = async function (req, res, next) {
	
	if(req.body.companyId && req.body.companyId != ''){		
		companyModel.getCompanyById(req.body).then(function (result) {
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
			message: "Company Id Required !!"
		}, 500);
	}
}

company.updateCompanyById = function (req, res, next) {   
	if (req.body.CompanyId) {
		companyModel.updateCompanyById(req.body).then(function (result) {
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
		helper.errorHandler(res, {
			status: false,
			message: "Company Id Required !!"
		}, 500);
	}
}

company.deleteCompanyById = function (req, res, next) {   
	if (req.body.id) {
		companyModel.deleteCompanyById(req.body).then(function (result) {
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
		helper.errorHandler(res, {
			status: false,
			message: "Company Id Required !!"
		}, 500);
	}
}

company.deleteAllCompanysById = function (req, res, next) {  
	if (req.body.ids) {
		companyModel.deleteAllCompanysById(req.body).then(function (result) {
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
		helper.errorHandler(res, {
			status: false,
			message: "Company Id Required !!"
		}, 500);
	}
}
// get Company info by id
company.getCompanyInfoById = async function (req, res, next) {
	if(req.body.id && req.body.id != ''){		
		companyModel.getCompanyInfoById(req.body).then(function (result) {
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
			message: "Company Id Required !!"
		}, 500);
	}
}
module.exports = company;