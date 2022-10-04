const 		q  		= require('q'),
	randomstring	= require("randomstring"),
	  pool  		= require('../common/pool'),
	  nodemailer    = require('nodemailer'),
	  multer 		= require('multer'),
      request       = require('request');	

const { hashSync, genSaltSync, compareSync } = require("bcrypt");	  
const e = require('express');

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './src/uploads/resume/')
	},
	filename: function (req, file, callback) {
		callback(null, Date.now() + path.extname(file.originalname))
	}
})
let jobModel = {};
//add job Model
jobModel.addJob = async function (body) {
   // console.log("hhhh__",body);
    let deferred 		= q.defer();	

	let sql = "SELECT * FROM jobs WHERE JobTitle = ? ";
	
	pool.query(sql, [body.JobTitle], function (error, result) {
		if (error) {
			console.log(error);
			deferred.reject(error);
		} else {			
			if(result.length < 1) {
				post = {
					CompanyId		:	body.CompanyId,
					OwnerId         :   body.OwnerId,
					JobTitle		:	body.JobTitle,
					NoOfOpenings	:	body.NoOfOpenings,
					MinExp			:	body.MinExp,
					MaxExp			:	body.MaxExp,
					SalaryType		:	body.SalaryType,
					Currency		:	body.Currency,
					Jobdescription  :   body.texteditir,
					MinSalary		:	body.MinSalary,
					MaxSalary		:	body.MaxSalary,
					Qualification	:	body.Qualification,
					Specialization	:	body.Specialization,
					City 			:   body.City,
					Locality		:   body.Locality,
					State			:   body.State,
					Country 		:   body.Country,
					Address			:   body.Address,
					
				};				
				let sql = "INSERT INTO jobs SET ? ";
				
				pool.query(sql, [post], function (error, result) {
					if (error) {
						console.log(error);
						deferred.reject(error);
					} else { 
						console.log(result);
						deferred.resolve(
							{ status: true , message : { JobId : result.insertId } }
						);
					}
				});
			} else {
				deferred.resolve(
					{ status: false , message : "Job Already exist !!" }
				);
			}
		}
	});	   

    return deferred.promise;
}

//get Jobs list  Model
jobModel.getJobsList = async function (body) {
    let deferred 		= q.defer();	

	 //let sql = "SELECT company.CompanyId ,company.CompanyName ,jobs.* FROM jobs LEFT JOIN company on company.CompanyId = jobs.CompanyId ORDER BY company.CompanyId DESC";
	 let sql ="SELECT * FROM jobs LEFT JOIN company ON jobs.CompanyId = company.CompanyId LEFT JOIN userinfo ON company.OwnerId = userinfo.UserId;";
	
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

jobModel.updateJobById = async function (body) {

    let deferred = q.defer(),
        sql = "UPDATE jobs SET  ? WHERE Id = ?";
		
		post = {
			JobTitle		:	body.JobTitle,
			NoOfOpenings	:	body.NoOfOpenings,
			MinExp			:	body.MinExp,
			MaxExp			:	body.MaxExp,
			SalaryType		:	body.SalaryType,
			Currency		:	body.Currency,
			MinSalary		:	body.MinSalary,
			MaxSalary		:	body.MaxSalary,
			Qualification	:	body.Qualification,
			Specialization	:	body.Specialization,
			City 			:   body.City,
			Locality		:   body.Locality,
			State			:   body.State,
			Country 		:   body.Country,
			Address			:   body.Address
		};	
		
    pool.query(sql, [post, body.Id], async function (error, result) {
        if (error) {
            deferred.reject(error);
        } else {
           deferred.resolve(true);
        }
    })
    return deferred.promise;
}

jobModel.deleteJobById = async function (body) {

    let deferred = q.defer(),
        sql = "Delete from jobs where Id = ?";
    
    pool.query(sql, [body.ids], async function (error, result) {
        if (error) {
            deferred.reject(error);
        } else {
           deferred.resolve(true);
        }
    })
    return deferred.promise;
}

jobModel.deleteAllJobsById = async function (body) {

	let ids = body.ids;
	let deferred = q.defer();
	if (ids && ids.length > 0) {
		 
		for (let i = 0; i < ids.length; i++) {
			
			sql = "Delete from jobs where Id = ?";
		
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
//get job by Id  Model
jobModel.getJobDescById = async function (body) {
    let deferred 		= q.defer();	

	let sql = "SELECT JobTitle,Jobdescription,Country,City FROM jobs where Id = ?";
	
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

//get job by Id  Model
jobModel.getJobById = async function (body) {
    let deferred 		= q.defer();	

	let sql = "SELECT company.CompanyName ,jobs.* FROM jobs LEFT JOIN company on company.CompanyId = jobs.CompanyId WHERE Id = ?";
	
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

//get job List Info by Id  Model
jobModel.jobListInfo = async function (body) {
    let deferred 		= q.defer();	

	let sql = "SELECT `Jobdescription`, `Qualification`, `Specialization`, `Address` FROM `jobs` WHERE `Id`=?";
	
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
//add job Model
jobModel.submitJobApplication = async function (req) {
    let deferred 		= q.defer();
	
	let sql1 = "SELECT * FROM candidate WHERE Email = ? ";
	
	pool.query(sql1, [req.body.Email], function (error, result) {
		if (error) {
			console.log(error);
			deferred.reject(error);
		} else {			
			if(result.length < 1) {
				deferred.resolve(
					{ status: false , message : "Candidate with this Email Id has not found !!" }
				);
			} else {
				post = {
					JobId			:	req.body.JobId,
					CandidateId		:	result[0].candidateId,
					FirstName		:	req.body.FirstName,
					LastName		:	req.body.LastName,
					Email			:	req.body.Email,
					Phone			:	req.body.Phone,
					City			:	req.body.City,
					Resume  		:   req.body.Cv,
					JobApplicationType : 'Applied'
				};				
				let sql = "INSERT INTO submittedjobapplication SET ? ";
				
				pool.query(sql, [post], function (error, result) {
					if (error) {
						console.log(error);
						deferred.reject(error);
					} else { 
						console.log(result);
						deferred.resolve(
							{ status: true , message : { SubmittedApplicationId : result.insertId } }
						);
					}
				});
			}
		}
	});	     
		
    return deferred.promise;
}

//get applied Jobs list  Model
jobModel.getAppliedJobsList = async function (body) {
    let deferred 		= q.defer();	

	let sql = "select Job.JobTitle,	Job.NoOfOpenings,Job.MinExp as jobMinExp,Job.MaxExp as jobMaxExp,Job.SalaryType as jobSalaryType,	Job.Currency as jobCurrency,Job.MinSalary as jobMinSalary,Job.MaxSalary as jobMaxSalary,Job.Qualification as jobQualification,Job.Specialization as jobSpecialization,Job.City as jobCity,Job.Locality as jobLocality,Job.State as jobState,Job.Country as jobCountry,	Job.Address as jobAddress,Candidate.candidateId, Candidate.FirstName,Candidate.LastName,Candidate.Email,Candidate.Phone,Candidate.City,Candidate.Locality,	Candidate.FullAddress,Candidate.WillingToRelocate,Candidate.Qualification,Candidate.Specialization,	Candidate.CurrentOrganization,	Candidate.Title,Candidate.TotalExperience,Candidate.RelevantExperience,Candidate.SalaryType,Candidate.CurrencyType,Candidate.CurrentSalary,	Candidate.SalaryExpectation,Candidate.CurrentEmploymentStatus,Candidate.NoticePeriod,Candidate.AvailableFrom,	Candidate.Resume,Candidate.Skills,Candidate.LanguageSkills,	Candidate.ProficiencyLevel,	Candidate.FacebookURL,	Candidate.TwitterURL,	Candidate.LinkedInURL,	Candidate.GitHubURL,Candidate.Source from submittedjobapplication  LEFT JOIN candidate as Candidate ON  Candidate.candidateId = submittedjobapplication.CandidateId LEFT JOIN jobs as Job ON  Job.Id = submittedjobapplication.JobId";
	
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


//get applied Jobs list by Candidate Id  Model
jobModel.getAppliedJobsListByCandidate = async function (body) {
    let deferred 		= q.defer();	
	let candidateId     = body.candidateId;
	let sql = "select Job.Id, Job.JobTitle, submittedjobapplication.JobApplicationType, submittedjobapplication.CandidateStatusByJob,company.CompanyId,company.CompanyName ,submittedjobapplication.CreatedDate as AppliedDate from submittedjobapplication  LEFT JOIN candidate as Candidate ON  Candidate.candidateId = submittedjobapplication.CandidateId LEFT JOIN jobs as Job ON  Job.Id = submittedjobapplication.JobId LEFT JOIN company on company.CompanyId = Job.CompanyId where submittedjobapplication.CandidateId = ? ";
	
	pool.query(sql, [candidateId], function (error, result) {
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

//get Open Job model
jobModel.getOpenJobList = async function (body) {
    let deferred 		= q.defer();	
	let OwnerId     =   body.OwnerId;
	let sql = "SELECT * FROM `jobs` WHERE `JobStatus` = 'OPEN' AND `OwnerId` = ?";
	
	pool.query(sql, [OwnerId], function (error, result) {
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

//get InterView Scheduled job model
jobModel.getInterviewScheduled = async function (body) {
    let deferred 		= q.defer();	
	let OwnerId     =   body.OwnerId;
	let sql = "SELECT * FROM `submittedjobapplication` WHERE `CandidateStatusByJob` = 'Interview Scheduled' AND `OwnerId` = ? ";
	
	pool.query(sql, [OwnerId], function (error, result) {
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
//Get all Offered Candidated job model
jobModel.getOfferedCandidated = async function (body) {
    let deferred 		= q.defer();	
	let OwnerId     =   body.OwnerId;
	let sql = "SELECT * FROM `submittedjobapplication` WHERE `CandidateStatusByJob` = 'Offered' AND `OwnerId` = ? ";
	
	pool.query(sql, [OwnerId], function (error, result) {
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

//Get all Joined Candidated job model
jobModel.getJoinedCandidate = async function (body) {
    let deferred 		= q.defer();	
	let OwnerId     =   body.OwnerId;
	let sql = "SELECT * FROM `submittedjobapplication` WHERE `CandidateStatusByJob` = 'Joined' AND `OwnerId` = ? ";
	
	pool.query(sql, [OwnerId], function (error, result) {
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

//assign job to candidate Model
jobModel.assignJobToCandidate = async function (req) {
    let deferred 		= 	q.defer();
	let JobIds			=	req.body.JobId;
	let CandidateId		=	req.body.candidateId;
	let OwnerId         =   req.body.OwnrId;

	if (JobIds && JobIds.length > 0) {
		 
		for (let i = 0; i < JobIds.length; i++) {

			let sql1 = "SELECT * FROM submittedjobapplication WHERE JobId = ? && CandidateId = ?";
			pool.query(sql1, [JobIds[i], CandidateId ], function (error, result) {
				if (error) {
					console.log(error);
					deferred.reject(error);
				} else {			
					if(result.length < 1) {
						post = {
							OwnerId      :     OwnerId,
							JobId				:	JobIds[i],
							CandidateId			:	CandidateId,
							JobApplicationType	:   "Assigned",
							CandidateStatusByJob:   "Assigned"
						};				
						let sql = "INSERT INTO submittedjobapplication SET ? ";
						
						pool.query(sql, [post], function (error, result) {
							if (error) {
								console.log(error);
							} else { 
								console.log(result);					
							}
						});
					} else {
						console.log("Job Id  "+JobIds[i]+" Already assigned !!"  );
					}
				}
			});	
			
		}
		deferred.resolve(true);
	} 		
		
    return deferred.promise;
}

//update job status model
jobModel.updateJobStatus = async function (req) {
	
    let deferred = q.defer(),
        sql = "UPDATE jobs SET JobStatus = ? WHERE Id = ?";
		
    pool.query(sql, [req.body.SelStatus, req.body.JobId], async function (error, result) {
        if (error) {
            deferred.reject(error);
        } else {
			
           deferred.resolve(true);
        }
    })
    return deferred.promise;
}
//update candidate status by job  model
jobModel.updateCandidateStatusByJob = async function (req) {

    let deferred = q.defer(),
        sql = "UPDATE submittedjobapplication SET CandidateStatusByJob = ? WHERE JobId = ? AND CandidateId = ?";
    
    pool.query(sql, [req.body.status, req.body.JobId, req.body.CandidateId], async function (error, result) {
		console.log("result___",result);
        if (error) {
			console.log("error___",error);
            deferred.reject(error);
        } else {
           deferred.resolve(true);
        }
    })
    return deferred.promise;
}
//assign job to multiple candidates Model

jobModel.assignJobToMultipleCandidates = async function (req) {
    let deferred 		= 	q.defer();
	let JobId			=	req.body.JobId;
	let CandidateIds    =	req.body.ids;

	if (CandidateIds && CandidateIds.length > 0) {
		 
		for (let i = 0; i < CandidateIds.length; i++) {

			let sql1 = "SELECT * FROM submittedjobapplication WHERE JobId = ? && CandidateId = ?";
			pool.query(sql1, [JobId, CandidateIds[i] ], function (error, result) {
				if (error) {
					console.log(error);
					deferred.reject(error);
				} else {			
					if(result.length < 1) {
						post = {
							JobId				:	JobId,
							CandidateId			:	CandidateIds[i],
							JobApplicationType	:   "Assigned",
							CandidateStatusByJob:   "Assigned"
						};				
						let sql = "INSERT INTO submittedjobapplication SET ? ";
						
						pool.query(sql, [post], function (error, result) {
							if (error) {
								console.log(error);
							} else { 
								console.log(result);					
							}
						});
					} else {
						console.log("Job Id  "+JobId+" Already assigned to Candidate "+CandidateIds[i] );
					}
				}
			});	
			
		}

		deferred.resolve(true);
	} 		
		
    return deferred.promise;
}

// get candidates list by job id  Model

jobModel.getCandidatesListByJobId = async function (req) {
    let deferred 		= q.defer();
	let jobId     = req.body.jobId;
	let sql = "select Candidate.*, Job.JobTitle, submittedjobapplication.JobApplicationType, submittedjobapplication.CandidateStatusByJob,submittedjobapplication.CreatedDate as AppliedDate from submittedjobapplication  LEFT JOIN candidate as Candidate ON  Candidate.candidateId = submittedjobapplication.CandidateId LEFT JOIN jobs as Job ON  Job.Id = submittedjobapplication.JobId where submittedjobapplication.JobId = ? ";
	
	pool.query(sql, [jobId], function (error, result) {
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
//get all Open Jobs list  Model
jobModel.getOpenJobsList = async function (body) {
    let deferred 		= q.defer();	

	let sql = "SELECT company.CompanyId ,company.CompanyName ,jobs.* FROM jobs LEFT JOIN company on company.CompanyId = jobs.CompanyId WHERE JobStatus = 'Open'";
	
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

module.exports = jobModel;