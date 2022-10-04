const 	contactModel 	= require('../model/contact'),
		helper      = require('../helpers/index'),
		path		= require('path'),
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
				
let contact = {};

// add Company Contacts by CSV File
contact.addContactCsvFile = async function (req, res, next) {
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
				contactModel.addContactCsvFile(req.file).then(function (result) {
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

// Add Company Contact
contact.addContact = async function (req, res, next) {
	console.log('Aaaaa', req.body);
	if(req.body.email && req.body.email != ''){		
		contactModel.addContact(req.body).then(function (result) {
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

// get Contact  list
contact.getContactList = async function (req, res, next) {
	console.log('Aaaaa', req.body);
	if(req.body.userId && req.body.userId != ''){		
		contactModel.getContactList(req.body).then(function (result) {
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


// get Contact by id
contact.getContactById = async function (req, res, next) {
	console.log('Aaaaa', req.body);
	if(req.body.contactId && req.body.contactId != ''){		
		contactModel.getContactById(req.body).then(function (result) {
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
			message: "Contact Id Required !!"
		}, 500);
	}
}

contact.updateContactById = function (req, res, next) {  
	if (req.body.ContactId) {
		contactModel.updateContactById(req.body).then(function (result) {
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

contact.deleteContactById = function (req, res, next) {   
	if (req.body.id) {
		contactModel.deleteContactById(req.body).then(function (result) {
			if (result) {
				res.json({
					status: true,
					code: "",
					message: 'Contact List Data Delete successfully.',
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

contact.deleteAllContactsById = function (req, res, next) {   
	if (req.body.ids) {
		contactModel.deleteAllContactsById(req.body).then(function (result) {
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
			message: "Contact Id Required !!"
		}, 500);
	}
}

module.exports = contact;