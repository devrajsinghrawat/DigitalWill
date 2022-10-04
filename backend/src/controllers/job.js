const 	jobModel 	= require('../model/job'),
		helper      = require('../helpers/index'),
		path		= require('path'),
		fs          = require('fs');
		multer 		= require('multer');

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null,path.join(__dirname, '../uploads/Resume'))
	},
	filename: function (req, file, callback) {
	
		callback(null, (Math.floor(10 + Math.random() * 9)) +  "-" + file.originalname)
	}
	
})

 let job = {};


// add Job 
job.addJob = async function (req, res, next) {
	console.log('Aaaaa12', req.body);
	
	if(req.body.JobTitle && req.body.JobTitle != ''){		
		jobModel.addJob(req.body).then(function (result) {
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
			message: "Job data empty !!"
		}, 500);
	}
}

// get Jobs  list
job.getJobsList = async function (req, res, next) {
	//console.log('Aaaaa_contcat', req.body);
	if(req.body.userId && req.body.userId != ''){		
		jobModel.getJobsList(req.body).then(function (result) {
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

job.updateJobById = function (req, res, next) {  
	//console.log("ssss___",req.body); 
	if (req.body.Id) {
		jobModel.updateJobById(req.body).then(function (result) {
			if (result) {
				res.json({
					status: true,
					code: "",
					message: 'Job Edit successfully.',
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

job.deleteJobById = function (req, res, next) { 
	if (req.body.ids) {
		jobModel.deleteJobById(req.body).then(function (result) {
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

job.deleteAllJobsById = function (req, res, next) {   
	if (req.body.ids) {
		jobModel.deleteAllJobsById(req.body).then(function (result) {
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
			message: "Company Ids Required !!"
		}, 500);
	}
}
// get job by id
job.getJobDescById = async function (req, res, next) {
	//console.log('AaaaaDES', req.body);
	if(req.body.id && req.body.id != ''){		
		jobModel.getJobDescById(req.body).then(function (result) {
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
			message: "Job Id Required !!"
		}, 500);
	}
}


// get job by id
job.getJobById = async function (req, res, next) {
	//console.log('AaaaaDES', req.body);
	if(req.body.id && req.body.id != ''){		
		jobModel.getJobById(req.body).then(function (result) {
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
			message: "Job Id Required !!"
		}, 500);
	}
}

// Submit Job Application 
job.submitJobApplicationResume = function (req, res ) {
	var upload = multer({
        storage: storage,
        fileFilter: function (req, file, callback) {
			//console.log("Enter_img___4444");
            var ext = (path.extname(file.originalname).toLowerCase());
			//console.log(ext);
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
				//console.log("lll__",file);
					helper.successHandler(res, {
						payload: file
					}, 200);
				} else {
					helper.errorHandler(res, {
						status: false,
						message: err
					}, 500);
				}
            // if (req.file != null || req.file != undefined) {
            //     var file = req.file.filename;
            //     return userModel.uploadImage(file).then(function (result) {
            //         let url = 'https://create.topcorp.com:18002/' + 'uploads/' + result;
            //         helper.successHandler(res, { payload: url })
            //     });
            // }
        }
    })
}
//Submit job form data
job.submitJobApplication = function (req, res ) {
	//console.log("job_data",req.body);
	if(req.body.JobId && req.body.JobId != ''){		
		jobModel.submitJobApplication(req).then(function (result) {
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
			message: "Job data empty !!"
		}, 500);
	}
}


// get applied Jobs  list
job.getAppliedJobsList = async function (req, res, next) {
	//console.log('Aaaaa_contcat', req.body);
	if(req.body.userId && req.body.userId != ''){		
		jobModel.getAppliedJobsList(req.body).then(function (result) {
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

// get applied Jobs  list by candidate
job.getAppliedJobsListByCandidate = async function (req, res, next) {
	//console.log('Aaaaa_contcat', req.body);
	if(req.body.candidateId && req.body.candidateId != ''){		
		jobModel.getAppliedJobsListByCandidate(req.body).then(function (result) {
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

// get Open Job List
job.getOpenJobList = async function (req, res, next) {
	//console.log('Aaaaa_contcat', req.body);
	if(req.body.OwnerId && req.body.OwnerId != ''){		
		jobModel.getOpenJobList(req.body).then(function (result) {
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
// get InterView Scheduled
job.getInterviewScheduled = async function (req, res, next) {
	//console.log('Aaaaa_contcat', req.body);
	if(req.body.OwnerId && req.body.OwnerId != ''){		
		jobModel.getInterviewScheduled(req.body).then(function (result) {
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
// Get all Offered Candidated
job.getOfferedCandidated = async function (req, res, next) {
	//console.log('Aaaaa_contcat', req.body);
	if(req.body.OwnerId && req.body.OwnerId != ''){		
		jobModel.getOfferedCandidated(req.body).then(function (result) {
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
// Get Joined Candidate
job.getJoinedCandidate = async function (req, res, next) {
	//console.log('Aaaaa_contcat', req.body);
	if(req.body.OwnerId && req.body.OwnerId != ''){		
		jobModel.getJoinedCandidate(req.body).then(function (result) {
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
//assign job to candidate
job.assignJobToCandidate = function (req, res ) {
	   console.log("job_data",req.body);
	if(req.body.JobId && req.body.JobId != ''){		
		jobModel.assignJobToCandidate(req).then(function (result) {
			console.log('result_Jobb : ', result);
			if (result) {
				if(result == true){
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
			message: "Job data empty !!"
		}, 500);
	}
}


job.updateJobStatus = function (req, res, next) {
	
	if (req.body.JobId) {
		jobModel.updateJobStatus(req).then(function (result) {
			if (result) {
				res.json({
					status: true,
					code: "",
					message: 'Job Status Update Successfully.',
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

job.updateCandidateStatusByJob = function (req, res, next) {
	//console.log("statedUpdate____",req.body);
	if (req.body.JobId) {
		jobModel.updateCandidateStatusByJob(req).then(function (result) {
			if (result) {
				res.json({
					status: true,
					code: "",
					message: 'Done.',
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

//assign job to multiple candidates
job.assignJobToMultipleCandidates = function (req, res ) {
	 console.log("job_data",req.body);
  if(req.body.JobId && req.body.JobId != ''){		
	  jobModel.assignJobToMultipleCandidates(req).then(function (result) {
		  console.log('result_Jobb : ', result);
		  if (result) {
			  if(result == true){
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
		  message: "Job data empty !!"
	  }, 500);
  }
}

// get candidates list by job id
job.getCandidatesListByJobId = async function (req, res, next) {
	
	if(req.body.jobId && req.body.jobId != ''){		
		jobModel.getCandidatesListByJobId(req).then(function (result) {
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
// get Open Jobs  list
job.getOpenJobsList = async function (req, res, next) {
	//console.log('Aaaaa_contcat', req.body);
	if(req.body.userId && req.body.userId != ''){		
		jobModel.getOpenJobsList(req.body).then(function (result) {
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

// get job List Info by id
job.jobListInfo = async function (req, res, next) {
	//console.log('AaaaaDES', req.body);
	if(req.body.id && req.body.id != ''){		
		jobModel.jobListInfo(req.body).then(function (result) {
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
			message: "Job Id Required !!"
		}, 500);
	}
}
module.exports = job;