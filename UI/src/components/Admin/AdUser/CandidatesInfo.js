import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FooterAdmin from "../FooterAdmin";
import TopBarAdmin from "../TopBarAdmin";
import SideBarAdmin from "../SideBarAdmin";
import { useParams } from "react-router-dom";
import Modal from 'react-modal';
import swal from 'sweetalert';  
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import Switch from '@mui/material/Switch';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function CandidatesInfo() {

  const [modalIsOpen,setModalIsOpen] = useState(false);
  const setModalIsOpenToTrue =()=>{
    setModalIsOpen(true)
  }
  const setModalIsOpenToFalse =()=>{
  setModalIsOpen(false)
  }
  //Assign Job Model
  const [selectedJobId,setSelectedJobId] = useState();
  const [assignJobOpen,setassignJobOpen] = useState(false);
  const setAssignJobOpenToTrue =(event)=>{
    const AssignJobId = event.target.value;
      setSelectedJobId(AssignJobId);
    
    setassignJobOpen(true)
  }
  const setAssignJobOpenToFalse =()=>{
    setassignJobOpen(false)
  }
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : '#fff',
      border                : '1px solid #3333338c',
      width                 : '65%', 
      inset                 : '50% auto auto 52%',     
    }
  };
  const { id } = useParams();
  const [notes, getNotes] = useState([]);
  const [jobAp, getjobAp] = useState([]);
  const [myId, setId] = useState(id);
  const [show,setShow]=useState(false);
  const [show2,setShow2]=useState(false);
  const [selectedClient,setSelectedClient] = useState();
  useEffect(() => {
    setTimeout(() => setShow(false), 5000);
    }, []);
   
  useEffect(() => {
      setTimeout(() => setShow2(false), 5000);
      }, []);
      
  const url = "http://localhost:3001/getCandidateById";
  useEffect(() => {
    getAllNotes(myId);
  }, [myId]);

  const getAllNotes = (id) => {
    axios
      .post(url, { candidateId: id })
      .then((response) => {
          
        const allNotes = response.data.payload.payload;
        getNotes(allNotes["0"]);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  // Get All Applied job list
  const urljobap = "http://localhost:3001/getAppliedJobsListByCandidate";
 
    useEffect(() => {
      if(id !=''){
        axios
            .post(urljobap, { candidateId: id })
            .then((response) => {
              const allNotes2 = response.data.payload.payload;
              getjobAp(allNotes2);
              setSelectedClient(allNotes2["0"].CandidateStatusByJob);
            })
            .catch((error) => console.log(`Error: ${error}`));
          }
    }, []);
// Get All Job List
  const [ AllJob, getAllJob] = useState([]);
  const [myId2, setId2] = useState(12);
    const UrlAllJob = 'http://localhost:3001/getOpenJobsList';
    useEffect(()=>{
        getAllNotesd(myId2);
    }, [myId]);

    const getAllNotesd = (id) =>{
        axios.post(UrlAllJob,{userId:id})
        .then((response)=>{
            const allJobNotes = response.data.payload.payload;
            
             getAllJob(allJobNotes);
        })
        .catch(error => console.log(`Error: ${error}`));
    }

   //Checkbox value store in state
   const [userinfo, setUserInfo] = useState({
    JobId: [],
    
  }); 
  
  const chkHandleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { JobId } = userinfo;
    
    // Case 1 : The user checks the box
    if (checked) {
    setUserInfo({
      JobId: [...JobId, value],
      candidateId: id,
      
    });
    }
  
    // Case 2 : The user unchecks the box
    else {
    setUserInfo({
      JobId: JobId.filter((e) => e !== value),
    });
    }
  };
  const JobAssignSubmit = () => {
    const { JobId } = userinfo

    if( JobId ){
        axios.post("http://localhost:3001/assignJobToCandidate", userinfo)
        .then( res => {
          
            toast.success("Job Assigned successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        }).catch(err => {
            console.log('There was an errorssss!', err.response.data.message);
           // this.setState({ errorMessage: error.message });
           toast.error(err.response.data.message, {
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
         //console.log('There was an error!', err);
        });
    } else {
        toast.error("Invlid Input", {
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        
    }
  }
  // Chnage Status function
  const handleSelectChange = (event) =>{
    const SelStatus = event.target.value;
    const jobIdGet = selectedJobId;
    if (SelStatus != "") {
      swal({
        title: "Are you sure?",
        text: "You Want To Change Candidate Status To This Job?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios
        .post("http://localhost:3001/updateCandidateStatusByJob",{
            status: SelStatus,
            JobId: jobIdGet,
            CandidateId:id
        })
        .then((res) => {
          if(res.data.status == true){
            setSelectedClient(SelStatus);
            
          }
          swal(res.data.message, {
            icon: "success",
          });
          
        })
        .catch((err) => {
          console.log("There was an error!", err);
        });
          
        } else {
          
        }
      });
      
    } else {
      toast.error("Invlid Input", {
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  // setTimeout(() => {
  //   const box = document.getElementById('fg');
  
  //   // 👇️ hides element (still takes up space on page)
  //   box.style.visibility = 'hidden';
  // }, 1000);
// const toggleDisplay = (e) => {
//   // console.log("kkkk",e)
// }
  return (
    <>

      {/*<div className="container adm"> */}
      <div className="adm">
        <div className="mb-3">
          <div className="row" id="main">
            <div id="page-top">
              <div id="wrapper">
                {/*sidebar component*/}
                <SideBarAdmin />
                {/*End sidebar component*/}

                {/*  <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                    {/* <!-- Topbar component--> */}
                    <TopBarAdmin />
                    {/*  <!-- End of Topbar --> */}

                    <div className="container-fluid">
                      {/*  <!-- Page Heading --> */}
                      <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800"></h1>
                      </div>
                      <div className="container">
                        
                      </div>

                      <div className="compny candiInfo">
                        <div className="container">
                          {/* <!-- Content Row --> */}
                          <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-9">
                                        <div className="media job-details-page-avatar">
                                            <div className="media-left">
                                                <div className="job-text-avatar bg-job">
                                                
                                                <i className="fas fa-user"></i>
                                                </div>
                                            </div>
                                            <div className="media-body details-page-media-body-inline-content">
                                                <div className="d-flex align-items-center">
                                                    <div className="inline-edit" data-hideuntilload="true">
                                                        <p><h2 id="sTest-jdJobNameTxt">{notes.FirstName} {notes.LastName}</h2> 
                                                        </p> 
                                                    </div> 
                                                </div> 
                                                <div className="media-body-sub-text p-l-10">
                                                    <span className="m-r-15">
                                                    <i className="fas fa-map-marker-alt" aria-hidden = "true"></i>{notes.City}
                                                    </span>
                                                    <span className="m-r-15">
                                                    {notes.Locality}
                                                    </span>
                                                    {/* <span className="m-r-15">
                                                  
                                                    
                                                    Willing To Relocate {notes.WillingToRelocate}
                                                    </span> */}
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="p-20">
                                            <div className="d-flex align-items-center justify-content-flex-end">
                                                <label className="label m-r-10 m-b-0">Share On</label>
                                                    <ul className="social-links">
                                                    
                                                        <li>
                                                            <a id="sTest-jdShareOnFbBtn" target="_blank" href="#" className="facebook">
                                                                <i className="fab fa-facebook-f"></i>
                                                                
                                                            </a>
                                                        </li> 
                                                        <li>
                                                            <a id="sTest-jdShareOnTwitterBtn" target="_blank" href="#" className="twitter"> 
                                                            <i className="fab fa-twitter"></i>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a id="sTest-jdShareOnLinkedinBtn" target="_blank" href="#" className="linkedin">
                                                            <i className="fab fa-linkedin-in"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                            </div>
                                        </div>

                                    </div>
                                    
                                </div>
                            </div>
                            <div className="col-sm-12 us4">
                             
                               <i className="fas fa-envelope"></i>{notes.Email} <i className="far fa-copy" onClick={() => { setShow(true); navigator.clipboard.writeText(notes.Email);} }></i> 
                               {
                                  show?<span id="fg">Copied.</span>:null
                                }
                               <i className="fas fa-phone-volume"></i> {notes.Phone} <i className="far fa-copy" onClick={() =>  { setShow2(true); navigator.clipboard.writeText(notes.Phone);} }></i>
                               {
                                  show2?<span id="fg">Copied.</span>:null
                                }
                             
                            </div>
                           
                              <div className="tbs">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                  <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="assigned_jobs-tab" data-bs-toggle="tab" data-bs-target="#assigned_jobs" type="button" role="tab" aria-controls="assigned_jobs" aria-selected="true">Assigned Jobs</button>
                                  </li>
                                  <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="candidate_history-tab" data-bs-toggle="tab" data-bs-target="#candidate_history" type="button" role="tab" aria-controls="candidate_history" aria-selected="false">Candidate History</button>
                                  </li>
                                  {/* <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="related_emails-tab" data-bs-toggle="tab" data-bs-target="#related_emails" type="button" role="tab" aria-controls="related_emails" aria-selected="false">Related Emails</button>
                                  </li>
                                 
                                  <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="candidate_que-tab" data-bs-toggle="tab" data-bs-target="#candidate_que" type="button" role="tab" aria-controls="candidate_que" aria-selected="false">Candidate Questions</button>
                                  </li>
                                  <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="hotlists-tab" data-bs-toggle="tab" data-bs-target="#hotlists" type="button" role="tab" aria-controls="hotlists" aria-selected="false">Hotlists</button>
                                  </li>
                                  <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="related_deals-tab" data-bs-toggle="tab" data-bs-target="#related_deals" type="button" role="tab" aria-controls="related_deals" aria-selected="false">Related Deals</button>
                                  </li>
                                  <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="contact_pitched-tab" data-bs-toggle="tab" data-bs-target="#contact_pitched" type="button" role="tab" aria-controls="contact_pitched" aria-selected="false">Contact(s) Pitched</button>
                                  </li> */}
                                </ul>
                                <div className="tab-content pb-3" id="myTabContent">
                                    <div className="tab-pane fade show active" id="assigned_jobs" role="tabpanel" aria-labelledby="assigned_jobs-tab">
                                      <div className="col-sm-12 mt-3">
                                          <div className="container">
                                            
                                            <div className="row">
                                              <div className="col">
                                                
                                              </div>
                                              <div className="col">
                                               
                                              </div>
                                              <div className="col mb-3">
                                              <Link className="btn btn-primary float-right" to="#"> View All Assigned Jobs</Link>
                                               <Link className="btn btn-success float-right mr-2" to="#" onClick={setModalIsOpenToTrue}> Assign To Job</Link>
                                              </div>
                                            </div>
                                            
                                            {Object.entries(jobAp).map((arr)=>{
                                               
                                                return <div className="row brd mb-2">
                                              <div className="col cad">
                                                  <div className="media job-details-page-avatar">
                                                      <div className="media-left">
                                                          <div className="job-text-avatar bg-job">
                                                          <i className="fas fa-building"></i>
                                                          </div>
                                                      </div>
                                                      <div className="media-body details-page-media-body-inline-content">
                                                          <div className="d-flex align-items-center">
                                                              <div className="inline-edit" data-hideuntilload="true">
                                                                  <p><h2 id="sTest-jdJobNameTxt">{arr[1].JobTitle}</h2> 
                                                                  </p> 
                                                              </div> 
                                                          </div> 
                                                          <div className="media-body-sub-text p-l-10">
                                                              <span className="m-r-15">
                                                              {arr[1].CompanyName}
                                                              </span>
                                                              
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="col icn">
                                              <p className="m-r-5 has-text-light"><AccountCircleIcon />Kapil Gairola</p>
                                              <p className="m-r-5 has-text-light"><TimelapseIcon />{arr[1].AppliedDate}</p>
                                              </div>
                                              <div className="col sts">
                                              <button className="rcrm-tag  m-l-10 text-overflow" value={arr[1].Id} onClick={setAssignJobOpenToTrue}>{arr[1].JobApplicationType}</button>
                                              </div>
                                              <div className="col d-flex justify-content-center">
                                                <MoreTimeIcon />  <Switch {...label} defaultChecked size="small" />
                                              </div>
                                            </div>
                                                
                                                
                                            })}
                                          </div>
                                      </div>
                                          
                                    </div>

                                    <div className="tab-pane fade" id="candidate_history" role="tabpanel" aria-labelledby="candidate_history-tab"> 
                                      <div className="col-sm-12 mt-2">
                                      <div className="row">
                                          <div className="col-sm-3 clm2">
                                              <b>Current Organization</b><br />
                                              <b>Skills</b> <br />
                                              <b>Resume</b><br />
                                              <b>Source</b><br />
                                              <b>Relevant Experience</b><br />
                                              <b>Full Address</b><br />
                                              <b>Available From</b><br />
                                              <b>Educational Specialization</b><br />
                                            </div>
                                            <div className="col-sm-3 clm2">
                                              <p>{notes.CurrentOrganization}</p>
                                              <p>{notes.Skills}</p>
                                              <p><a href={notes.Resume} target="_blank"><FileOpenIcon src={notes.Resume} /></a></p>
                                              <p>{notes.Source}</p>
                                              <p>{notes.RelevantExperience}</p>
                                              <p>{notes.FullAddress}</p>
                                              <p>{notes.AvailableFrom}</p>
                                              <p>{notes.Specialization}</p>
                                            
                                            </div>
                                            <div className="col-sm-3 clm2">
                                              <b>Current Salary</b><br />
                                              <b>Salary Expectation</b><br />
                                              <b>Educational Qualification</b><br />
                                              <b>Total Experience</b><br />
                                              <b>Notice Period(Days)</b><br />
                                              <b>Current Employment Status</b><br />
                                              <b>Language Skills</b><br />
                                              <b>Salary Type</b><br />
                                            </div>
                                            <div className="col-sm-3 clm2">
                                              <p>{notes.CurrentSalary}</p>
                                              <p>{notes.SalaryExpectation}</p>
                                              <p>{notes.Qualification}</p>
                                              <p>{notes.TotalExperience}</p>
                                              <p> {notes.NoticePeriod}</p>
                                              <p>{notes.CurrentEmploymentStatus}</p>
                                              <p>{notes.LanguageSkills}</p>
                                              <p>{notes.SalaryType}</p>
                                            </div>
                                         </div>
                                         </div>
                                    </div>
                                    {/* <div className="tab-pane fade" id="related_emails" role="tabpanel" aria-labelledby="related_emails-tab">
                                        Related Emails
                                    </div>
                                   
                                    <div className="tab-pane fade" id="candidate_que" role="tabpanel" aria-labelledby="candidate_que-tab">          
                                        Candidate Que....
                                    </div>
                                    <div className="tab-pane fade" id="hotlists" role="tabpanel" aria-labelledby="hotlists-tab"> 
                                        Hotlists       
                                    </div>
                                    <div className="tab-pane fade" id="related_deals" role="tabpanel" aria-labelledby="related_deals-tab"> 
                                         related_deals....
                                    </div>
                                    <div className="tab-pane fade" id="contact_pitched" role="tabpanel" aria-labelledby="contact_pitched-tab"> contact_pitched...</div> */}
                                </div>
                                  <div className="md">
                                    
                                    <Modal isOpen={modalIsOpen} style={customStyles} onRequestClose={(_, reason) => {
                                        if (reason !== "backdropClick") {
                                          setModalIsOpenToTrue();
                                        }
                                      }}>
                                      <button className="crosBTN" onClick={setModalIsOpenToFalse}>Close</button>
                                        <div  className= "popBox">
                                        <h5>Assign Candidate to Job</h5>
                                    
                                            <div className="col-sm-12 mt-3 mdl">
                                              <div className="container">
                                              <div className="row mb-3">
                                                {Object.entries(AllJob).map((arrOut)=>{
                                                  //console.log("out_arr___",arrOut);
                                                  return <div className="col-sm-4 mb-3 cad">
                                                    <div className="media job-details-page-avatar">
                                                      <div className="media-left">
                                                          <div className="job-text-avatar bg-job">
                                                            <label tabindex="0" className="b-checkbox checkbox p-t-5" id="sTest-assignJobsCheckbox">
                                                              <input type="checkbox" true-value="true" value={arrOut[1].Id} onChange={chkHandleChange} /> <span className="check" >
                                                              </span> <span className="control-label"></span></label>
                                                          </div>
                                                      </div>
                                                       <div className="media-body details-page-media-body-inline-content">
                                                          <div className="d-flex align-items-center">
                                                              <div className="inline-edit" data-hideuntilload="true">
                                                                  <p><h2 id="sTest-jdJobNameTxt">{arrOut[1].JobTitle} </h2> 
                                                                  <span className="rcrm-tag">ID - {arrOut[1].Id}</span>
                                                                  </p> 
                                                              </div> 
                                                          </div> 
                                                          <div className="media-body-sub-text p-l-10">
                                                          <i className="fas fa-map-marker-alt" aria-hidden = "true"></i><span className="m-r-15">
                                                              {arrOut[1].CompanyName}
                                                              </span>
                                                              
                                                          </div>
                                                        </div>
                                                     </div>
                                                  </div>
                                                 
                                                  })};
                                                 </div>
                                               
                                             </div>
                                           </div>
                                       </div>
                                          <div className="canbtn mb-3">
                                            <Link className="btn btn-success float-left" type="submit" to="/AddJobs">Add New Job</Link>
                                            <button className="btn btn-success float-right" type="submit" onClick={JobAssignSubmit}>Assign</button>
                                          </div>
                                          
                                      </Modal>
                                      {/* Applied Job Model start */}
                                      <Modal isOpen={assignJobOpen} style={customStyles} onRequestClose={(_, reason) => {
                                        if (reason !== "backdropClick") {
                                          setAssignJobOpenToTrue();
                                        }
                                      }}>
                                      
                                        <div  className= "popBox">
                                        <h5>Update Hiring Stage</h5>
                                          <hr />
                                            <div className="col-sm-12 mt-3 mdl">
                                              <div className="container mb-3">
                                                  <b>Stage</b>
                                                    <select className="form-select mt-2" aria-label="Default select example" value={selectedClient} onChange={handleSelectChange}>
                                                        <option disabled="disabled" selected="selected">Select Hiring Stage</option>
                                                        <option value="Assigned">Assigned</option>
                                                        <option value="Shortlisted">Shortlisted</option>
                                                        <option value="Interview Scheduled">Interview Scheduled</option>
                                                        <option value="Interview Not Attended">Interview Not Attended</option>
                                                        <option value="Interview Rescheduled">Interview Rescheduled</option>
                                                        <option value="Rejected">Rejected</option>
                                                        <option value="On Hold">On Hold</option>
                                                        <option value="Selected">Selected</option>
                                                        <option value="Offered">Offered</option>
                                                        <option value="Did Not Join">Did Not Join</option>
                                                        <option value="Placed">Placed</option>
                                                          
                                                    </select>
                                             </div>
                                           </div>
                                       </div>
                                          <div className="canbtn mb-3">
                                            <button className="crosBTN btn-danger float-left" onClick={setAssignJobOpenToFalse}>Close</button>
                                           
                                          </div>
                                          
                                      </Modal>

                                      {/* Applied Job Model End */}
                                   </div>
                              </div>
                          </div>
                          {/* Content Row End*/}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>

                {/* <!-- End of Content Wrapper --> */}
              </div>
              {/* <!-- Footer --> */}
              <FooterAdmin />
                  {/*<!-- End of Footer --> */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
