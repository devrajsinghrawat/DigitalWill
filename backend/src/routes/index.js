const express = require('express');
const  passport      = require('passport');
const middle         = require('./middleware');
const router = express.Router({ mergeParams: true });

const userController 	= require('../controllers/user');
const companyController = require('../controllers/company');
const contactController = require('../controllers/contact');
const jobController    = require('../controllers/job');
const candidateController = require('../controllers/candidate');

module.exports = function() {

	//========== User ============

	//app.get('/', middle.authenticate1);
	//app.get('/*', middle.authenticate);

	app.post('/loginUser', userController.loginUser);
	// app.post('/loginUser', passport.authenticate('local', {
    //     failureRedirect: '/',
    // }), function (req, res) {
    //     res.json({
    //         status: true,
    //         code: "",
    //         message: 'Login successfully',
    //         payload: {}
    //     })
    //     //res.send(req.session.passport.user);
    // });

    app.post('/addUser', userController.addUser);	
	app.post('/getUserByUserId', userController.getUserByUserId);	
	app.post('/getAllUser', userController.getAllUser);
	app.post('/updateUserRegStatus', userController.updateUserRegStatus);
	app.post('/updateUserStatus', userController.updateUserStatus);	
	app.post('/ForgetPwdSendEmail', userController.ForgetPwdSendEmail);
	app.post('/setForgotPassword', userController.setForgotPassword);
	app.post('/changePwd', userController.changePwd);
	app.post('/UpdateUserPwdbyAdmin', userController.UpdateUserPwdbyAdmin);
	app.post('/inviteTeamMate', userController.inviteTeamMate);

	//========== Company ===========
	app.post('/addCompany', companyController.addCompany);	
	app.post('/getCompanyList', companyController.getCompanyList);	
	app.post('/getCompanyById', companyController.getCompanyById);	
	app.post('/getCompanyInfoById', companyController.getCompanyInfoById);	
	app.post('/updateCompanyById', companyController.updateCompanyById);	
	app.post('/deleteCompanyById', companyController.deleteCompanyById);
	app.post('/deleteAllCompanysById', companyController.deleteAllCompanysById);
	app.post('/addCompanyCsvFile', companyController.addCompanyCsvFile);	

	//========= Contact ============
	app.post('/addContact', contactController.addContact);
	app.post('/getContactList', contactController.getContactList);
	app.post('/getContactById', contactController.getContactById);
	app.post('/updateContactById', contactController.updateContactById);	
	app.post('/deleteContactById', contactController.deleteContactById);
	app.post('/deleteAllContactsById', contactController.deleteAllContactsById);
	app.post('/addContactCsvFile', contactController.addContactCsvFile);

	//========= Job ============
	app.post('/addJob', jobController.addJob);	
	app.post('/getJobsList', jobController.getJobsList);
	app.post('/getJobById', jobController.getJobById);
	app.post('/jobListInfo', jobController.jobListInfo);
	app.post('/getJobDescById', jobController.getJobDescById);
	app.post('/updateJobById', jobController.updateJobById);
	app.post('/deleteJobById', jobController.deleteJobById);
	app.post('/deleteAllJobsById', jobController.deleteAllJobsById);

	app.post('/submitJobApplication', jobController.submitJobApplication);
	app.post('/submitJobApplicationResume', jobController.submitJobApplicationResume);

	app.post('/getAppliedJobsList', jobController.getAppliedJobsList);
	app.post('/getAppliedJobsListByCandidate', jobController.getAppliedJobsListByCandidate);

	app.post('/assignJobToCandidate', jobController.assignJobToCandidate);
	app.post('/updateJobStatus', jobController.updateJobStatus);	
	app.post('/updateCandidateStatusByJob', jobController.updateCandidateStatusByJob);
	app.post('/getOpenJobsList', jobController.getOpenJobsList);
	app.post('/assignJobToMultipleCandidates', jobController.assignJobToMultipleCandidates);
	app.post('/getCandidatesListByJobId', jobController.getCandidatesListByJobId);	
	app.post('/getOpenJobList', jobController.getOpenJobList);	
	app.post('/getInterviewScheduled',jobController.getInterviewScheduled);
	app.post('/getOfferedCandidated',jobController.getOfferedCandidated);
	app.post('/getJoinedCandidate',jobController.getJoinedCandidate);

	//========= Candidate ============
	app.post('/addCandidate', candidateController.addCandidate);
	app.post('/getCandidateList', candidateController.getCandidateList);
	app.post('/getCandidateById', candidateController.getCandidateById);
	app.post('/updateCandidateById', candidateController.updateCandidateById);	
	app.post('/deleteCandidateById', candidateController.deleteCandidateById);
	app.post('/deleteAllCandidatesById', candidateController.deleteAllCandidatesById);
	app.post('/candidateApplicationResume', candidateController.candidateApplicationResume);
	app.post('/addCandidateCsvFile', candidateController.addCandidateCsvFile);


}


