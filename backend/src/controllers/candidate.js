const 	candidateModel 	= require('../model/candidate'),
		helper      = require('../helpers/index'),
		path		= require('path'),
		csv         = require('fast-csv'),
		fs          = require('fs'),
        multer 		= require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null,path.join(__dirname, '../uploads/Candidate/Resume'))
    },
    filename: function (req, file, callback) {
    
        callback(null, (Math.floor(10 + Math.random() * 9)) +  "-" + file.originalname)
    }
    
})

		
let candidate = {};

// Import candidate by CSV File
candidate.addCandidateCsvFile = async function (req, res, next) {
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
				candidateModel.addCandidateCsvFile(req.file).then(function (result) {
					//console.log("lll__",__dirname, '../uploads/CompanyCsv' + file);
				//	console.log("lllPATH__", req.file);
					//console.log("okkNNNNN__",result);
					return helper.successHandler(res, {
						payload: file
					}, 200);

				});
				
				} else {
					return helper.errorHandler(res, {
						status: false,
						message: err
					}, 500);
				}
        }
    })
	
}

// Submit candidate Resume 
candidate.candidateApplicationResume = function (req, res ) {
	var upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
			console.log("Enter_img___4444");
            var ext = (path.extname(file.originalname).toLowerCase());
			console.log(ext);
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.doc' && ext !== '.pdf' && ext !== '.docx') {
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
				//console.log("picUpload_TEST@__",file);
					helper.successHandler(res, {
						payload: file
					}, 200);
				} else {
					helper.errorHandler(res, {
						status: false,
						message: err
					}, 500);
				}
        }
    })
}
// Add Company candidate
candidate.addCandidate = async function (req, res, next) {
	console.log('Aaaaazzzz', req.body);
	if(req.body.Email && req.body.Email != ''){		
		candidateModel.addCandidate(req.body).then(function (result) {
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

// get candidate  list
candidate.getCandidateList = async function (req, res, next) {
	console.log('Aaaaa', req.body);
	if(req.body.userId && req.body.userId != ''){		
		candidateModel.getCandidateList(req.body).then(function (result) {
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
			message: "Login Required !!"
		}, 500);
	}
}


// get candidate by id
candidate.getCandidateById = async function (req, res, next) {
	console.log('Aaaaa', req.body);
	if(req.body.candidateId && req.body.candidateId != ''){		
		candidateModel.getCandidateById(req.body).then(function (result) {
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
			message: "candidate Id Required !!"
		}, 500);
	}
}

candidate.updateCandidateById = function (req, res, next) {   
	if (req.body.candidateId) {
		candidateModel.updateCandidateById(req.body).then(function (result) {
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

candidate.deleteCandidateById = function (req, res, next) {   
	if (req.body.id) {
		candidateModel.deleteCandidateById(req.body).then(function (result) {
			if (result) {
				res.json({
					status: true,
					code: "",
					message: 'candidate List Data Delete successfully.',
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

candidate.deleteAllCandidatesById = function (req, res, next) {   
	if (req.body.ids) {
		candidateModel.deleteAllCandidatesById(req.body).then(function (result) {
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
			message: "candidate Id Required !!"
		}, 500);
	}
}

module.exports = candidate;