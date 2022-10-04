const 		q  		= require('q'),
	randomstring	= require("randomstring"),
	  pool  		= require('../common/pool'),
	  nodemailer    = require('nodemailer'),
	  path		= require('path'),
	  fs          = require('fs'),
      request       = require('request'),
	  multer 		= require('multer'),	
	  render   		=  require('xlsx');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");	  
const e = require('express');
let companyModel = {};

//add Company CSV file
companyModel.addCompanyCsv = async function (file) {
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
	//console.log("sheet_dataOK",csvData);
	
	for(let i = 0; i < csvData.length; i++ ){
		console.log("lenght____",csvData.length);
		 let CompanyName = csvData[i].CompanyName;
		 let Industry = csvData[i].Industry;
		 let City = csvData[i].City;
		 let Address = csvData[i].Address;
		 let About = csvData[i].About;
		 let Website = csvData[i].Website;
		 let FacebookURL = csvData[i].FacebookURL;
		 let LinkedInURL = csvData[i].LinkedInURL;
		 let TwitterURL = csvData[i].TwitterURL;

		 if(CompanyName !='') {
            console.log("ENTER_BODY__");
			post = {
				CompanyName	:	CompanyName,
				Industry	:	Industry,
				City		:	City,
				Address		:	Address,
				About		:	About,
				Website		:	Website,
				FacebookURL	:	FacebookURL,
				LinkedInURL	:	LinkedInURL,
				TwitterURL	:	TwitterURL
				
			};				
			let sql = "INSERT INTO company SET ? ";
			
			pool.query(sql, [post], function (error, result) {
				if (error) {
					console.log(error);
					deferred.reject(error);
				} else { 
					console.log(result);
					deferred.resolve(
						{ status: true , message : { CompanyId : result.insertId } }
					);
				}
			});
		} else {
			deferred.resolve(
				{ status: false , message : "Company Already exist !!" }
			);
		}

	}
		   
	fs.unlinkSync(filePath)
    return deferred.promise;
}

//add Company Model
companyModel.addCompany = async function (body) {
    let deferred 		= q.defer();	

	let sql = "SELECT * FROM company WHERE CompanyName = ? ";
	
	pool.query(sql, [body.companyName], function (error, result) {
		if (error) {
			console.log(error);
			deferred.reject(error);
		} else {			
			if(result.length < 1) {
				post = {
					CompanyName	:	body.companyName,
					OwnerId     :   body.OwnerId,
					Industry	:	body.industryName,
					Website		:	body.websiteName,
					City		:	body.cityName,
					About		:	body.aboutCompny,
					Address		:	body.fullAddress,
					FacebookURL	:	body.fbUrl,
					TwitterURL	:	body.twtUrl,
					LinkedInURL	:	body.linkdin_url
				};				
				let sql = "INSERT INTO company SET ? ";
				
				pool.query(sql, [post], function (error, result) {
					if (error) {
						console.log(error);
						deferred.reject(error);
					} else { 
						console.log(result);
						deferred.resolve(
							{ status: true , message : { CompanyId : result.insertId } }
						);
					}
				});
			} else {
				deferred.resolve(
					{ status: false , message : "Company Already exist !!" }
				);
			}
		}
	});	   

    return deferred.promise;
}


//get Company list  Model
companyModel.getCompanyList = async function (body) {
    let deferred 		= q.defer();	

	let sql = "SELECT * FROM company ORDER BY CompanyId DESC;";
	
	pool.query(sql, [], function (error, result) {
		if (error) {
			console.log(error);
			deferred.reject(error);
		} else {	
			//console.log("mmm<<<<<",result.length);		
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

//get Company by Id  Model
companyModel.getCompanyById = async function (body) {
    let deferred 		= q.defer();	

	let sql = "SELECT * FROM company where CompanyId = ?";
	
	pool.query(sql, [body.companyId], function (error, result) {
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

companyModel.updateCompanyById = async function (body) {
  console.log("print____",body);

    let deferred = q.defer(),
        sql = "UPDATE company SET  ? WHERE CompanyId = ?";

		post = {
			CompanyName	:	body.CompanyName,
			Industry	:	body.Industry,
			Website		:	body.Website,
			City		:	body.City,
			About		:	body.About,
			Address		:	body.Address,
			FacebookURL	:	body.FacebookURL,
			TwitterURL	:	body.TwitterURL,
			LinkedInURL	:	body.LinkedInURL
		};	
    
    pool.query(sql, [post, body.CompanyId], async function (error, result) {
        if (error) {
            deferred.reject(error);
        } else {
           deferred.resolve(true);
        }
    })
    return deferred.promise;
}

companyModel.deleteCompanyById = async function (body) {

    let deferred = q.defer(),
        sql = "Delete from company where CompanyId = ?";
    
    pool.query(sql, [body.id], async function (error, result) {
        if (error) {
            deferred.reject(error);
        } else {
           deferred.resolve(true);
        }
    })
    return deferred.promise;
}

companyModel.deleteAllCompanysById = async function (body) {

	let ids = body.ids;
	let deferred = q.defer();
	if (ids && ids.length > 0) {

		for (let i = 0; i < ids.length; i++) {
			
			sql = "Delete from company where CompanyId = ?";
		
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

//get Company Info by Id  Model
companyModel.getCompanyInfoById = async function (body) {
    let deferred 		= q.defer();	

	let sql = "SELECT `About`, `Address` FROM `company` WHERE `CompanyId` = ?"; 
	
	pool.query(sql, [body.id], function (error, result) {
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

module.exports = companyModel;