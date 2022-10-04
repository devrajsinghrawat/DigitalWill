const 		q  		= require('q'),
	randomstring	= require("randomstring"),
	  pool  		= require('../common/pool'),
	  nodemailer    = require('nodemailer'),
      request       = require('request');	
	  fs          = require('fs'),
	  multer 		= require('multer'),	
	  render   		=  require('xlsx');  
const { hashSync, genSaltSync, compareSync } = require("bcrypt");	  
const e = require('express');
let candidateModel = {};

//add Contact Model csv file
candidateModel.addCandidateCsvFile = async function (file) {
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

		console.log("lenghtddd____",csvData);
		let FirstName = csvData[i].FirstName;
		let LastName = csvData[i].LastName;
		let Email = csvData[i].Email;
		let Phone = csvData[i].Phone;
		let City = csvData[i].City;
		let Locality = csvData[i].Locality;
		let FullAddress = csvData[i].FullAddress;
		let WillingToRelocate = csvData[i].WillingToRelocate;
		let Qualification = csvData[i].Qualification;
		let Specialization = csvData[i].Specialization;
		let CurrentOrganization = csvData[i].CurrentOrganization;
		let Title = csvData[i].Title;
		let TotalExperience = csvData[i].TotalExperience;
		let RelevantExperience = csvData[i].RelevantExperience;
		let SalaryType = csvData[i].SalaryType;
		let CurrentSalary = csvData[i].CurrentSalary;
		let SalaryExpectation = csvData[i].SalaryExpectation;
		let CurrentEmploymentStatus = csvData[i].CurrentEmploymentStatus;
		let NoticePeriod = csvData[i].NoticePeriod;
		let AvailableFrom = csvData[i].AvailableFrom;
		let Skills = csvData[i].Skills;
		let LanguageSkills = csvData[i].LanguageSkills;
		let ProficiencyLevel = csvData[i].ProficiencyLevel;
		let FacebookURL = csvData[i].FacebookURL;
		let TwitterURL = csvData[i].TwitterURL;
		let LinkedInURL = csvData[i].LinkedInURL;
		let GitHubURL = csvData[i].GitHubURL;
		let Source = csvData[i].Source;

		let sql = "SELECT Email FROM candidate WHERE Email = ? ";
	
		pool.query(sql, [Email], function (error, result) {
		//console.log("kdkdkd-____",result.length);
		 if (error) {
			console.log(error);
			deferred.reject(error);
		} else {
			//console.log("kdkdkd3333-____",result.length);
			if(result.length >= 1) {
				//console.log("INTER_____MANDEEP_____");
				deferred.resolve(
					{ status: false , message : "Candidate with this email-id Already exist !!" }
				);
			} else {
				console.log("ENTER_BODY__");
				post = {
					FirstName: FirstName,
					LastName: LastName,
					Email: Email,
					Phone: Phone,
					City: City,
					Locality: Locality,
					FullAddress: FullAddress,
					WillingToRelocate: WillingToRelocate,
					Qualification: Qualification,
					Specialization: Specialization,
					CurrentOrganization: CurrentOrganization,
					Title: Title,
					TotalExperience: TotalExperience,
					RelevantExperience: RelevantExperience,
					SalaryType: SalaryType,
					CurrentSalary: CurrentSalary,
					SalaryExpectation: SalaryExpectation,
					CurrentEmploymentStatus: CurrentEmploymentStatus,
					NoticePeriod: NoticePeriod,
					AvailableFrom: AvailableFrom,
					Skills: Skills,
					LanguageSkills: LanguageSkills,
					ProficiencyLevel: ProficiencyLevel,
					FacebookURL: FacebookURL,
					TwitterURL: TwitterURL,
					LinkedInURL: LinkedInURL,
					GitHubURL: GitHubURL,
					Source: Source
					
				};	
				console.log("post_print__",post);			
				let sql = "INSERT INTO candidate SET ? ";
				
				pool.query(sql, [post], function (error, result) {
					if (error) {
						console.log(error);
						deferred.reject(error);
					} else { 
						console.log(result);
						deferred.resolve(
							{ status: true , message : { candidateId : result.candidateId } }
						);
					}
				});
			}
		}

		});

	}
		   
	fs.unlinkSync(filePath)
    return deferred.promise;
}
//add Candidate Model
candidateModel.addCandidate = async function (body) {
    let deferred 		= q.defer();	

	let sql = "SELECT * FROM candidate WHERE email = ? ";
	
	pool.query(sql, [body.Email], function (error, result) {
		if (error) {
			console.log(error);
			deferred.reject(error);
		} else {			
			if(result.length < 1) {

				post = {
					OwnerId					: body.OwnerId,
					FirstName				:  	body.FirstName,
					LastName				:  	body.LastName,
					Email					:	body.Email,
					Phone					:	body.Phone,
					City					:  	body.City,
					Locality				:  	body.Locality,
					FullAddress				:  	body.FullAddress,
					WillingToRelocate		:  	body.WillingToRelocate,
					Qualification			:  	body.Qualification,
					Specialization			:	body.Specialization,
					CurrentOrganization		:	body.CurrentOrganization,
					Title					:	body.Title,
					TotalExperience			:	body.TotalExperience,
					RelevantExperience		:	body.RelevantExperience,
					SalaryType				:	body.SalaryType,
					CurrencyType			:	body.CurrencyType,
					CurrentSalary			:	body.CurrentSalary,
					SalaryExpectation		:	body.SalaryExpectation,
					CurrentEmploymentStatus	:	body.CurrentEmploymentStatus,
					NoticePeriod			:	body.NoticePeriod,
					AvailableFrom			:	body.AvailableFrom,
					Resume					:	body.Resume,
					Skills					:	body.Skills,
					LanguageSkills			:	body.LanguageSkills,
					ProficiencyLevel		:	body.ProficiencyLevel,
					FacebookURL				:	body.FacebookURL,
					TwitterURL				:	body.TwitterURL,
					LinkedInURL				:	body.LinkedInURL,
					GitHubURL				:	body.GitHubURL,
					Source					:	body.Source

				};				
				let sql = "INSERT INTO candidate SET ? ";
				
				pool.query(sql, [post], function (error, result) {
					if (error) {
						console.log(error);
						deferred.reject(error);
					} else { 
						console.log(result);
						deferred.resolve(
							{ status: true , message : { candidateId : result.insertId } }
						);
					}
				});
			} else {
				deferred.resolve(
					{ status: false , message : "Candidate with this email-id Already exist !!" }
				);
			}
		}
	});	   

    return deferred.promise;
}


//get candidate list  Model
candidateModel.getCandidateList = async function (body) {
    let deferred 		= q.defer();	

	// let sql = "SELECT * FROM candidate ";
	let sql = "SELECT userinfo.FirstName as OwnerName, candidate.* FROM candidate LEFT JOIN userinfo ON userinfo.UserId=candidate.OwnerId";

	
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

//get candidate by Id  Model
candidateModel.getCandidateById = async function (body) {
    let deferred 		= q.defer();	

	let sql = "SELECT * FROM candidate where candidateId = ?";
	
	pool.query(sql, [body.candidateId], function (error, result) {
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

candidateModel.updateCandidateById = async function (body) {

    let deferred = q.defer(),
        sql = "UPDATE candidate SET  ? WHERE candidateId = ?";

		post = {
			FirstName				:  	body.companyName,
			LastName				:  	body.LastName,
			Email					:	body.Email,
			Phone					:	body.Phone,
			City					:  	body.City,
			Locality				:  	body.Locality,
			FullAddress				:  	body.FullAddress,
			WillingToRelocate		:  	body.WillingToRelocate,
			Qualification			:  	body.Qualification,
			Specialization			:	body.Specialization,
			CurrentOrganization		:	body.CurrentOrganization,
			Title					:	body.Title,
			TotalExperience			:	body.TotalExperience,
			RelevantExperience		:	body.RelevantExperience,
			SalaryType				:	body.SalaryType,
			CurrencyType			:	body.CurrencyType,
			CurrentSalary			:	body.CurrentSalary,
			SalaryExpectation		:	body.SalaryExpectation,
			CurrentEmploymentStatus	:	body.CurrentEmploymentStatus,
			NoticePeriod			:	body.NoticePeriod,
			AvailableFrom			:	body.AvailableFrom,
			Resume					:	body.Resume,
			Skills					:	body.Skills,
			LanguageSkills			:	body.LanguageSkills,
			ProficiencyLevel		:	body.ProficiencyLevel,
			FacebookURL				:	body.FacebookURL,
			TwitterURL				:	body.TwitterURL,
			LinkedInURL				:	body.LinkedInURL,
			GitHubURL				:	body.GitHubURL,
			Source					:	body.Source

		};		
    
    pool.query(sql, [post, body.candidateId], async function (error, result) {
        if (error) {
            deferred.reject(error);
        } else {
           deferred.resolve(true);
        }
    })
    return deferred.promise;
}



candidateModel.deleteCandidateById = async function (body) {

    let deferred = q.defer(),
        sql = "Delete from candidate where candidateId = ?";
    
    pool.query(sql, [body.id], async function (error, result) {
        if (error) {
            deferred.reject(error);
        } else {
           deferred.resolve(true);
        }
    })
    return deferred.promise;
}

candidateModel.deleteAllCandidatesById= async function (body) {

	let ids = body.ids;
	let deferred = q.defer();
	if (ids && ids.length > 0) {

		for (let i = 0; i < ids.length; i++) {
			
			sql = "Delete from candidate where candidateId = ?";
		
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



module.exports = candidateModel;