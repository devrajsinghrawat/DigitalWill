const 		q  		= require('q'),
	randomstring	= require("randomstring"),
	  pool  		= require('../common/pool'),
	  nodemailer    = require('nodemailer'),
      request       = require('request'),
	  fs          = require('fs'),
	  multer 		= require('multer'),	
	  render   		=  require('xlsx');	  
const { hashSync, genSaltSync, compareSync } = require("bcrypt");	  
const e = require('express');
let contactModel = {};

//add Contact Model csv file
contactModel.addContactCsvFile = async function (file) {
    let deferred 		= q.defer();

    console.log("model_consolecsv___",file);
	let filePath  = file.path;
	const files = render.readFile(filePath);
	const sheets = files.SheetNames;
	console.log("sheet_name",sheets);
	const csvData = [];
	for(let i = 0; i < sheets.length; i++ ){
		const sheetname = sheets[i];
		const sheetData = render.utils.sheet_to_json(files.Sheets[sheetname]);
		
		sheetData.forEach((a)  =>{
			csvData.push(a);
		})

	}

	for(let i = 0; i < csvData.length; i++ ){

		console.log("lenght____",csvData.length);
		let CompanyName = csvData[i].CompanyName;
		let FirstName = csvData[i].FirstName;
		let LastName = csvData[i].LastName;
		let Title = csvData[i].Title;
		let Email = csvData[i].Email;
		let Phone = csvData[i].Phone;
		let City = csvData[i].City;
		let FacebookURL = csvData[i].FacebookURL;
		let TwitterURL = csvData[i].TwitterURL;
		let LinkedInURL = csvData[i].LinkedInURL;
		let Stage = csvData[i].Stage;
		let sql = "SELECT CompanyId  FROM company WHERE CompanyName = ? ";
	
		pool.query(sql, [CompanyName], function (error, result) {
		 let compnyId = result['0'].CompanyId;
		 if(compnyId !='') {
            console.log("ENTER_BODY__");
			post = {
				CompanyId	:	compnyId,
				FirstName	:	FirstName,
				LastName	:   LastName,
				Title		:	Title,
				Email		:	Email,
				Phone		:	Phone,
				City	    :	City,
				FacebookURL	:	FacebookURL,
				TwitterURL	:	TwitterURL,
				LinkedInURL	:	LinkedInURL,
	     		Stage		:	Stage,
				
			};	
			console.log("post_print__",post);			
			let sql = "INSERT INTO contacts SET ? ";
			
			pool.query(sql, [post], function (error, result) {
				if (error) {
					console.log(error);
					deferred.reject(error);
				} else { 
					console.log(result);
					deferred.resolve(
						{ status: true , message : { ContactId : result.insertId } }
					);
				}
			});
		} else {
			deferred.resolve(
				{ status: false , message : "Contact with this email-id Already exist !!" }
			);
		}

		});

	}
		   
	fs.unlinkSync(filePath)
    return deferred.promise;
}
//add Contact Model
contactModel.addContact = async function (body) {
    let deferred 		= q.defer();	

	let sql = "SELECT * FROM contacts WHERE email = ? ";
	
	pool.query(sql, [body.email], function (error, result) {
		if (error) {
			console.log(error);
			deferred.reject(error);
		} else {			
			if(result.length < 1) {

				post = {
					CompanyId	:  	body.companyName,
					OwnerId     : 	body.OwnerId,
					FirstName	:	body.fName,
					LastName	:	body.lName,
					Title		:	body.title,
					Email		:	body.email,
					Phone		:	body.phoneNumber,
					City		:	body.cityName,
					FacebookURL	:	body.fbUrl,
					TwitterURL	:	body.twtUrl,
					LinkedInURL	:	body.linkdin_url,
					Stage		:	body.stage,

				};				
				let sql = "INSERT INTO contacts SET ? ";
				
				pool.query(sql, [post], function (error, result) {
					if (error) {
						console.log(error);
						deferred.reject(error);
					} else { 
						console.log(result);
						deferred.resolve(
							{ status: true , message : { ContactId : result.insertId } }
						);
					}
				});
			} else {
				deferred.resolve(
					{ status: false , message : "Contact with this email-id Already exist !!" }
				);
			}
		}
	});	   

    return deferred.promise;
}


//get Contact list  Model
contactModel.getContactList = async function (body) {
    let deferred 		= q.defer();	

	//let sql = "SELECT * FROM contacts ORDER BY ContactId DESC ";
	let sql = "SELECT userinfo.FirstName as OwnerName, contacts.* FROM contacts LEFT JOIN userinfo ON userinfo.UserId=contacts.OwnerId ORDER BY ContactId DESC;";
	pool.query(sql, [], function (error, result) {
		if (error) {
			console.log(error);
			deferred.reject(error);
		} else {			
			if(result.length > 0) {
				
				deferred.resolve(
					{ status: true , message : { payload : result } }
				);
					
			} else {
				deferred.resolve(
					{ status: false , message : "No Record Found !!" }
				);
			}
		}
	});	   

    return deferred.promise;
}

//get Contact by Id  Model
contactModel.getContactById = async function (body) {
    let deferred 		= q.defer();	

	let sql = "SELECT * FROM contacts where ContactId = ?";
	
	pool.query(sql, [body.contactId], function (error, result) {
		if (error) {
			console.log(error);
			deferred.reject(error);
		} else {			
			if(result.length <= 1) {
				
				deferred.resolve(
					{ status: true , message : { payload : result } }
				);
					
			} else {
				deferred.resolve(
					{ status: false , message : "No Record Found !!" }
				);
			}
		}
	});	   

    return deferred.promise;
}

contactModel.updateContactById = async function (body) {
	console.log("new_update__",body);

    let deferred = q.defer(),
        sql = "UPDATE contacts SET  ? WHERE ContactId = ?";
   
		post = {
			CompanyId	:  	body.CompanyId,
			FirstName	:	body.FirstName,
			LastName	:	body.LastName,
			Title		:	body.Title,
			Email		:	body.Email,
			Phone		:	body.Phone,
			City		:	body.City,
			FacebookURL	:	body.FacebookURL,
			TwitterURL	:	body.TwitterURL,
			LinkedInURL	:	body.LinkedInURL,
			Stage		:	body.Stage,
		};		
    
    pool.query(sql, [post, body.ContactId], async function (error, result) {
		console.log("query__",sql);
        if (error) {
            deferred.reject(error);
        } else {
           deferred.resolve(true);
        }
    })
    return deferred.promise;
}

contactModel.deleteContactById = async function (body) {

    let deferred = q.defer(),
        sql = "Delete from contacts where ContactId = ?";
    
    pool.query(sql, [body.id], async function (error, result) {
        if (error) {
            deferred.reject(error);
        } else {
           deferred.resolve(true);
        }
    })
    return deferred.promise;
}

contactModel.deleteAllContactsById = async function (body) {

	let ids = body.ids;
	let deferred = q.defer();
	if (ids && ids.length > 0) {

		for (let i = 0; i < ids.length; i++) {
			
			sql = "Delete from contacts where ContactId = ?";
		
			pool.query(sql, [ids[i]], async function (error, result) {
				if (error) {
					console.log('error', error);
				} else {
					console.log('success', result);
				}
			})
		}
		deferred.resolve(true);
	}   
    return deferred.promise;
}



module.exports = contactModel;